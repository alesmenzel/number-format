const path = require('path');

const config = {
  mode: 'production',
  entry: './number-format.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'number-format.js',
    library: 'numberFormat',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};

module.exports = config;
