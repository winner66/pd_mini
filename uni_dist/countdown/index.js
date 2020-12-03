"use strict";

function _typeof(t) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t;
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  })(t);
}

function _classCallCheck(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(t, e) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
  }
}

function _createClass(t, e, n) {
  return e && _defineProperties(t.prototype, e), n && _defineProperties(t, n), t;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;

var Countdown = function () {
  function n() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
        e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : getCurrentPages()[getCurrentPages().length - 1];
    _classCallCheck(this, n), Object.assign(this, {
      page: e,
      options: t
    }), this.__init();
  }

  return _createClass(n, [{
    key: "__init",
    value: function () {
      this.setData = this.page.setData.bind(this.page), this.restart(this.options);
    }
  }, {
    key: "setDefaults",
    value: function () {
      return {
        date: "June 7, 2087 15:03:25",
        refresh: 1e3,
        offset: 0,
        onEnd: function () {},
        render: function (t) {}
      };
    }
  }, {
    key: "mergeOptions",
    value: function (t) {
      var e = this.setDefaults();

      for (var n in e) e.hasOwnProperty(n) && (this.options[n] = void 0 !== t[n] ? t[n] : e[n], "date" === n && "object" !== _typeof(this.options.date) && (this.options.date = new Date(this.options.date)), "function" == typeof this.options[n] && (this.options[n] = this.options[n].bind(this)));

      "object" !== _typeof(this.options.date) && (this.options.date = new Date(this.options.date));
    }
  }, {
    key: "getDiffDate",
    value: function () {
      var t = (this.options.date.getTime() - Date.now() + this.options.offset) / 1e3,
          e = {
        years: 0,
        days: 0,
        hours: 0,
        min: 0,
        sec: 0,
        millisec: 0
      };
      return t <= 0 ? this.interval && (this.stop(), this.options.onEnd()) : (31557600 <= t && (e.years = Math.floor(t / 31557600), t -= 365.25 * e.years * 86400), 86400 <= t && (e.days = Math.floor(t / 86400), t -= 86400 * e.days), 3600 <= t && (e.hours = Math.floor(t / 3600), t -= 3600 * e.hours), 60 <= t && (e.min = Math.floor(t / 60), t -= 60 * e.min), e.sec = Math.round(t), e.millisec = t % 1 * 1e3), e;
    }
  }, {
    key: "leadingZeros",
    value: function (t, e) {
      var n = 1 < arguments.length && void 0 !== e ? e : 2;
      return (t = String(t)).length > n ? t : (Array(n + 1).join("0") + t).substr(-n);
    }
  }, {
    key: "update",
    value: function (t) {
      return this.options.date = "object" !== _typeof(t) ? new Date(t) : t, this.render(), this;
    }
  }, {
    key: "stop",
    value: function () {
      return this.interval && (clearInterval(this.interval), this.interval = !1), this;
    }
  }, {
    key: "render",
    value: function () {
      return this.options.render(this.getDiffDate()), this;
    }
  }, {
    key: "start",
    value: function () {
      var t = this;
      return !this.interval && (this.render(), this.options.refresh && (this.interval = setInterval(function () {
        t.render();
      }, this.options.refresh)), this);
    }
  }, {
    key: "updateOffset",
    value: function (t) {
      return this.options.offset = t, this;
    }
  }, {
    key: "restart",
    value: function (t) {
      var e = 0 < arguments.length && void 0 !== t ? t : {};
      return this.mergeOptions(e), this.interval = !1, this.start(), this;
    }
  }]), n;
}(),
    _default = Countdown;

exports.default = _default;