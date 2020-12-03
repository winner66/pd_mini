"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getSwipeDirection = exports.getPointsDistance = exports.isNearbyPoints = exports.isEqualPoints = exports.getPointsNumber = exports.getTouchPoints = void 0;

var getTouchPoints = function (t, e) {
  var s = 1 < arguments.length && void 0 !== e ? e : 0,
      o = t.touches,
      n = t.changedTouches,
      i = o && 0 < o.length,
      r = n && 0 < n.length,
      a = !i && r ? n[s] : i ? o[s] : t;
  return {
    x: a.pageX,
    y: a.pageY
  };
};

exports.getTouchPoints = getTouchPoints;

var getPointsNumber = function (t) {
  return t.touches && t.touches.length || t.changedTouches && t.changedTouches.length;
};

exports.getPointsNumber = getPointsNumber;

var isEqualPoints = function (t, e) {
  return t.x === e.x && t.y === e.y;
};

exports.isEqualPoints = isEqualPoints;

var isNearbyPoints = function (t, e, s) {
  var o = 2 < arguments.length && void 0 !== s ? s : 25;
  return Math.abs(t.x - e.x) < o & Math.abs(t.y - e.y) < o;
};

exports.isNearbyPoints = isNearbyPoints;

var getPointsDistance = function (t, e) {
  var s = Math.abs(t.x - e.x),
      o = Math.abs(t.y - e.y);
  return Math.sqrt(s * s + o * o);
};

exports.getPointsDistance = getPointsDistance;

var getSwipeDirection = function (t, e, s, o) {
  return Math.abs(t - e) >= Math.abs(s - o) ? 0 < t - e ? "Left" : "Right" : 0 < s - o ? "Up" : "Down";
};

exports.getSwipeDirection = getSwipeDirection;