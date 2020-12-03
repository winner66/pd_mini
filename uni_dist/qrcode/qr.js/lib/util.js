"use strict";

var Mode = require("./mode.js"),
    Polynomial = require("./Polynomial.js"),
    math = require("./math.js"),
    QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
},
    QRUtil = {
  PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
  G15: 1335,
  G18: 7973,
  G15_MASK: 21522,
  getBCHTypeInfo: function (r) {
    for (var t = r << 10; 0 <= QRUtil.getBCHDigit(t) - QRUtil.getBCHDigit(QRUtil.G15);) t ^= QRUtil.G15 << QRUtil.getBCHDigit(t) - QRUtil.getBCHDigit(QRUtil.G15);

    return (r << 10 | t) ^ QRUtil.G15_MASK;
  },
  getBCHTypeNumber: function (r) {
    for (var t = r << 12; 0 <= QRUtil.getBCHDigit(t) - QRUtil.getBCHDigit(QRUtil.G18);) t ^= QRUtil.G18 << QRUtil.getBCHDigit(t) - QRUtil.getBCHDigit(QRUtil.G18);

    return r << 12 | t;
  },
  getBCHDigit: function (r) {
    for (var t = 0; 0 != r;) t++, r >>>= 1;

    return t;
  },
  getPatternPosition: function (r) {
    return QRUtil.PATTERN_POSITION_TABLE[r - 1];
  },
  getMask: function (r, t, e) {
    switch (r) {
      case QRMaskPattern.PATTERN000:
        return (t + e) % 2 == 0;

      case QRMaskPattern.PATTERN001:
        return t % 2 == 0;

      case QRMaskPattern.PATTERN010:
        return e % 3 == 0;

      case QRMaskPattern.PATTERN011:
        return (t + e) % 3 == 0;

      case QRMaskPattern.PATTERN100:
        return (Math.floor(t / 2) + Math.floor(e / 3)) % 2 == 0;

      case QRMaskPattern.PATTERN101:
        return t * e % 2 + t * e % 3 == 0;

      case QRMaskPattern.PATTERN110:
        return (t * e % 2 + t * e % 3) % 2 == 0;

      case QRMaskPattern.PATTERN111:
        return (t * e % 3 + (t + e) % 2) % 2 == 0;

      default:
        throw new Error("bad maskPattern:" + r);
    }
  },
  getErrorCorrectPolynomial: function (r) {
    for (var t = new Polynomial([1], 0), e = 0; e < r; e++) t = t.multiply(new Polynomial([1, math.gexp(e)], 0));

    return t;
  },
  getLengthInBits: function (r, t) {
    if (1 <= t && t < 10) switch (r) {
      case Mode.MODE_NUMBER:
        return 10;

      case Mode.MODE_ALPHA_NUM:
        return 9;

      case Mode.MODE_8BIT_BYTE:
      case Mode.MODE_KANJI:
        return 8;

      default:
        throw new Error("mode:" + r);
    } else if (t < 27) switch (r) {
      case Mode.MODE_NUMBER:
        return 12;

      case Mode.MODE_ALPHA_NUM:
        return 11;

      case Mode.MODE_8BIT_BYTE:
        return 16;

      case Mode.MODE_KANJI:
        return 10;

      default:
        throw new Error("mode:" + r);
    } else {
      if (!(t < 41)) throw new Error("type:" + t);

      switch (r) {
        case Mode.MODE_NUMBER:
          return 14;

        case Mode.MODE_ALPHA_NUM:
          return 13;

        case Mode.MODE_8BIT_BYTE:
          return 16;

        case Mode.MODE_KANJI:
          return 12;

        default:
          throw new Error("mode:" + r);
      }
    }
  },
  getLostPoint: function (r) {
    for (var t = r.getModuleCount(), e = 0, a = 0; a < t; a++) for (var i = 0; i < t; i++) {
      for (var o = 0, n = r.isDark(a, i), s = -1; s <= 1; s++) if (!(a + s < 0 || t <= a + s)) for (var R = -1; R <= 1; R++) i + R < 0 || t <= i + R || 0 == s && 0 == R || n == r.isDark(a + s, i + R) && o++;

      5 < o && (e += 3 + o - 5);
    }

    for (a = 0; a < t - 1; a++) for (i = 0; i < t - 1; i++) {
      var T = 0;
      r.isDark(a, i) && T++, r.isDark(a + 1, i) && T++, r.isDark(a, i + 1) && T++, r.isDark(a + 1, i + 1) && T++, 0 != T && 4 != T || (e += 3);
    }

    for (a = 0; a < t; a++) for (i = 0; i < t - 6; i++) r.isDark(a, i) && !r.isDark(a, i + 1) && r.isDark(a, i + 2) && r.isDark(a, i + 3) && r.isDark(a, i + 4) && !r.isDark(a, i + 5) && r.isDark(a, i + 6) && (e += 40);

    for (i = 0; i < t; i++) for (a = 0; a < t - 6; a++) r.isDark(a, i) && !r.isDark(a + 1, i) && r.isDark(a + 2, i) && r.isDark(a + 3, i) && r.isDark(a + 4, i) && !r.isDark(a + 5, i) && r.isDark(a + 6, i) && (e += 40);

    var M = 0;

    for (i = 0; i < t; i++) for (a = 0; a < t; a++) r.isDark(a, i) && M++;

    return e += 10 * (Math.abs(100 * M / t / t - 50) / 5);
  }
};

module.exports = QRUtil;