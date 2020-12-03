"use strict";

function _typeof(e) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  })(e);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var hasOwn = {}.hasOwnProperty;

function classNames() {
  for (var e = [], t = 0; t < arguments.length; t++) {
    var o = arguments[t];

    if (o) {
      var r = _typeof(o);

      if ("string" === r || "number" === r) e.push(o);else if (Array.isArray(o) && o.length) {
        var n = classNames.apply(null, o);
        n && e.push(n);
      } else if ("object" === r) for (var s in o) hasOwn.call(o, s) && o[s] && e.push(s);
    }
  }

  return e.join(" ");
}

var _default = classNames;
exports.default = _default;