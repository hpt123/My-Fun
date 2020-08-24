seajs.use(["./js/moduleA.js", "./js/moduleB.js", "./js/moduleC.js"], function (
  moduleA,
  moduleB,
  moduleC
) {
  console.log(moduleA.a);
  console.log(moduleB.b);
  console.log(moduleC.c);
});
