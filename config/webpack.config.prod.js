
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
// const theme = require('theme.js');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const publicPath = paths.servedPath;
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
  mode: "production",
  bail: true,
  devtool: shouldUseSourceMap ? 'source-map' : false,
  entry: [
    require.resolve('@babel/polyfill'),
    "@babel/polyfill", //兼容ie11
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path
        .relative(paths.appSrc, info.absoluteResourcePath)
        .replace(/\\/g, '/'),
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.mjs', '.js', '.ts', '.json', '.web.jsx', '.jsx', '.tsx', '.less'],
    alias: {
      '@': resolve('src'),
      'style': resolve('src/style'),
      'components': resolve('src/components'),
      'util': resolve('src/util'),
      'react-native': 'react-native-web',
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          // WOFF Font
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
          // Process JS with Babel.
          {
            test: /\.(js|jsx|tsx|ts|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                  ['import', {
                    libraryName: 'antd', style: true
                  }],  // import less
              ],
            },
            exclude: /node_modules/,
          },
          {
            test: /\.(less|css)$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              // "less-loader?{modifyVars:" + JSON.stringify(theme) + "}"
              "less-loader"
            ],
          },
          {
            test: /\.(scss|sass)$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader"
            ]
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|jsx|tsx|ts|mjs)$/,/\.(css|less)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: true,
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,  //使用多进程并行运行来提高构建速度
        sourceMap: false,
        uglifyOptions: {
          warnings: false,
          compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true, 
          },
          output: {
            comments: false // 去掉注释
          }
        }
      }),
      new TerserPlugin({
        parallel: true,
        sourceMap: false,
        cache: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { 
          discardComments: { removeAll: true } // 移除注释
        }
      })
    ],
    splitChunks: {
      minSize: 30000,
      maxSize: 3000000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial"
        },
        // antdui: {
        //   priority: 2,  
        //   test: /[\\/]node_modules[\\/](antd)[\\/]/,  //(module) => (/antd/.test(module.context)),
        // },
        // // 拆分基础插件
        // basic: {
        //     priority: 3, 
        //     test: /[\\/]node_modules[\\/](moment|react|react-dom|react-router|react-router-dom|axios)[\\/]/,
        // }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new webpack.DefinePlugin(env.stringified),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[name].[hash].css"
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }
        console.log(message);
      },
      minify: true,
      navigateFallback: publicUrl + '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};