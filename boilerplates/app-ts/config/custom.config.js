const path = require('path');
const paths = require('./paths');
const glob = require('glob');
const tsImportPluginFactory = require('ts-import-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const StyleLintPlugin = require('stylelint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 *
 * 各个环境 eslint/stylelint 验证开关
 *
 * 0:     全部关闭
 * 1:     生产环境开启
 * 2/其他: 全部开启
 *
 * */
const lintSwitch = 2;

const isLintSwitch = !(lintSwitch === 0 || (lintSwitch === 1 && NODE_ENV === 'development'));

module.exports = {
    alias: {
        '@a': resolve('src/assets'),
        '@m': resolve('src/models'),
        '@c': resolve('src/components'),
        '@cn': resolve('src/containers'),
        '@s': resolve('src/styles'),
        '@mk': resolve('src/mocks'),
        '@rw': resolve('src/registerServiceWorker.ts'),
        '@u': resolve('src/utils'),
        '@': resolve('src')
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
                // {
                //     loader: require.resolve('css-loader'),
                //     options: {
                //         importLoaders: 1,
                //         modules: true,
                //         localIdentName: '[local]__[hash:base64:6]'
                //     }
                // },
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: true,
                        namedExport: true,
                        camelCase: true,
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
                // {
                //     loader: require.resolve('css-loader'),
                //     options: {
                //         importLoaders: 1
                //     }
                // },
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: false,
                        namedExport: true,
                        camelCase: true
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
                // {
                //     loader: require.resolve('css-loader'),
                //     options: {
                //         importLoaders: 1,
                //         modules: true,
                //         localIdentName: '[local]__[hash:base64:6]'
                //     }
                // },
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: true,
                        namedExport: true,
                        camelCase: true,
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
                // {
                //     loader: require.resolve('css-loader'),
                //     options: {
                //         importLoaders: 1
                //     }
                // },
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: false,
                        namedExport: true,
                        camelCase: true
                    }
                },
                {
                    loader: require.resolve('postcss-loader')
                }
            ]
        }
    ],

    plugins: [
        ...(isLintSwitch
            ? [
                  new ForkTsCheckerWebpackPlugin({
                      async: false,
                      watch: paths.appSrc,
                      tsconfig: paths.appTsProdConfig,
                      tslint: paths.appTsLint
                  }),
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
    antdTsOption: {
        getCustomTransformers: () => ({
            before: [
                tsImportPluginFactory({
                    libraryDirectory: 'es',
                    libraryName: 'antd',
                    style: 'css'
                })
            ]
        })
    },
    multiply: {},
    multiplyEntry() {
        return glob.sync(paths.appPage + '/*/index.tsx').reduce(
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
        );
    },
    buildPublicPath: './'
};
