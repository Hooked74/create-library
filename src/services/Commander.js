const { spawnSync } = require("child_process");

module.exports = class Commander {
  createProgram() {
    return require("commander")
      .version(require("../../package").version)
      .arguments("<name>")
      .option("-f, --force", "generate library with default values")
      .option("-e, --extended", "add advanced filtering and content replacement settings")
      .option("-c, --config <path>", "generate library with values from file")
      .parse(process.argv);
  }

  installPackages(cwd) {
    const spawnProcess = spawnSync("npm", ["install"], { stdio: "inherit", cwd });
    if (spawnProcess.error) throw spawnProcess.error;
  }

  initRepo(cwd) {
    const spawnProcess = spawnSync("git", ["init"], { stdio: "inherit", cwd });
    if (spawnProcess.error) throw spawnProcess.error;
  }
};
