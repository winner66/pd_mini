"use strict";

for (var QRMath = {
  glog: function (i) {
    if (i < 1) throw new Error("glog(" + i + ")");
    return QRMath.LOG_TABLE[i];
  },
  gexp: function (i) {
    for (; i < 0;) i += 255;

    for (; 256 <= i;) i -= 255;

    return QRMath.EXP_TABLE[i];
  },
  EXP_TABLE: new Array(256),
  LOG_TABLE: new Array(256)
}, i = 0; i < 8; i++) QRMath.EXP_TABLE[i] = 1 << i;

for (i = 8; i < 256; i++) QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];

for (i = 0; i < 255; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;

module.exports = QRMath;