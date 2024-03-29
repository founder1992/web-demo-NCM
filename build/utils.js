const path = require('path');
const config = require('./config');

exports.resolve = function (dir) {
  return path.join(__dirname, dir)
}

exports.resolveAssetsRootDir = function (dir) {
  return path.join(dir)
}

exports.assetsPath = function (dir) {
  return path.posix.join(config.assetsSubDirectory, dir)
}