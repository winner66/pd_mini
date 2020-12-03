<template>
<view>
<canvas class="wux-class" :canvas-id="canvasId" :style="'width: ' + ( width + 'px' ) + '; height: ' + ( height + 'px' ) + ';'"></canvas>
</view>
</template>

<script>
"use strict";
var _barcode = _interopRequireDefault(require("./barcode"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var defalutOptions = {
  number: !0,
  prefix: !0,
  color: "black",
  debug: !1,
  onValid: function () {},
  onInvalid: function () {},
  onSuccess: function () {},
  onError: function () {}
};

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 100
    },
    number: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: defalutOptions
    },
    canvasId: {
      type: String,
      default: "wux-barcode"
    }
  },
  watch: {
    number: {
      handler: function (e) {
        this.draw({
          number: e
        });
      },
      immediate: true
    }
  },
  methods: {
    draw: function (e) {
      var t = 0 < arguments.length && void 0 !== e ? e : {},
          n = Object.assign({}, this, t),
          i = n.canvasId,
          r = n.number,
          o = n.width,
          u = n.height,
          a = n.options;
      new _barcode.default(i, r, Object.assign({
        width: o,
        height: u
      }, a), this);
    }
  }
};
</script>
