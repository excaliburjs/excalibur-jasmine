const path = require('path');
const webpack = require('webpack');
const wallabyWebpack = require('wallaby-webpack');

module.exports = function(wallaby) {
  return{
    files: [
      { pattern: '*.ts', load: false },
      { pattern: 'test-images/*.png' },
    ],
    tests: [
      './specs/*spec.ts'
    ],
    env: { 
      kind: 'chrome',
      params: {
        runner: '--headless --mute-audio --autoplay-policy=no-user-gesture-required'
      }
    },
    testFramework: 'jasmine',
    setup: function () {
      window.__moduleBundler.loadTests();
    },
    postprocessor: wallaby.postprocessors.webpack({
        mode: 'none',
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: 'index.js',
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                { test: /\.ts$/, loader: 'ts-loader'}
            ]
        }
    })
  }
}