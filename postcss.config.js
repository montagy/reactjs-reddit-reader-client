var cssnext = require('postcss-cssnext');
module.exports = {
  plugins: [
    cssnext({
      features: {
        customProperties: {
          variables: {
            baseColor: 'rgb(255, 255, 255)',
          },
        },
      },
    }),
  ],
};
