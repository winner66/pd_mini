Page({
  data: {
    context: getApp().globalData.context,
    tmpId:'',
    flag:'',
    num:'',
    descr:'',
    checked:false,
  },

  inputNum:function(e){
    this.setData({
      num: e.detail.value
    });
  },

  inputDesc: function (e) {
    this.data.descr = e.detail.value;
  },

  validate: function () {
    this.data.checked = true;
    if (!this.data.num) {
      return false;
    }
    return true;
  },

  update:function(e){
    var result = this.validate();
    if (!result){
      this.setData(this.data);
      return;
    }
    wx.showToast({
      // title: '请稍等',
      icon: 'loading',
      duration: 3000,
      mask: true
    });

    var that = this;
    var data = {
      id:this.data.tmpId,
      num:this.data.num,
      descr:this.data.descr,
    };

    wx.request({
      url: this.data.context + '/order/update-tmp-num',
      header: { 'x-access-token': wx.getStorageSync(getApp().globalData.tokenKey) },
      data: data,
      method: 'POST',
      success(res) {
        if (res.data.code == 200) {
          wx.hideToast();
          getApp().globalData.flushOrder = true;
          wx.navigateBack({
            delta: 1
          });
        } else {
          wx.hideToast();
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500,
          });
        }
      },
      fail(res) {
      },
      complete(res) {
      }
    })
  },

  del:function(){
    var that = this;
      wx.showModal({
        title: '提示',
        content: '确认要删除么',
        confirmText: "确认",
        cancelText: "取消",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            wx.showToast({
              // title: '请稍等',
              icon: 'loading',
              duration: 3000,
              mask: true
            });
            
            var data = {
              id: that.data.tmpId,
            };

            wx.request({
              url: that.data.context + '/order/delete-tmp',
              header: { 'x-access-token': wx.getStorageSync(getApp().globalData.tokenKey) },
              data: data,
              method: 'POST',
              success(res) {
                if (res.data.code == 200) {
                  getApp().globalData.flushOrder = true;
                  wx.hideToast();
                  wx.navigateBack({
                    delta: 1
                  });
                } else {
                  wx.hideToast();
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 1500,
                  });
                }
              },
              fail(res) {
              },
              complete(res) {
              }
            })
          }
        }
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      console.log(options);
      var data={};
      data.tmpId = options.tmpId;
      data.flag = options.flag;
      data.num = options.num;
      data.descr = options.descr;
      this.setData(data);
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