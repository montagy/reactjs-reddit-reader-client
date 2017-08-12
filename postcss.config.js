var cssnext = require('postcss-cssnext');
module.exports = {
  plugins: [
    require('postcss-property-lookup'),
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
