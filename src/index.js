#!/usr/bin/env node

const Commander = require("./services/Commander");
const ConfigManager = require("./services/ConfigManager");
const FileManager = require("./services/FileManager");
const ReplaceManager = require("./services/ReplaceManager");
const chalk = require("chalk");
const clearConsole = require("./utils/clear");
const { error, success, message, info } = require("simple-output");
const prettyjson = require("prettyjson");

(async function main() {
  clearConsole();

  const commander = new Commander();
  const configManager = new ConfigManager(commander.createProgram());
  await configManager.constructConfig();

  const config = configManager.getConfig();

  success("Configuration generated successfully:");
  console.log();
  message(prettyjson.render(config));
  console.log();

  const fileManager = new FileManager(config);
  const replaceManager = new ReplaceManager(config);

  console.log();
  info("Start copy template");
  fileManager.makeRootDir();
  fileManager.copyTemplate((content, fileName) => {
    content = replaceManager.replace(content);
    if (fileName.includes("package.json")) {
      content = replaceManager.addFilesToPackageJson(content);
    }
    return content;
  });

  console.log();
  info("Start repository initialization");
  commander.initRepo(fileManager.rootPath);

  console.log();
  info("Start dependency installation");
  commander.installPackages(fileManager.rootPath);

  clearConsole();
  success(`Library deployment successful at ${chalk.cyan(fileManager.rootPath)}`);
})().catch(e => {
  error(e.stack);
  process.exit(1);
});

// Exits program execution on ESC
process.stdin.on("keypress", (ch, key) => {
  if (key && key.name === "escape") {
    process.exit(0);
  }
});
