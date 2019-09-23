const {
  convertStringToPascalCase,
  getAbbreviationFromString,
  splitAndCapitalize
} = require("../utils/string");
const { promptInput } = require("../utils/prompt");
const chalk = require("chalk");

module.exports = class ConfigBuilder {
  constructor(config, defaultConfig) {
    this.defaultConfig = defaultConfig || {};
    this.config = Object.assign({}, config);
  }

  async buildName() {
    if (!this.config.name) {
      this.config.name = await promptInput(
        `Enter app name ${chalk.gray(`(e.g. ${this.defaultConfig.name})`)}:`,
        {
          validate: value => value.length > 1
        }
      );
    }
  }

  async buildCapName() {
    await this.buildName();

    this.config.capName = convertStringToPascalCase(this.config.name);
  }

  async buildMarkdownName() {
    await this.buildName();

    this.config.markdownName = splitAndCapitalize(this.config.name);
  }

  async buildPackage() {
    await this.buildName();

    if (!("scope" in this.config)) {
      this.config.scope = await promptInput(
        `Enter package scope ${chalk.bgMagenta("optional")} ${chalk.gray(
          `(e.g. ${this.defaultConfig.scope})`
        )}:`
      );
    }

    this.config.package = (this.config.scope ? `@${this.config.scope}/` : "") + this.config.name;
  }

  async buildAuthor() {
    if (!("author" in this.config)) {
      this.config.author = await promptInput(
        `Enter your name ${chalk.bgMagenta("optional")} ${chalk.gray(
          `(e.g. ${this.defaultConfig.author})`
        )}:`
      );
    }
  }

  async buildEmail() {
    if (!("email" in this.config)) {
      this.config.email = await promptInput(
        `Enter your email ${chalk.bgMagenta("optional")} ${chalk.gray(
          `(e.g. ${this.defaultConfig.email})`
        )}:`
      );
    }
  }

  async buildRepo() {
    await this.buildName();

    if (!this.config.repoAuthor) {
      this.config.repoAuthor = await promptInput(
        `Enter author of repository ${chalk.gray(`(e.g. ${this.defaultConfig.repoAuthor})`)}:`,
        {
          validate: value => value.length > 0
        }
      );
    }

    if (!("repoName" in this.config)) {
      this.config.repoName = await promptInput(
        `Enter name of repository ${chalk.bgMagenta("optional")} ${chalk.gray(
          `(e.g. ${this.defaultConfig.repoName || this.defaultConfig.name})`
        )}:`
      );
    }

    this.config.repo = `${this.config.repoAuthor}/${this.config.repoName || this.config.name}`;
  }

  async buildEncodedRepo() {
    await this.buildRepo();

    this.config.encodedRepo = encodeURIComponent(this.config.repo);
  }

  async buildNamespace() {
    await this.buildCapName();

    this.config.namespace = `${this.config.capName}Common`;
  }

  async buildNamespaceAlias() {
    await this.buildName();

    if (!("typePrefix" in this.config)) {
      this.config.typePrefix = (await promptInput(
        `Enter prefix for namespace alias ${chalk.bgMagenta("optional")} ${chalk.gray(
          `(e.g. ${this.defaultConfig.typePrefix})`
        )}:`
      )).toUpperCase();
    }

    this.config.namespaceAlias =
      (this.config.typePrefix ? `${this.config.typePrefix}_` : "") +
      getAbbreviationFromString(this.config.name);
  }

  getConfig() {
    return { ...this.config };
  }
};
