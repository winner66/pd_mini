var fpdreq = require('../../utils/fpdreq.js')

Page({
  data: {
    context: getApp().globalData.context,
    fpr: {},
    toolbar: {
      title: '请选择'
    },
    visible: false,
    options: '',
    value: '',
    checked: false,
    
    model:'',
    code:'',
  },

  keyInput: function (e) {
    var v = e.detail.value;
    this.setData({
      code:v,
    });
  },

  onValueChange(e) {
    var data = {};
    // console.log(e.detail);
    // model ：  AMC E系列
    data.model = e.detail.value;
    data.visible = false;
    console.log(data);
    this.setData(data);
  },

  selectPar(e) {
    this.setData({
      options: this.data.fpr.model,
      value: this.model,
      visible: true,
    })
  },

  onVisibleChange(e) {
    this.setData({ visible: e.detail.visible })
  },

  getFpdList: function () {
    var that = this;
    wx.showToast({
      // title: '数据加载中',
      icon: 'loading',
      duration: 10000,
      mask: true
    });
    wx.request({
      url: this.data.context + '/fpd/get-fpd-models',
      data: {},
      method: 'GET',
      success(res) {
        console.log('get-fpd-models:', res.data.data);
        that.data.fpr.model = res.data.data
      },
      fail(res) {
        console.log('get-fpd-models:', res);
      },
      complete(res) { 
        wx.hideToast();
      }
    })
  },

  validate: function () {
    this.data.checked = true;
    if (!this.data.model || !this.data.code) {
      return false;
    }
    return true;
  },
  search: function (e) {
    var result = this.validate();
    if (!result) {
      this.setData(this.data);
      return;
    }
    getApp().globalData.reSearchFpd = true;
    wx.navigateTo({
      url: '/pages/fpdlist/fpdlist?model=' + this.data.model + "&code=" + this.data.code,
    })
  },

  clear:function(e){
    this.setData({
      model:'',
      code:'',
    });
  },

  onLaunch: function () {
    // console.log('App Launch')
  },

  onLoad:function(options){
    this.getFpdList();
  },

  onShow: function () {
  },

  onHide: function () {
    // console.log('App Hide');
  },
});