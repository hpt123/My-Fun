define("moduleC", ["moduleB"], function (moduleB) {
  var c = moduleB.b,
    c1 = moduleB.b1;
  return {
    c: c.push([7, 8, 9, 20]),
    c1: c1 + 10
  };
});
