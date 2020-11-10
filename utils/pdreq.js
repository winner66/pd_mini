function set(key, value) {
  var pdreq = getApp().globalData.pdreq;
  pdreq[key] = value;
}

function get(key) {
  if (key == null) {
    return getApp().globalData.pdreq;
  } else {
    return getApp().globalData.pdreq[key];
  }
}

function setIdx(key, value) {
  var pdParamsIdx = getApp().globalData.pridx;
  pdParamsIdx[key] = value;
}

function getIdx(key) {
  if (key == null) {
    return getApp().globalData.pridx;
  } else {
    return getApp().globalData.pridx[key];
  }
}

module.exports = {
  set: set,
  get: get,
  setIdx: setIdx,
  getIdx: getIdx,
}