const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SizeAnalyzer = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;

const config = {
  devtool: 'cheap-module-source-map',
  entry: ['react-hot-loader/patch', path.resolve(__dirname, 'src/index.jsx')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
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
} else {
  config.plugins.push(new SizeAnalyzer('./report.txt')),
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      compress: {
        screw_ie8: true,
      },
      comment: false,
    }),
  );
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'public/template.html'),
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
