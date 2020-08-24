define(function (require) {
  var moduleB = require("./moduleB");
  return {
    c: moduleB.b.push(9)
  };
});
