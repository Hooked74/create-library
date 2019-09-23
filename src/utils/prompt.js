const chalk = require("chalk");
const inquirer = require("inquirer");
const PromptBase = require("inquirer/lib/prompts/base");

const prompt = (exports.prompt = async (options = {}) => {
  options = {
    name: "stdin",
    ...options
  };

  const isAutoAnswer = options.answer || typeof options.answer === "boolean";
  const normalizeBooleanAnswer = answer =>
    typeof answer !== "boolean" ? answer : answer ? "Yes" : "No";

  const answer = await inquirer.createPromptModule({
    input: process.stdin,
    output: process.stdout
  })({
    ...options,
    when(answers) {
      if (isAutoAnswer) {
        console.log(
          new PromptBase({ ...options, default: null }).getQuestion() +
            chalk.cyan(normalizeBooleanAnswer(options.answer))
        );
      }

      return !isAutoAnswer;
    }
  });

  return isAutoAnswer ? options.answer : answer[options.name];
});

exports.promptList = (message, choices, options = {}) => {
  return prompt({
    ...options,
    message,
    choices: [].concat(choices),
    type: "list"
  });
};

exports.promptConfirm = (message, options) => {
  return prompt({
    ...options,
    message,
    type: "confirm"
  });
};

exports.promptInput = (message, options) => {
  return prompt({
    ...options,
    message,
    type: "input"
  });
};
