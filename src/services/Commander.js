const { execSync } = require("child_process");

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
    execSync(`npm install`, { stdio: "inherit", cwd });
  }

  initRepo(cwd) {
    execSync(`git init`, { stdio: "inherit", cwd });
  }
};
