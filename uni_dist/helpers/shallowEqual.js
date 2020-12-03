"use strict";

function _typeof(t) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t;
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  })(t);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function is(t, e) {
  return t === e ? 0 !== t || 0 !== e || 1 / t == 1 / e : t != t && e != e;
}

function shallowEqual(t, e) {
  if (is(t, e)) return !0;
  if ("object" !== _typeof(t) || null === t || "object" !== _typeof(e) || null === e) return !1;
  var o = Object.keys(t),
      r = Object.keys(e);
  if (o.length !== r.length) return !1;

  for (var n = 0; n < o.length; n++) if (!hasOwnProperty.call(e, o[n]) || !is(t[o[n]], e[o[n]])) return !1;

  return !0;
}

var _default = shallowEqual;
exports.default = _default;