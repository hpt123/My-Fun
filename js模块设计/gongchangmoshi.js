// 工厂模式
class Product {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log("init");
  }
  fun1() {
    console.log("fn1");
  }
  fun2() {
    console.log("fn2");
  }
}

class Creator {
  create(name) {
    return new Product(name);
  }
}

// 测试
let creator = new Creator();
let p = creator.create("p1");
p.init();
p.fun1();
console.log(p.name);
