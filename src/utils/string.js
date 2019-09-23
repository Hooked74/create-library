exports.convertStringToPascalCase = str =>
  str.replace(/(^|[^\w]+)(\w)/gi, (_, $, char) => char.toUpperCase());

exports.getAbbreviationFromString = str =>
  str
    .match(/(^|(?<=[^\w]+))(\w)/gi)
    .join("")
    .toUpperCase();

exports.splitAndCapitalize = str =>
  str.replace(/[^\w]+/g, " ").replace(/\b(\w)/g, (_, char) => char.toUpperCase());
