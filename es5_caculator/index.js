(function (doc) {
  var Caculator = function (doc) {
    this.num1 = doc.getElementsByTagName("input")[0];
    this.num2 = doc.getElementsByTagName("input")[1];

    this.result = doc.getElementsByTagName("p")[0];
    this.init();
  };
  Caculator.prototype.init = function () {
    doc.addEventListener("click", this.calClick.bind(this), false);
  };
  Caculator.prototype.calClick = function (ev) {
    e = ev || window.event;
    tar = e.target || e.srcElement;
    var tagName = tar.tagName.toLowerCase();
    if (tagName == "button") {
      var field = tar.getAttribute("field"),
        val1 = Number(this.num1.value) || 0;
      val2 = Number(this.num2.value) || 0;
      console.log(val1, val2);
      this.result.innerHTML = this.yunsuan(val1, val2, field);
    }
  };
  Caculator.prototype.yunsuan = function (num1, num2, field) {
    switch (field) {
      case "plus":
        return num1 + num2;
      case "minus":
        return num1 - num2;
      case "mul":
        return num1 * num2;
      case "div":
        return num1 / num2;
    }
  };
  window.Caculator = Caculator;
})(document);
