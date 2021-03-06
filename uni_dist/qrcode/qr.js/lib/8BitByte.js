"use strict";

var mode = require("./mode.js");

function QR8bitByte(t) {
  this.mode = mode.MODE_8BIT_BYTE, this.data = t;
}

QR8bitByte.prototype = {
  getLength: function (t) {
    return this.data.length;
  },
  write: function (t) {
    for (var e = 0; e < this.data.length; e++) t.put(this.data.charCodeAt(e), 8);
  }
}, module.exports = QR8bitByte;