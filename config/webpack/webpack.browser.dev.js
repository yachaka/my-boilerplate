// @flow
/*
* https://webpack.js.org/configuration/
*/

const { enforceNodeEnvSet, resolveRoot } = require('../../utils');
enforceNodeEnvSet();

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const AddCrossOriginHtmlWebpackPlugin = require('./AddCrossOriginHtmlWebpackPlugin');

const paths = require('../paths');

const config = {
  target: 'web',
  entry: [
    // Enable state-keeping when hot reloading with React
    'react-hot-loader/patch',

    // Fetch polyfill
    'whatwg-fetch',

    // Browser index.js file
    paths.browserIndex,
  ],

  // Output path and filename
  output: {
    path: paths.publicDir,
    publicPath: 'http://localhost:3001/public',
    filename: '[name].[hash].js',
    crossOriginLoading: 'anonymous',
  },

  module: {
    rules: [
      // JS(X)
      {
        test: /\.jsx?$/,
        include: [resolveRoot('src/browser/')],
        loader: 'babel-loader',
      },

      // LESS
      {
        test: /\.less?$/,
        include: [resolveRoot('src/browser/')],
        use: [
          'style-loader',
          'css-modules-flow-types-loader',
          { loader: 'css-loader', options: { modules: true } },
          'less-loader',
        ],
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

  devtool: 'source-map',
  devServer: {
    port: 3001,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

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

    // Prevent emit on Errors
    new webpack.NoEmitOnErrorsPlugin(),

    // HMR
    new webpack.HotModuleReplacementPlugin(),

    // Cool terminal
    new FriendlyErrorsPlugin({}),

    // Inject Scripts/CSS into index.html generated file
    new HtmlPlugin({
      alwaysWriteToDisk: true,
      template: resolveRoot('src/server/index.template.html'),
      filename: 'index.generated.html',
      react: 'https://unpkg.com/react@16.1.1/umd/react.development.js',
      reactDOM: 'https://unpkg.com/react-dom@16.1.1/umd/react-dom.development.js',
    }),
    // Force saving to disk and at a different location
    new HtmlWebpackHardDiskPlugin({
      outputPath: resolveRoot('src/server/'),
    }),
    // Custom plugin to add `crossorigin="anonymous"` to CSS and JS
    // This is required because we are serving the assets on a different port than the server
    new AddCrossOriginHtmlWebpackPlugin(),
  ],
};

module.exports = config;

