const fs = require('fs')
const assert = require('assert')
const chokidar = require('chokidar')
const chalk = require('chalk')
const path = require('path')
const bodyParser = require('body-parser')
const proxy = require('express-http-proxy')
const url = require('url')
const db = path.join(__dirname, '../src/mocks')

const debug = require('debug')('rec:mock')

let error = null

function winPath(path) {
    return path.replace(/\\/g, '/')
}

function createMockHandler(method, path, value) {
    return function mockHandler(...args) {
        const res = args[1]
        if (typeof value === 'function') {
            value(...args)
        } else {
            res.json(value)
        }
    }
}

function createProxy(method, path, target) {
    return proxy(target, {
        filter(req) {
            return method ? req.method.toLowerCase() === method.toLowerCase() : true
        },
        forwardPath(req) {
            let matchPath = req.originalUrl
            const matches = matchPath.match(path)
            if (matches.length > 1) {
                matchPath = matches[1]
            }
            return winPath(path.join(url.parse(target).path, matchPath))
        }
    })
}

function applyMock(devServer) {
    try {
        realApplyMock(devServer)
        error = null
    } catch (e) {
        console.log(e)
        error = e

        console.log()
        outputError()

        const watcher = chokidar.watch(db, {
            persistent: true,
            ignored: /(^|[\/\\])\../, //忽略点文件
            cwd: '.', //表示当前目录
            depth: 99 //到位了....
        })
        watcher.on('change', path => {
            console.log(chalk.green('CHANGED'), path)
            watcher.close()
            applyMock(devServer)
        })
    }
}

function realApplyMock(devServer) {
    // 清除缓存
    Object.keys(require.cache).forEach(file => {
        if (file.indexOf(db) > -1) {
            debug(`delete cache ${file}`)
            delete require.cache[file]
        }
    })
    const files = fs.readdirSync(db)
    const { app } = devServer

    devServer.use(bodyParser.json({ limit: '5mb', strict: false }))
    devServer.use(
        bodyParser.urlencoded({
            extended: true,
            limit: '5mb'
        })
    )

    const config = files.reduce((r, v) => {
        return {
            ...r,
            ...require(path.resolve(db, v))
        }
    }, {})

    Object.keys(config).forEach(key => {
        const keyParsed = parseKey(key)
        assert(!!app[keyParsed.method], `method of ${key} is not valid`)
        assert(
            typeof config[key] === 'function' || typeof config[key] === 'object' || typeof config[key] === 'string',
            `mock value of ${key} should be function or object or string, but got ${typeof config[key]}`
        )
        if (typeof config[key] === 'string') {
            let { path } = keyParsed
            if (/\(.+\)/.test(path)) {
                path = new RegExp(`^${path}$`)
            }
            app.use(path, createProxy(keyParsed.method, path, config[key]))
        } else {
            app[keyParsed.method](keyParsed.path, createMockHandler(keyParsed.method, keyParsed.path, config[key]))
        }
    })

    // 调整 stack，把 historyApiFallback 放到最后
    let lastIndex = null
    app._router.stack.forEach((item, index) => {
        if (item.name === 'webpackDevMiddleware') {
            lastIndex = index
        }
    })
    const mockAPILength = app._router.stack.length - 1 - lastIndex
    if (lastIndex && lastIndex > 0) {
        const newStack = app._router.stack
        newStack.push(newStack[lastIndex - 1])
        newStack.push(newStack[lastIndex])
        newStack.splice(lastIndex - 1, 2)
        app._router.stack = newStack
    }

    const watcher = chokidar.watch(db, {
        persistent: true,
        ignored: /(^|[\/\\])\../, //忽略点文件
        cwd: '.', //表示当前目录
        depth: 99 //到位了....
    })
    watcher.on('change', path => {
        console.log(chalk.cyan('[REC]'), chalk.green('CHANGED'), path)
        watcher.close()

        // 删除旧的 mock api
        app._router.stack.splice(lastIndex - 1, mockAPILength)

        applyMock(devServer)
    })
}

function parseKey(key) {
    let method = 'all'
    let path = key

    if (key.indexOf(' ') > -1) {
        const splited = key.split(' ')
        method = splited[0].toLowerCase()
        path = splited[1]
    }

    return { method, path }
}
function outputError() {
    if (!error) return

    const filePath = error.message.split(': ')[0]
    const relativeFilePath = filePath
    const errors = error.stack
        .split('\n')
        .filter(line => line.trim().indexOf('at ') !== 0)
        .map(line => line.replace(`${filePath}: `, ''))
    errors.splice(1, 0, [''])

    console.log(chalk.red('Failed to parse mock config.'))
    console.log()
    console.log(`Error in ${relativeFilePath}`)
    console.log(errors.join('\n'))
    console.log()
}

module.exports = {
    outputError,
    applyMock
}
