function set(key, value) {
  var fpdreq = getApp().globalData.fpdreq;
  fpdreq[key] = value;
}

function get(key) {
  if (key == null) {
    return getApp().globalData.fpdreq;
  } else {
    return getApp().globalData.fpdreq[key];
  }
}

function setIdx(key, value) {
  var pdParamsIdx = getApp().globalData.fpridx;
  pdParamsIdx[key] = value;
}

function getIdx(key) {
  if (key == null) {
    return getApp().globalData.fpridx;
  } else {
    return getApp().globalData.fpridx[key];
  }
}

module.exports = {
  set: set,
  get: get,
  setIdx: setIdx,
  getIdx: getIdx
};