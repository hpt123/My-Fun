class State {
  constructor(color) {
    this.color = color;
  }
  handle(context) {
    console.log("--------------", this);
    console.log(`turn to ${this.color} light`);
    context.seState(this);
  }
}
class Context {
  constructor() {
    this.state = null;
  }
  getState() {
    return this.state;
  }
  seState(state) {
    this.state = state;
  }
}
// debugger;
// 测试
let context = new Context();
let green = new State("green");
let yellow = new State("yellow");
let red = new State("red");

//绿灯亮了
green.handle(context);
console.log(context.getState());
//红灯亮了
red.handle(context);
console.log(context.getState());
//黄灯亮了
yellow.handle(context);
console.log(context.getState());
