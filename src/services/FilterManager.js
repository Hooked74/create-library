module.exports = class FilterManager {
  constructor(config) {
    this.config = config;
  }

  filter = (fileName, isDir) => {
    const excludeFiles = [];
    const excludeDirs = [];

    if (!this.config.storybook) {
      excludeDirs.push(".storybook", "stories");
    }

    if (!this.config.cypress) {
      excludeFiles.push("cypress.json");
      excludeDirs.push("cypress");
    }

    if (!this.config.react) {
      excludeFiles.push("Square.tsx");
    }

    return isDir ? !excludeDirs.includes(fileName) : !excludeFiles.includes(fileName);
  };
};
