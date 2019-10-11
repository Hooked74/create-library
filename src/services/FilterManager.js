module.exports = class FilterManager {
  constructor(config) {
    this.config = config;
  }

  filter = (fileName, isDir) => {
    const excludeFiles = [];
    const excludeDirs = [];

    if (!this.config.react) {
      excludeFiles.push("setupTests.js");
    }

    if (!this.config.storybook) {
      excludeDirs.push(".storybook", "stories");
    }

    if (!this.config.cypress) {
      excludeFiles.push("cypress.json");
      excludeDirs.push("cypress");
    }

    return isDir ? !excludeDirs.includes(fileName) : !excludeFiles.includes(fileName);
  };
};
