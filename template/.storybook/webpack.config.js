const { resolve } = require("path");

const findLoader = loaderName => rule => {
  if (
    rule &&
    rule.use &&
    rule.use[0] &&
    rule.use[0].loader &&
    rule.use[0].loader.includes(loaderName)
  ) {
    return rule.use[0];
  } else if (rule && rule.loader && rule.loader.includes(loaderName)) {
    return rule;
  }
};

const useTSLint = config => {
  const eslintFindLoader = findLoader("eslint");
  for (const rule of config.module.rules) {
    const eslintLoader = eslintFindLoader(rule);
    if (eslintLoader) {
      eslintLoader.test = /\.(mjs|jsx?)$/;
      break;
    }
  }

  const tslintFindLoader = findLoader("tslint");
  for (const [i, rule] of config.module.rules.entries()) {
    const tslintLoader = tslintFindLoader(rule);
    if (tslintLoader) {
      tslintLoader.splice(i, 1);
      break;
    }
  }

  config.module.rules.unshift({
    test: /\.tsx?$/,
    enforce: "pre",
    loader: "tslint-loader",
    options: {
      formattersDirectory: "node_modules/custom-tslint-formatters/formatters",
      formatter: "grouped",
      emitErrors: true
    }
  });

  return config;
};

const useTypescript = config => {
  config.module.rules.push({
    test: /\.tsx?$/,
    loader: require.resolve("babel-loader"),
    include: [resolve(".storybook"), resolve("stories"), resolve("src")],
    options: {
      cacheDirectory: resolve("node_modules/.cache/storybook"),
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            corejs: 3,
            useESModules: false,
            absoluteRuntime: dirname(require.resolve("@babel/runtime/package.json"))
          }
        ]
      ]
    }
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};

module.exports = async ({ config, mode }) => useTypescript(useTSLint(config));
