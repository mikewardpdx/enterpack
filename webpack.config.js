const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const requireContext = require('require-context');
const rootDir = require('./package.json').rootDir;

const modules = requireContext(path.resolve(__dirname, `${rootDir}`), true, /\main.entry.js$/);
const entries = () => modules.keys().map(x => `./${rootDir}/${x}`);

module.exports = () => ({
  entry: entries,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './global.scss'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
});