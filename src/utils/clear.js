module.exports = function clear() {
  process.stdout.write("\x1B[2J\x1B[3J\x1B[H");
};
