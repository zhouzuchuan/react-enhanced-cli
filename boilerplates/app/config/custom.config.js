const path = require('path')
const paths = require('./paths')
const glob = require('glob')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const publicPath = paths.servedPath
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const StyleLintPlugin = require('stylelint-webpack-plugin')
const shouldUseRelativeAssetPaths = publicPath === './'

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const NODE_ENV = process.env.NODE_ENV

const getStyleLoaders = (cssOptions, preProcessor) => {
    const isEnvDev = NODE_ENV === 'development'
    const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
    const loaders = [
        isEnvDev
            ? require.resolve('style-loader')
            : {
                  loader: MiniCssExtractPlugin.loader,
                  options: Object.assign({}, shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined)
              },
        {
            loader: require.resolve('css-loader'),
            options: { ...cssOptions, ...(!isEnvDev ? { sourceMap: shouldUseSourceMap } : {}) }
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ...(!isEnvDev ? { sourceMap: shouldUseSourceMap } : {})
            }
        }
    ]
    if (preProcessor) {
        loaders.push({
            ...preProcessor,
            options: { ...preProcessor.options, ...(!isEnvDev ? { sourceMap: shouldUseSourceMap } : {}) }
        })
    }

    return loaders
}

/**
 *
 * 各个环境 eslint/stylelint 验证开关
 *
 * 0:     全部关闭
 * 1:     生产环境开启
 * 2/其他: 全部开启
 *
 * */
const lintSwitch = 2

const isLintSwitch = !(lintSwitch === 0 || (lintSwitch === 1 && NODE_ENV === 'development'))

module.exports = {
    lintSwitch,
    alias: {
        '@': resolve('src'),
        '@a': resolve('src/assets'),
        '@m': resolve('src/models'),
        '@hm': resolve('src/models/hoc'),
        '@c': resolve('src/components'),
        '@cn': resolve('src/containers'),
        '@v': resolve('src/containers/views'),
        '@s': resolve('src/styles'),
        '@mk': resolve('src/mocks'),
        '@rw': resolve('src/registerServiceWorker.js'),
        '@u': resolve('src/utils'),
        '@cfg': resolve('src/config')
    },
    cssRules: [
        // 除了 antd和styles文件夹 的less 开启css module
        {
            test: /\.less$/,
            include: paths.appSrc,
            exclude: /styles/,
            use: getStyleLoaders(
                {
                    importLoaders: 2,
                    modules: true,
                    localIdentName: '[local]__[hash:base64:6]',
                    getLocalIdent: getCSSModuleLocalIdent
                },
                {
                    loader: require.resolve('less-loader'),
                    options: {
                        strictMath: true,
                        noIeCompat: true
                    }
                }
            )
        },
        {
            test: /\.less$/,
            include: /styles|node_modules\/antd/,
            use: getStyleLoaders(
                {
                    importLoaders: 2
                },
                {
                    loader: require.resolve('less-loader'),
                    options: {
                        strictMath: true,
                        noIeCompat: true,
                        javascriptEnabled: true,
                        modifyVars: resolve('src/theme.config.js')
                    }
                }
            )
        },
        // 除了 antd和styles文件夹 的css 开启css module
        {
            test: /\.css$/,
            include: paths.appSrc,
            exclude: /node_modules|antd\.css|styles/,
            // exclude: /node_modules|antd\.css|config/,
            use: getStyleLoaders({
                importLoaders: 1,
                modules: true,
                localIdentName: '[local]__[hash:base64:6]',
                getLocalIdent: getCSSModuleLocalIdent
            })
        },
        {
            test: /\.css$/,
            include: /node_modules|antd\.css|styles/,
            use: getStyleLoaders({
                importLoaders: 1
            })
        }
    ],

    rules: [
        ...(isLintSwitch
            ? [
                  {
                      test: /\.(js|mjs|jsx)$/,
                      enforce: 'pre',
                      use: [
                          {
                              options: {
                                  formatter: require.resolve('react-dev-utils/eslintFormatter'),
                                  eslintPath: require.resolve('eslint')
                              },
                              loader: require.resolve('eslint-loader')
                          }
                      ],
                      include: paths.appSrc
                  }
              ]
            : [])
    ],

    plugins: [
        ...(isLintSwitch
            ? [
                  new StyleLintPlugin({
                      files: ['src/**/*.?(le|c)ss']
                  })
              ]
            : []),
        ...(process.env.REC_ANALYZ === 'true'
            ? [
                  new BundleAnalyzerPlugin({
                      analyzerMode: 'server',
                      analyzerHost: '127.0.0.1',
                      analyzerPort: 8889,
                      reportFilename: 'report.html',
                      defaultSizes: 'parsed',
                      openAnalyzer: true,
                      generateStatsFile: false,
                      statsFilename: 'stats.json',
                      statsOptions: null,
                      logLevel: 'info'
                  })
              ]
            : [])
    ],

    multiply: {},
    multiplyEntry: () => {
        return glob.sync(resolve('src/pages') + '/*/index.js').reduce(
            (r, filePath) => ({
                ...r,
                [filePath.substring(resolve('src/pages').length + 1, filePath.lastIndexOf('/'))]: [
                    ...(process.env.NODE_ENV === 'development'
                        ? [require.resolve('react-dev-utils/webpackHotDevClient')]
                        : []),
                    filePath
                ]
            }),
            {}
        )
    },
    buildPublicPath: './'
}
