"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = popupMixin;
var _classNames3 = _interopRequireDefault(require("./classNames")),
    _eventsMixin = _interopRequireDefault(require("./eventsMixin"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function ownKeys(t, e) {
  var i = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function (e) {
      return Object.getOwnPropertyDescriptor(t, e).enumerable;
    })), i.push.apply(i, n);
  }

  return i;
}
function _objectSpread(t) {
  for (var e = 1; e < arguments.length; e++) {
    var i = null != arguments[e] ? arguments[e] : {};
    e % 2 ? ownKeys(i, !0).forEach(function (e) {
      _defineProperty(t, e, i[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : ownKeys(i).forEach(function (e) {
      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
    });
  }

  return t;
}
function _defineProperty(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}
var DEFAULT_TRIGGER = "onClick",
    CELL_NAME = "../cell/index",
    FIELD_NAME = "../field/index",
    defaultToolbar = {
  title: "请选择",
  cancelText: "取消",
  confirmText: "确定"
},
    defaultEvents = {
  onChange: function () {},
  onConfirm: function () {},
  onCancel: function () {},
  onVisibleChange: function () {},
  onValueChange: function () {}
},
    defaultPlatformProps = {
  labelPropName: "label",
  format: function (e, t) {
    return Array.isArray(e.displayValue) ? e.displayValue.join(",") : e.displayValue;
  }
},
    defaultFieldNames = {
  label: "label",
  value: "value",
  children: "children"
};
function popupMixin() {
  var i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-picker",
      t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : defaultPlatformProps;
  return Behavior({
    behaviors: [(0, _eventsMixin.default)({
      defaultEvents: defaultEvents
    })],
    properties: {
      toolbar: {
        type: Object,
        value: defaultToolbar
      },
      trigger: {
        type: String,
        value: DEFAULT_TRIGGER
      },
      defaultVisible: {
        type: Boolean,
        value: !1
      },
      visible: {
        type: Boolean,
        value: !1
      },
      controlled: {
        type: Boolean,
        value: !1
      },
      disabled: {
        type: Boolean,
        value: !1
      }
    },
    data: {
      mounted: !1,
      popupVisible: !1,
      inputValue: []
    },
    methods: {
      setVisibleState: function (t, e) {
        var i = this,
            n = 1 < arguments.length && void 0 !== e ? e : function () {};

        if (this.data.popupVisible !== t) {
          var a = {
            mounted: !0,
            inputValue: this.data.value,
            popupVisible: t
          };
          this.setData(t ? a : {
            popupVisible: t
          }, function () {
            if (t && i.hasFieldDecorator) {
              var e = i.getFieldElem();
              e && e.changeValue(e.data.value);
            }

            n();
          });
        }
      },
      fireVisibleChange: function (e) {
        this.data.popupVisible !== e && (this.data.controlled || this.setVisibleState(e), this.setScrollValue(void 0), this.triggerEvent("visibleChange", {
          visible: e
        }));
      },
      open: function () {
        this.fireVisibleChange(!0);
      },
      close: function (e) {
        if ("function" == typeof e) {
          var t = this.getPickerValue(this.scrollValue || this.data.inputValue);
          e.call(this, this.formatPickerValue(t));
        }

        this.fireVisibleChange(!1);
      },
      onClosed: function () {
        this.picker = null, this.setData({
          mounted: !1,
          inputValue: null
        });
      },
      onConfirm: function () {
        var t = this;
        this.close(function (e) {
          t.triggerEvent("change", e), t.triggerEvent("confirm", e);
        });
      },
      onCancel: function () {
        var t = this;
        this.close(function (e) {
          return t.triggerEvent("cancel", e);
        });
      },
      onValueChange: function (e) {
        if (this.data.mounted) {
          var t = e.detail.value;
          this.data.cascade ? this.setCasecadeScrollValue(t) : this.setScrollValue(t), this.updated(t, !0), this.triggerEvent("valueChange", this.formatPickerValue(e.detail));
        }
      },
      getPickerValue: function (e) {
        var t = 0 < arguments.length && void 0 !== e ? e : this.data.inputValue;
        return this.picker = this.picker || this.selectComponent(i), this.picker && this.picker.getValue(t);
      },
      formatPickerValue: function (e) {
        return _objectSpread({}, e, _defineProperty({}, t.labelPropName, t.format(e, this.data)));
      },
      getFieldElem: function () {
        return this.field = this.field || this.getRelationNodes(FIELD_NAME)[0];
      },
      setChildProps: function () {
        var n = this;

        if (!this.data.disabled) {
          var e = this.getRelationNodes(CELL_NAME),
              t = this.data.trigger,
              a = void 0 === t ? DEFAULT_TRIGGER : t;
          0 < e.length && e.forEach(function (e) {
            var t = e.data.inputEvents,
                i = e.data.oriInputEvents || _objectSpread({}, t);

            t[a] = function () {
              i && i[a] && i[a].apply(i, arguments), n.onTriggerClick();
            }, e.setData({
              oriInputEvents: i,
              inputEvents: t
            });
          });
        }
      },
      onTriggerClick: function () {
        this.fireVisibleChange(!this.data.popupVisible);
      },
      noop: function () {},
      updated: function (e, t) {
        this.hasFieldDecorator && !t || this.data.inputValue !== e && this.setData({
          inputValue: e
        });
      },
      setScrollValue: function (e) {
        this.scrollValue = e;
      },
      setCasecadeScrollValue: function (e) {
        if (e && this.scrollValue) {
          var t = this.scrollValue.length;
          if (t === e.length && this.scrollValue[t - 1] === e[t - 1]) return;
        }

        this.setScrollValue(e);
      }
    },
    lifetimes: {
      ready: function () {
        var e = this.data,
            t = e.defaultVisible,
            i = e.visible,
            n = e.controlled,
            a = (e.value, n ? i : t);
        "defaultFieldNames" in this.data && this.setData({
          fieldNames: Object.assign({}, defaultFieldNames, this.data.defaultFieldNames)
        }), this.mounted = !0, this.scrollValue = void 0, this.setVisibleState(a), this.setChildProps();
      },
      detached: function () {
        this.mounted = !1;
      }
    },
    definitionFilter: function (e) {
      var t;
      Object.assign(e.relations = e.relations || {}, (_defineProperty(t = {}, CELL_NAME, {
        type: "child",
        observer: function () {
          this.setChildProps();
        }
      }), _defineProperty(t, FIELD_NAME, {
        type: "ancestor"
      }), t)), Object.assign(e.computed = e.computed || {}, {
        classes: ["prefixCls", function (e) {
          return {
            wrap: (0, _classNames3.default)(e),
            toolbar: "".concat(e, "__toolbar"),
            inner: "".concat(e, "__inner"),
            cancel: (0, _classNames3.default)("".concat(e, "__button"), _defineProperty({}, "".concat(e, "__button--cancel"), !0)),
            confirm: (0, _classNames3.default)("".concat(e, "__button"), _defineProperty({}, "".concat(e, "__button--confirm"), !0)),
            hover: "".concat(e, "__button--hover"),
            title: "".concat(e, "__title")
          };
        }]
      }), Object.assign(e.observers = e.observers || {}, {
        visible: function (e) {
          this.data.controlled && this.setVisibleState(e);
        },
        value: function (e) {
          this.updated(e);
        }
      });
    }
  });
}

export default function () {
  return {
    data() {
      return {
        mounted: "",
        inputValue: "",
        oriInputEvents: "",
        inputEvents: "",
        fieldNames: ""
      };
    },

    props: {},
    value: !0,
    methods: {}
  };
}