const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'app-react-19.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
    publicPath: 'http://localhost:9003/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  externals: {
    'single-spa': 'single-spa',
    'react': 'react-19',
    'react-dom': 'react-dom-19',
  },
  devServer: {
    port: 9003,
    historyApiFallback: true,
    static: path.resolve(__dirname, 'dist'),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [],
};
