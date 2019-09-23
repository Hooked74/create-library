const { mkdirSync, existsSync, readdirSync, statSync, readFileSync, writeFileSync } = require("fs");
const { warn, message } = require("simple-output");
const { resolve, join } = require("path");
const chalk = require("chalk");

module.exports = class FileManager {
  constructor(config) {
    this.config = config;
  }

  get rootPath() {
    return resolve(this.config.name);
  }

  makeDir(...args) {
    if (!existsSync(args[0])) {
      mkdirSync(...args);
    } else {
      warn(`Directory "${args[0]}" already exists`);
    }
  }

  makeRootDir() {
    this.makeDir(this.rootPath);
    message(`Root directory created ${chalk.cyan(this.rootPath)}`);
  }

  copyTemplate(replace) {
    const templatePath = join(__dirname, "../../template");
    const outPath = resolve(this.config.name);
    const fileList = [[templatePath, readdirSync(templatePath)]];

    while (fileList.length) {
      const [path, fileNames] = fileList.pop();

      while (fileNames.length) {
        const fileName = fileNames.pop();
        const filePath = join(path, fileName);
        const outFilePath = join(outPath, filePath.replace(new RegExp(`^${templatePath}`), ""));

        if (statSync(filePath).isDirectory()) {
          fileList.push([filePath, readdirSync(filePath)]);
          this.makeDir(outFilePath);
          message(`${chalk.cyan(outFilePath)} directory created`);
        } else {
          writeFileSync(outFilePath, replace(readFileSync(filePath).toString(), fileName));
          message(`Copied ${chalk.cyan(fileName)} file to ${chalk.cyan(outFilePath)}`);
        }
      }
    }
  }
};
