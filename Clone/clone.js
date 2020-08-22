(function () {
  var Clone = function (origin, now) {
    this.deepClone(origin, now);
    this.lightClone(origin, now);
  };
  // 深拷贝
  Clone.prototype.deepClone = function (origin, now) {
    var toStr = Object.prototype.toString,
      isArray = "[object Array]",
      now = now || {};
    for (key in origin) {
      if (typeof origin[key] === "object" && typeof origin[key] !== null) {
        if (toStr.call(origin[key]) === isArray) {
          now[key] = [];
        } else {
          now[key] = {};
        }
        this.deepClone(origin[key], now[key]);
      } else {
        now[key] = origin[key];
      }
    }
    return now;
  };
  // 浅拷贝
  Clone.prototype.lightClone = function (origin, now) {
    now = origin;
    return now;
  };
  window.Clone = Clone;
})();
