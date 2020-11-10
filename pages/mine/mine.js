var fileUtil = require("../../utils/fileUtil2.js")
var util = require("../../utils/util.js")
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    context: getApp().globalData.context,
    pdf: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  init: function() {
    wx.showToast({
      // title: '数据加载中',
      icon: 'loading',
      duration: 10000,
      mask: true
    });

    var that = this;
    wx.request({
      url: this.data.context + '/pub/get-pdf',
      data: {},
      method: 'GET',
      success(res) {
        if (res.data.code == 200) {
          console.log('get-pdf:', res.data.data);
          that.setData({
            pdf: res.data.data,
          });
        }
      },
      fail(res) {
        console.log('get-pdf:', res);
      },
      complete(res) {
        wx.hideToast();
      }
    })
  },

  clear:function(){
    wx.removeStorageSync(getApp().globalData.tokenKey);
    util.login();
    fileUtil.clear();
    wx.showToast({
      title: '清除缓存成功',
      icon: 'none',
      duration: 1500,
      mask: true
    });
  },
  
  testTap:function(){
    wx.navigateTo({
      url: '/pages/fpdSearchTest/fpdSearchTest',
    })
  },

  openPdf: function(e) {
    var url = this.data.context + e.currentTarget.dataset.url;
    var file = e.currentTarget.dataset.url.replace(/\//g, "_");
    fileUtil.open(url, file);
  },

  onLoad: function() {
    this.init();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})