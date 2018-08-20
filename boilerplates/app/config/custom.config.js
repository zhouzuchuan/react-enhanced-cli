const path = require('path')
const paths = require('./paths')
const glob = require('glob')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    alias: {
        '@': resolve('src'),
        '@models': resolve('src/models'),
        '@components': resolve('src/components'),
        '@containers': resolve('src/containers'),
        '@styles': resolve('src/styles'),
        '@mocks': resolve('src/mocks')
    },
    cssRules: [
        // less加载器 （global-css文件夹不进行css module）
        {
            test: /\.less$/,
            include: paths.appSrc,
            exclude: /styles/,
            use: [
                {
                    loader: require.resolve('style-loader')
                },
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1,
                        modules: true,
                        localIdentName: '[local]__[hash:base64:6]'
                    }
                },
                {
                    loader: require.resolve('postcss-loader')
                },
                {
                    loader: require.resolve('less-loader'),
                    options: {
                        strictMath: true,
                        noIeCompat: true
                    }
                }
            ]
        },
        // less加载器
        {
            test: /\.less$/,
            include: /styles|node_modules\/antd/,
            use: [
                {
                    loader: require.resolve('style-loader')
                },
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1
                    }
                },
                // {
                //     loader: require.resolve('postcss-loader')
                // },
                {
                    loader: require.resolve('less-loader'),
                    options: {
                        strictMath: true,
                        noIeCompat: true,
                        javascriptEnabled: true,
                        modifyVars: require(paths.theme)
                    }
                }
            ]
        },
        // 除了 antd和styles文件夹 的css 开启css module
        {
            test: /\.css$/,
            include: paths.appSrc,
            exclude: /node_modules|antd\.css|styles/,
            // exclude: /node_modules|antd\.css|config/,
            use: [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1,
                        modules: true,
                        localIdentName: '[local]__[hash:base64:6]'
                    }
                },
                {
                    loader: require.resolve('postcss-loader')
                }
            ]
        },
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        // In production, we use a plugin to extract that CSS to a file, but
        // in development "style" loader enables hot editing of CSS.
        {
            test: /\.css$/,
            include: /node_modules|antd\.css|styles/,
            use: [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        importLoaders: 1
                    }
                },
                {
                    loader: require.resolve('postcss-loader')
                }
            ]
        }
    ],
    multiply: {},
    multiplyEntry() {
        return glob.sync(paths.appPage + '/*/index.js').reduce(
            (r, filePath) => ({
                ...r,
                [filePath.substring(paths.appPage.length + 1, filePath.lastIndexOf('/'))]: [
                    require.resolve('./polyfills'),
                    ...(process.env.NODE_ENV === 'development'
                        ? [require.resolve('react-dev-utils/webpackHotDevClient')]
                        : []),
                    filePath
                ]
            }),
            {}
        )
    }
}
