"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.format = exports.diff = exports.monthDiff = exports.parse = void 0;

var parse = function (e) {
  if (e instanceof Date) return e;
  if (!isNaN(e) || /^\d+$/.test(e)) return new Date(parseInt(e, 10));
  var r = e.trim();
  return r = (r = (r = (r = (r = r.replace(/\.\d+/, "")).replace(/-/, "/").replace(/-/, "/")).replace(/T/, " ").replace(/Z/, " UTC")).replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2")).replace(/([\+\-]\d\d)$/, " $100"), new Date(r);
};

exports.parse = parse;

var monthDiff = function (e, r) {
  var t = parse(e),
      a = parse(r);
  return 12 * (t.getFullYear() - a.getFullYear()) + t.getMonth() - a.getMonth();
};

exports.monthDiff = monthDiff;

var diff = function (e, r, t) {
  var a = parse(e),
      n = r ? parse(r) : new Date(),
      s = n.getTime() - a.getTime();
  return "second" === t && s / 1e3 || "minute" === t && s / 1e3 / 60 || "hour" === t && s / 1e3 / 60 / 60 || "day" === t && s / 1e3 / 60 / 60 / 24 || "week" === t && s / 1e3 / 60 / 60 / 24 / 7 || "month" === t && monthDiff(a, n) || "quarter" === t && monthDiff(a, n) / 3 || "year" === t && monthDiff(a, n) / 12 || s;
};

exports.diff = diff;

var defaults = {
  second: ["刚刚", "片刻后"],
  seconds: ["%d 秒前", "%d 秒后"],
  minute: ["大约 1 分钟前", "大约 1 分钟后"],
  minutes: ["%d 分钟前", "%d 分钟后"],
  hour: ["大约 1 小时前", "大约 1 小时后"],
  hours: ["%d 小时前", "%d 小时后"],
  day: ["1 天前", "1 天后"],
  days: ["%d 天前", "%d 天后"],
  month: ["大约 1 个月前", "大约 1 个月后"],
  months: ["%d 月前", "%d 月后"],
  year: ["大约 1 年前", "大约 1 年后"],
  years: ["%d 年前", "%d 年后"]
},
    format = function (e, r) {
  function t(e, r) {
    return e.replace(/%d/i, r);
  }

  var a = Object.assign({}, defaults, r),
      n = e < 0 ? 1 : 0,
      s = Math.abs(e) / 1e3,
      o = s / 60,
      d = o / 60,
      f = d / 24,
      p = f / 365;
  return s < 10 && t(a.second[n], parseInt(s)) || s < 45 && t(a.seconds[n], parseInt(s)) || s < 90 && t(a.minute[n], 1) || o < 45 && t(a.minutes[n], parseInt(o)) || o < 90 && t(a.hour[n], 1) || d < 24 && t(a.hours[n], parseInt(d)) || d < 42 && t(a.day[n], 1) || f < 30 && t(a.days[n], parseInt(f)) || f < 45 && t(a.month[n], 1) || f < 365 && t(a.months[n], parseInt(f / 30)) || p < 1.5 && t(a.year[n], 1) || t(a.years[n], parseInt(p));
};

exports.format = format;