// pages/mine/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    context: getApp().globalData.context,
    data: {},
  },

  callPhone: function (e) {
    // console.log(e, e);
    var phone = e.currentTarget.dataset.phone;
    if (!phone) {
      return;
    }
    var p = phone.split(" ");
    if (p.length > 1) {
      wx.showActionSheet({
        itemList: p,
        success: function (res) {
          if (!res.cancel) {
            console.log(res.tapIndex);
            wx.makePhoneCall({
              phoneNumber: p[res.tapIndex]
            })
          }
        }
      });
    } else {
      wx.makePhoneCall({
        phoneNumber: phone,
      })
    }
  },

  list: function() {
    wx.showToast({
      icon: 'loading',
      duration: 10000,
      mask: true
    });

    var that = this;
    var data = {};

    wx.request({
      url: this.data.context + '/cm/list-contact',
      data: data,
      method: 'GET',
      success(res) {
        if (res.data.code == 200) {
          console.log('list-contact:', res.data.data);
          var data = res.data.data;
          that.setData({
            data: data,
          });
        }
      },
      fail(res) {
        console.log('list:', res);
      },
      complete(res) {
        wx.hideToast();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.list();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})