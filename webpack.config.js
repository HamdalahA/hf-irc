const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './client/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  mode: 'none',
  entry: ['whatwg-fetch', './client/src/js/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // > JSX
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.(css|scss)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      },
    ]
  },
  resolve: {
    modules: ['node_modules', 'client/src'],
    extensions: ['.js', '.jsx', '.json', '.css', '.scss']
  },
  plugins: [
    htmlWebpackPlugin,
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true
    }),
  ],
  devServer: (process.env.NODE_ENV === 'development') ? {
    proxy: {
      '/api/v1': 'http://localhost:8000'
    },
    contentBase: path.resolve(__dirname, 'client/src'),
    inline: true,
    historyApiFallback: true,
    hot: true
  } : {},
};
