"use strict";

var math = require("./math.js");

function QRPolynomial(t, e) {
  if (null == t.length) throw new Error(t.length + "/" + e);

  for (var n = 0; n < t.length && 0 == t[n];) n++;

  this.num = new Array(t.length - n + e);

  for (var g = 0; g < t.length - n; g++) this.num[g] = t[g + n];
}

QRPolynomial.prototype = {
  get: function (t) {
    return this.num[t];
  },
  getLength: function () {
    return this.num.length;
  },
  multiply: function (t) {
    for (var e = new Array(this.getLength() + t.getLength() - 1), n = 0; n < this.getLength(); n++) for (var g = 0; g < t.getLength(); g++) e[n + g] ^= math.gexp(math.glog(this.get(n)) + math.glog(t.get(g)));

    return new QRPolynomial(e, 0);
  },
  mod: function (t) {
    if (this.getLength() - t.getLength() < 0) return this;

    for (var e = math.glog(this.get(0)) - math.glog(t.get(0)), n = new Array(this.getLength()), g = 0; g < this.getLength(); g++) n[g] = this.get(g);

    for (g = 0; g < t.getLength(); g++) n[g] ^= math.gexp(math.glog(t.get(g)) + e);

    return new QRPolynomial(n, 0).mod(t);
  }
}, module.exports = QRPolynomial;