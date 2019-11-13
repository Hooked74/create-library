const flow = require("lodash/flow");
const omit = require("lodash/omit");
const omitBy = require("lodash/omitBy");
const template = require("lodash/template");
const prettier = require("prettier");
const { warn } = require("simple-output");

module.exports = class ReplaceManager {
  constructor(config) {
    this.excludeKeys = ["scope", "repoAuthor", "repoName", "typePrefix", "extended"];
    this.config = config;
    this.safeConfig = omit(this.config, this.excludeKeys);
    this.packageJson = "package.json";
  }

  addFilesToPackageJson(content) {
    content.files = ["/dist"];
    return content;
  }

  removeReactFromPackageJson = predicate => content => {
    if (predicate) {
      const filterDependencies = (_, key) =>
        (key.includes("react") && key !== "react-scripts") ||
        key.includes("emotion") ||
        key.includes("styled-components") ||
        key.includes("enzyme") ||
        key.includes("addon-info") ||
        key.includes("atlaskit/theme");

      delete content.peerDependencies;
      content.dependencies = omitBy(content.dependencies, filterDependencies);
      content.devDependencies = omitBy(content.devDependencies, filterDependencies);
      delete content.devDependencies["@storybook/react"];
    } else {
      delete content.devDependencies["@storybook/html"];
    }

    return content;
  };

  removeStorybookFromPackageJson = predicate => content => {
    if (predicate) {
      [
        "storybook",
        "build:storybook",
        "test:browser",
        "test:browser:ci",
        "test:browser:shell",
        "test:browser:ci:shell"
      ].forEach(script => {
        delete content.scripts[script];
      });
      content.scripts.build = content.scripts.build.replace(
        /\s?(&&\s)?npm\srun\sbuild:storybook/,
        ""
      );

      content.devDependencies = omitBy(content.devDependencies, (_, key) =>
        key.includes("storybook")
      );
    }

    return content;
  };

  removeCypressFromPackageJson = predicate => content => {
    if (predicate) {
      content.scripts = omitBy(content.scripts, (_, key) => key.includes("test:browser"));
      content.devDependencies = omitBy(content.devDependencies, (_, key) =>
        key.includes("cypress")
      );
    }

    return content;
  };

  /**
   * this replacement is used to make it possible to update packages using -
   * npx npm-check-updates -u
   * if use a template engine, the use of the command becomes impossible
   */
  replacePackageJson = predicate => content =>
    predicate
      ? flow(
          JSON.parse,
          this.addFilesToPackageJson,
          this.removeReactFromPackageJson(!this.config.react),
          this.removeStorybookFromPackageJson(!this.config.storybook),
          this.removeCypressFromPackageJson(!this.config.cypress),
          content => JSON.stringify(content, null, 2)
        )(content)
      : content;

  format = fileName => content => {
    try {
      return prettier.format(content, { printWidth: 100, filepath: fileName });
    } catch (e) {
      warn(e);
      return content;
    }
  };

  rename = fileName => {
    switch (true) {
      case !this.config.react && fileName === "global-styles.tsx":
        return "global-styles.ts";
      case !this.config.react && fileName === "App.tsx":
        return "App.ts";
      default:
        return fileName;
    }
  };

  replace = (content, fileName) => {
    return flow(
      content => template(content, { interpolate: /<%=([\s\S]+?)%>/g })(this.safeConfig),
      this.replacePackageJson(fileName.includes(this.packageJson)),
      this.format(fileName)
    )(content);
  };
};
