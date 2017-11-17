// @flow
/*
* https://webpack.js.org/configuration/
*/

const { enforceNodeEnvSet } = require('../../utils');
enforceNodeEnvSet();

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const { resolveRoot } = require('../../utils');
const paths = require('../paths');

const config = {
  target: 'node',
  entry: [
    // HMR
    'webpack/hot/poll?300',

    // Server index.js file
    paths.serverIndex
  ],

  // Output path and filename
  output: {
    path: paths.serverBuildPath,

    filename: paths.serverBuildFilename,
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      // JS(X)
      {
        test: /\.jsx?$/,
        include: [resolveRoot('src')],
        loader: 'babel-loader',
      },

      // LESS
      {
        test: /\.less$/,
        include: [resolveRoot('src')],
        use: [
          { loader: 'css-loader/locals', options: { modules: true } },
          'less-loader',
        ],
      },

      // Raw text imports
      {
        test: /(schema\.graphql)$/,
        include: [resolveRoot('src')],
        loader: 'raw-loader',
      },

      // // Assets minus IMGs
      // {
      //   exclude: /\.(jsx?|json|bmp|gif|jpe?g|png|svg|less)$/,
      //   include: [resolveRoot('src')],
      //   loader: 'file-loader',
      // },

      // IMGs
      {
        test: /\.(bmp|jpe?g|png|gif|webp|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },

  // Do not show bundle size hints
  performance: { hints: false },

  devtool: 'source-map',
  externals: [
    nodeExternals({
      whitelist: [
        'webpack/hot/poll?300',
        /\.(eot|woff|woff2|ttf|otf)$/,
        /\.(svg|png|jpg|jpeg|gif|ico)$/,
        /\.(mp4|mp3|ogg|swf|webp)$/,
        /\.(css|scss|sass|sss|less)$/,
      ],
    }),
  ],
  stats: 'none',
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
  },
  node: { console: true, __filename: true, __dirname: true },

  plugins: [
    // Add filenames to modules
    new webpack.NamedModulesPlugin(),

    // Exposes variables to webpack
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        EXECUTION_ENV: JSON.stringify('browser'),
      },
    }),

    // Limit server chunks to 1
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    // Prevent emit on Errors
    new webpack.NoEmitOnErrorsPlugin(),

    // HMR
    new webpack.HotModuleReplacementPlugin(),

    // SourceMap Support
    new webpack.BannerPlugin({
      banner: "require('source-map-support').install();",
      raw: true,
    }),

    // Cool terminal
    new FriendlyErrorsPlugin({}),
  ],
};

module.exports = config;
console.log(process.env.NODE_ENV)