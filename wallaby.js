module.exports = function() {
  return {
    files: ["src/**/*.ts", {pattern: "src/test/**/*.ts", ignore: true}],
    tests: [{pattern: "src/test/**/*.spec.ts"}],
    env: {
      type: "node"
    }
  }
}
