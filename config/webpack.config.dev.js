const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('@babel/polyfill'),
    "@babel/polyfill", //兼容ie11
    require.resolve('react-hot-loader/patch'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ],
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.mjs', '.js', '.ts', '.json', '.web.jsx', '.jsx', '.tsx', '.less','.scss'],
    alias: {
      '@': resolve('src'),
      'style': resolve('src/style'),
      'components': resolve('src/components'),
      'util': resolve('src/util'),
      'assets': resolve('src/assets')
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/font-woff'
              }
            }
          },
          // WOFF2 Font
          {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/font-woff'
              }
            }
          },
          // TTF Font
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/octet-stream'
              }
            }
          },
          // EOT Font
          {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: 'file-loader'
          },
          // SVG Font
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'image/svg+xml'
              }
            }
          },
          // Common Image Formats
          {
            test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
            use: 'url-loader'
          },
          {
            test: /\.(js|jsx|mjs|tsx|ts)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              plugins: [
                ['import', {
                  libraryName: 'antd', style: true
                }],  // import less
              ]
            },
            exclude: /node_modules/
          },
          {
            test: /\.(css|less)$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              {
                loader: require.resolve('less-loader') // compiles Less to CSS
              },
            ],
          },
          {
            exclude: [/\.(js|jsx|tsx|ts|mjs)$/,/\.(css|less)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      chunksSortMode: 'none',
    }),

    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

    new webpack.DefinePlugin(env.stringified),

    new webpack.HotModuleReplacementPlugin(),

    new CaseSensitivePathsPlugin(),

    new WatchMissingNodeModulesPlugin(paths.appNodeModules),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',// 目标文件名
      algorithm: 'gzip',// 使用gzip压缩
      test: new RegExp(
          '\\.(js|css)$' // 压缩 js 与 css
      ),
      threshold: 10240,// 资源文件大于10240B=10kB时会被压缩
      minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
    }),
  ],

  devServer: {
    hot: true
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },

  performance: {
    hints: false,
  },

  optimization: {
    namedModules: true,
    nodeEnv: 'development',
  },
};