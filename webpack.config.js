'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');

module.exports = {
  entry: "./src/main",
  output: {
    filename: "src/build.js"
  },

  watch: NODE_ENV == 'development',

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015']
      }
    }]
  }
}
