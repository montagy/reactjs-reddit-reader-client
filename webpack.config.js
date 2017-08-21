const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpe?g|png|svg|woff2?|ttf|eot|otf)$/,
        loader: 'url-loader?limit=8000',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'public/index.html'),
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'cheap-module-source-map';
  config.devServer = {
    contentBase: './public',
    port: '3030',
    hot: true,
  };
  config.module.rules.push({
    test: /\.css$/,
    use: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[path]__[name]__[local]--[hash:base64:5]',
          importLoaders: 1,
          sourceMap: true,
        },
      },
      { loader: 'postcss-loader' },
    ],
  });
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      compress: {
        screw_ie8: true,
      },
      comment: false,
    }),
  );
  config.module.rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]--[hash:base64:5]',
            importLoaders: 1,
            minimize: true,
          },
        },
        { loader: 'postcss-loader' },
      ],
    }),
  });
}
module.exports = config;
