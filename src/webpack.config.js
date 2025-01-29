const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Adjust path if needed
    }),
  ],
};
