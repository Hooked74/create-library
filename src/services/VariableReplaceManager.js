module.exports = class VariableReplaceManager {
  constructor(config) {
    this.config = config;
  }

  replaceByPattern = (content, key) => {
    return content.replace(new RegExp(`\\$\\[${key}\\]`, "gm"), this.config[key]);
  };

  replace(content) {
    return [
      "name",
      "capName",
      "markdownName",
      "package",
      "author",
      "email",
      "repo",
      "encodedRepo",
      "namespace",
      "namespaceAlias"
    ].reduce(this.replaceByPattern, content);
  }
};
