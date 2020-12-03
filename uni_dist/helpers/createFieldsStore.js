"use strict";

function ownKeys(t, e) {
  var r = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function (e) {
      return Object.getOwnPropertyDescriptor(t, e).enumerable;
    })), r.push.apply(r, n);
  }

  return r;
}

function _objectSpread(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = null != arguments[e] ? arguments[e] : {};
    e % 2 ? ownKeys(r, !0).forEach(function (e) {
      _defineProperty(t, e, r[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : ownKeys(r).forEach(function (e) {
      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
    });
  }

  return t;
}

function _defineProperty(e, t, r) {
  return t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}

function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}

function _createClass(e, t, r) {
  return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = createFieldsStore;

var FieldsStore = function () {
  function t() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
    _classCallCheck(this, t), this.fields = e;
  }

  return _createClass(t, [{
    key: "setFields",
    value: function (e) {
      Object.assign(this.fields, e);
    }
  }, {
    key: "updateFields",
    value: function (e) {
      this.fields = e;
    }
  }, {
    key: "clearField",
    value: function (e) {
      delete this.fields[e];
    }
  }, {
    key: "getValueFromFields",
    value: function (e, t) {
      var r = t[e];
      return r && "value" in r ? r.value : r.initialValue;
    }
  }, {
    key: "getAllFieldsName",
    value: function () {
      var e = this.fields;
      return e ? Object.keys(e) : [];
    }
  }, {
    key: "getField",
    value: function (e) {
      return _objectSpread({}, this.fields[e], {
        name: e
      });
    }
  }, {
    key: "getFieldValuePropValue",
    value: function (e) {
      var t = e.name,
          r = e.valuePropName,
          n = this.getField(t);
      return _defineProperty({}, r, "value" in n ? n.value : n.initialValue);
    }
  }, {
    key: "getFieldValue",
    value: function (e) {
      return this.getValueFromFields(e, this.fields);
    }
  }, {
    key: "getFieldsValue",
    value: function (e) {
      var r = this;
      return (e || this.getAllFieldsName()).reduce(function (e, t) {
        return e[t] = r.getFieldValue(t), e;
      }, {});
    }
  }, {
    key: "resetFields",
    value: function (e) {
      var n = this.fields;
      return (e || this.getAllFieldsName()).reduce(function (e, t) {
        var r = n[t];
        return r && (e[t] = r.initialValue), e;
      }, {});
    }
  }]), t;
}();

function createFieldsStore(e) {
  return new FieldsStore(e);
}