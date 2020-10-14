class MVVM {
  constructor(opt) {
    this.$el = opt.el;
    this.$data = opt.data;
    if (this.$el) {
      new Observer(this.$data);
      new Compile(this.$el, this);
    }
  }
}
