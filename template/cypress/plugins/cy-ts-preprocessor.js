const wp = require("@cypress/webpack-preprocessor");

const webpackOptions = {
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: [/node_modules/],
        loader: require.resolve("babel-loader"),
        options: {
          customize: require.resolve("babel-preset-react-app/webpack-overrides"),

          plugins: [
            [
              require.resolve("babel-plugin-named-asset-import"),
              {
                loaderMap: {
                  svg: {
                    ReactComponent: "@svgr/webpack?-svgo,+titleProp,+ref![path]"
                  }
                }
              }
            ]
          ],
          cacheDirectory: true,
          cacheCompression: false
        }
      }
    ]
  }
};

const options = {
  webpackOptions
};

module.exports = wp(options);
