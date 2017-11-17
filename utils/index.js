// @flow

const path = require('path');

function resolveRoot(...args: Array<string>) {
  return path.resolve(__dirname, '..', ...args);
}

function enforceNodeEnvSet() {
  if (process.env.NODE_ENV === undefined) {
    console.log(`
      NODE_ENV is \`undefined\`.
      Please set NODE_ENV to \`development\` or \`production\`.
    `);
    process.exit(1);
  }
}

module.exports = {
  resolveRoot,
  enforceNodeEnvSet,
};
