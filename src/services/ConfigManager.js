const { existsSync, readFileSync } = require("fs");
const { resolve, join } = require("path");
const { warn } = require("simple-output");
const ConfigBuilder = require("./ConfigBuilder");

module.exports = class ConfigManager {
  constructor(program) {
    this.program = program;

    const config = Object.assign({}, this.getDefaultConfig(), this.getConfigFromCli());
    this.configBuilder = new ConfigBuilder(
      this.extendConfigWithProgram(config),
      this.getDefaultConfig(true)
    );
  }

  readConfigFromFile(path) {
    try {
      return JSON.parse(readFileSync(path));
    } catch (e) {
      warn(`Could not load configuration file ${path}`);
      return null;
    }
  }

  getDefaultConfig(force) {
    return this.program.force || force
      ? this.readConfigFromFile(join(__dirname, "../default-config.json"))
      : null;
  }

  getConfigFromCli() {
    if (this.program.config) {
      try {
        return JSON.parse(this.program.config);
      } catch (e) {
        const configPath = resolve(this.program.config);
        return existsSync(configPath) ? this.readConfigFromFile(configPath) : null;
      }
    }

    return null;
  }

  extendConfigWithProgram(config) {
    config || (config = {});

    const name = this.program.args[0];
    if (name) config.name = name;

    config.extended = !!this.program.extended;

    return config;
  }

  async constructConfig() {
    await this.configBuilder.buildName();
    await this.configBuilder.buildCapName();
    await this.configBuilder.buildMarkdownName();
    await this.configBuilder.buildPackage();
    await this.configBuilder.buildAuthor();
    await this.configBuilder.buildEmail();
    await this.configBuilder.buildRepo();
    await this.configBuilder.buildEncodedRepo();
    await this.configBuilder.buildNamespace();
    await this.configBuilder.buildNamespaceAlias();
    await this.configBuilder.buildReact();
    await this.configBuilder.buildStorybook();
    await this.configBuilder.buildCypress();
  }

  getConfig() {
    return this.configBuilder.getConfig();
  }
};
