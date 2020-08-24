define(function (require) {
  var moduleA = require("./moduleA");
  return {
    b: moduleA.a.reverse()
  };
});
