<template>
<view>
<canvas class="wux-class" :canvas-id="canvasId" :style="'width: ' + ( width + 'px' ) + '; height: ' + ( height + 'px' ) + ';'" @tap="onTap"></canvas>
</view>
</template>

<script>
"use strict";
var _index = _interopRequireDefault(require("./qr.js/index"));
function _interopRequireDefault(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}
var utf16to8 = function (t) {
  for (var e = t.length, r = "", o = 0; o < e; o++) {
    var i = t.charCodeAt(o);
    1 <= i && i <= 127 ? r += t.charAt(o) : (2047 < i ? (r += String.fromCharCode(224 | i >> 12 & 15), r += String.fromCharCode(128 | i >> 6 & 63)) : r += String.fromCharCode(192 | i >> 6 & 31), r += String.fromCharCode(128 | i >> 0 & 63));
  }

  return r;
};

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    typeNumber: {
      type: Number,
      default: -1
    },
    errorCorrectLevel: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    fgColor: {
      type: String,
      default: "black"
    },
    bgColor: {
      type: String,
      default: "white"
    },
    canvasId: {
      type: String,
      default: "wux-qrcode"
    },
    data: {
      type: String,
      default: ""
    }
  },
  watch: {
    typeNumber: {
      handler: function (t) {
        this.draw({
          typeNumber: t
        });
      },
      immediate: true
    },
    errorCorrectLevel: {
      handler: function (t) {
        this.draw({
          errorCorrectLevel: t
        });
      },
      immediate: true
    },
    width: {
      handler: function (t) {
        this.draw({
          width: t
        });
      },
      immediate: true
    },
    height: {
      handler: function (t) {
        this.draw({
          height: t
        });
      },
      immediate: true
    },
    fgColor: {
      handler: function (t) {
        this.draw({
          fgColor: t
        });
      },
      immediate: true
    },
    bgColor: {
      handler: function (t) {
        this.draw({
          bgColor: t
        });
      },
      immediate: true
    },
    data: {
      handler: function (t) {
        this.draw({
          data: t
        });
      },
      immediate: true
    }
  },
  beforeMount: function () {
    this.draw();
  },
  destroyed: function () {
    this.ctx = null;
  },
  methods: {
    draw: function (t) {
      var a = this,
          e = 0 < arguments.length && void 0 !== t ? t : {},
          r = Object.assign({}, this, e),
          o = r.typeNumber,
          i = r.errorCorrectLevel,
          n = r.width,
          u = r.height,
          h = r.fgColor,
          c = r.bgColor,
          l = r.canvasId,
          d = r.data,
          s = (0, _index.default)(utf16to8(d), {
        typeNumber: o,
        errorCorrectLevel: i
      }).modules,
          f = n / s.length,
          v = u / s.length;
      this.ctx = this.ctx || uni.createCanvasContext(l, this), this.ctx.scale(1, 1), s.forEach(function (t, i) {
        t.forEach(function (t, e) {
          a.ctx.setFillStyle(t ? h : c);
          var r = Math.ceil((e + 1) * f) - Math.floor(e * f),
              o = Math.ceil((i + 1) * v) - Math.floor(i * v);
          a.ctx.fillRect(Math.round(e * f), Math.round(i * v), r, o);
        });
      }), this.ctx.draw();
    },
    onTap: function () {
      this.$emit("click");
    }
  }
};
</script>
