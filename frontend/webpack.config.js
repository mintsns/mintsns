const webpack = require("webpack");
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.argv.indexOf('-p') !== -1;

module.exports = {
  entry: [
    "./.entry.js"
  ],
  output: {
    path: "./",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      }
    ]
  },
  devtool: "inline-source-map",
  plugins: isProduction ? [
    new ExtractTextPlugin("bundle.css"),
    new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: true, __DEV__: false}),
    new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    function () {
      this.plugin('watch-run', (watching, callback) => {
        console.log('\033[36m' + 'Begin compile at ' + new Date() + ' \033[39m')
      callback()
      })
    }
  ] : [
    new ExtractTextPlugin("bundle.css"),
    function () {
      this.plugin('watch-run', (watching, callback) => {
        console.log('\033[36m' + 'Begin compile at ' + new Date() + ' \033[39m')
      callback()
    })
    }
  ]
}