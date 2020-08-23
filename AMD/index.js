require.config({
  paths: {
    moduleA: "./js/moduleA",
    moduleB: "./js/moduleB",
    moduleC: "./js/moduleC"
  }
});

require(["moduleA", "moduleB", "moduleC"], function (
  moduleA,
  moduleB,
  moduleC
) {
  console.log(moduleA);
  console.log(moduleB);
  console.log(moduleC);
});
//异步执行    前置依赖，只有在模块都加载完成才会执行
