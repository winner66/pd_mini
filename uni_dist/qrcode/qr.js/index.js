"use strict";

var QRCode = require("./lib/QRCode.js"),
    ErrorCorrectLevel = require("./lib/ErrorCorrectLevel.js"),
    qrcode = function (r, e) {
  var o = new QRCode((e = e || {}).typeNumber || -1, e.errorCorrectLevel || ErrorCorrectLevel.H);
  return o.addData(r), o.make(), o;
};

qrcode.ErrorCorrectLevel = ErrorCorrectLevel, module.exports = qrcode;