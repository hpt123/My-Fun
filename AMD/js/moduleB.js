define("moduleB", ["moduleA"], function (moduleA) {
  var b = moduleA.a,
    b1 = moduleA.a1;
  return { b: b.reverse(), b1: b1.length };
});
