const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|svg|woff2?|ttf|eot|otf)$/,
        loader: 'url-loader?limit=8000',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              importLoaders: 1,
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
