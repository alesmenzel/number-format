const { env } = process;
const isProduction = env.NODE_ENV === 'production';

const config = {
  mode: isProduction ? 'production' : 'development',
  entry: ['./number-format.js'],
  output: {
    library: 'numberFormat',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
  devtool: isProduction ? false : 'source-map',
};

module.exports = config;
