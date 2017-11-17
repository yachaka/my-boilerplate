// @flow

const path = require('path');

const { resolveRoot } = require('../utils');

module.exports = {
  serverIndex: resolveRoot('src/server/index.js'),
  serverBuildPath: resolveRoot('build/'),
  serverBuildFilename: 'server.js',

  publicDir: resolveRoot('public/'),
  publicPath: '/public/',

  browserIndex: resolveRoot('src/browser/index.js'),
};
