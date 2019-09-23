const { resolve } = require("path");

const useTSLint = config => {
  const eslintLoaderIndex = config.module.rules.findIndex(
    rule => rule.use && rule.use[0] && rule.use[0].loader && rule.use[0].loader.includes("eslint")
  );

  if (~eslintLoaderIndex) {
    config.module.rules[eslintLoaderIndex].test = /\.(js|mjs|jsx)$/;
    config.module.rules.splice(eslintLoaderIndex, 0, {
      test: /\.tsx?$/,
      enforce: "pre",
      loader: "tslint-loader",
      options: {
        formattersDirectory: "node_modules/custom-tslint-formatters/formatters",
        formatter: "grouped",
        emitErrors: true
      }
    });
  }

  return config;
};

const useTypescript = config => {
  const babelLoader = config.module.rules.find(
    (rule, i) => rule && rule.loader && rule.loader.includes("babel")
  );

  if (babelLoader) {
    const { presets } = babelLoader.options;
    const reactAppPresetIndex = presets.findIndex(preset => preset.includes("react-app"));

    babelLoader.include = [babelLoader.include, resolve(".storybook"), resolve("stories")];

    if (~reactAppPresetIndex) {
      presets.splice(reactAppPresetIndex, 1, [presets[reactAppPresetIndex], { typescript: true }]);
    }
  }

  return config;
};

module.exports = async ({ config, mode }) => useTypescript(useTSLint(config));
