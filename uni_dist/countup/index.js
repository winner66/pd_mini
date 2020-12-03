"use strict";

function _classCallCheck(t, i) {
  if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(t, i) {
  for (var s = 0; s < i.length; s++) {
    var a = i[s];
    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a);
  }
}

function _createClass(t, i, s) {
  return i && _defineProperties(t.prototype, i), s && _defineProperties(t, s), t;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;

var CountUp = function () {
  function r(t, i, s, a) {
    var e = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : {},
        n = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : getCurrentPages()[getCurrentPages().length - 1];
    _classCallCheck(this, r), Object.assign(this, {
      page: n,
      startVal: t,
      endVal: i,
      decimals: s,
      duration: a,
      options: e
    }), this.__init();
  }

  return _createClass(r, [{
    key: "__init",
    value: function () {
      this.setData = this.page.setData.bind(this.page), this.lastTime = 0, this.mergeOptions(this.options), this.startVal = Number(this.startVal), this.cacheVal = this.startVal, this.endVal = Number(this.endVal), this.countDown = this.startVal > this.endVal, this.frameVal = this.startVal, this.decimals = Math.max(0, this.decimals || 0), this.dec = Math.pow(10, this.decimals), this.duration = 1e3 * Number(this.duration) || 2e3, this.printValue(this.formattingFn(this.startVal));
    }
  }, {
    key: "setDefaultOptions",
    value: function () {
      return {
        useEasing: !0,
        useGrouping: !0,
        separator: ",",
        decimal: ".",
        easingFn: null,
        formattingFn: null,
        printValue: function (t) {}
      };
    }
  }, {
    key: "mergeOptions",
    value: function (t) {
      var i = this.setDefaultOptions();

      for (var s in i) i.hasOwnProperty(s) && (this.options[s] = void 0 !== t[s] ? t[s] : i[s], "function" == typeof this.options[s] && (this.options[s] = this.options[s].bind(this)));

      "" === this.options.separator && (this.options.useGrouping = !1), this.options.prefix || (this.options.prefix = ""), this.options.suffix || (this.options.suffix = ""), this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, this.printValue = this.options.printValue ? this.options.printValue : function () {};
    }
  }, {
    key: "requestAnimationFrame",
    value: function (t) {
      var i = this,
          s = new Date().getTime(),
          a = Math.max(0, 16 - (s - this.lastTime)),
          e = setTimeout(function () {
        t.bind(i)(s + a);
      }, a);
      return this.lastTime = s + a, e;
    }
  }, {
    key: "cancelAnimationFrame",
    value: function (t) {
      clearTimeout(t);
    }
  }, {
    key: "formatNumber",
    value: function (t) {
      var i, s, a, e;
      if (t = t.toFixed(this.decimals), s = (i = (t += "").split("."))[0], a = 1 < i.length ? this.options.decimal + i[1] : "", e = /(\d+)(\d{3})/, this.options.useGrouping) for (; e.test(s);) s = s.replace(e, "$1" + this.options.separator + "$2");
      return this.options.prefix + s + a + this.options.suffix;
    }
  }, {
    key: "easeOutExpo",
    value: function (t, i, s, a) {
      return s * (1 - Math.pow(2, -10 * t / a)) * 1024 / 1023 + i;
    }
  }, {
    key: "count",
    value: function (t) {
      this.startTime || (this.startTime = t);
      var i = (this.timestamp = t) - this.startTime;
      this.remaining = this.duration - i, this.options.useEasing ? this.countDown ? this.frameVal = this.startVal - this.easingFn(i, 0, this.startVal - this.endVal, this.duration) : this.frameVal = this.easingFn(i, this.startVal, this.endVal - this.startVal, this.duration) : this.countDown ? this.frameVal = this.startVal - (this.startVal - this.endVal) * (i / this.duration) : this.frameVal = this.startVal + (this.endVal - this.startVal) * (i / this.duration), this.countDown ? this.frameVal = this.frameVal < this.endVal ? this.endVal : this.frameVal : this.frameVal = this.frameVal > this.endVal ? this.endVal : this.frameVal, this.frameVal = Math.round(this.frameVal * this.dec) / this.dec, this.printValue(this.formattingFn(this.frameVal)), i < this.duration ? this.rAF = this.requestAnimationFrame(this.count) : this.callback && this.callback();
    }
  }, {
    key: "start",
    value: function (t) {
      return this.callback = t, this.rAF = this.requestAnimationFrame(this.count), !1;
    }
  }, {
    key: "pauseResume",
    value: function () {
      this.paused ? (this.paused = !1, delete this.startTime, this.duration = this.remaining, this.startVal = this.frameVal, this.requestAnimationFrame(this.count)) : (this.paused = !0, this.cancelAnimationFrame(this.rAF));
    }
  }, {
    key: "reset",
    value: function () {
      this.paused = !1, delete this.startTime, this.startVal = this.cacheVal, this.cancelAnimationFrame(this.rAF), this.printValue(this.formattingFn(this.startVal));
    }
  }, {
    key: "update",
    value: function (t) {
      this.cancelAnimationFrame(this.rAF), this.paused = !1, delete this.startTime, this.startVal = this.frameVal, this.endVal = Number(t), this.countDown = this.startVal > this.endVal, this.rAF = this.requestAnimationFrame(this.count);
    }
  }]), r;
}(),
    _default = CountUp;

exports.default = _default;