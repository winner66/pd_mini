Page({
  data: {
    context: getApp().globalData.context,
    orderId: '',
    data: [],
    pageNum: 1,
    pageSize: 50,
    scrollTop: 0,
    searching: false,
    nomore: false,
  },

  copyRule: function(e) {
    var rule = '';
    for (var i = 0; i < this.data.data.length; i++) {
      if (rule != '') {
        rule += '\n';
      }
      rule += this.data.data[i].flag;
    }
    wx.setClipboardData({
      data: rule,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '已复制所有标识',
              duration: 1000,
            })
          }
        })
      }
    })
  },

  search: function() {
    wx.showToast({
      // title: '数据加载中',
      icon: 'loading',
      duration: 10000,
      mask: true
    });

    var that = this;
    var data = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      orderId: this.data.orderId,
    };

    wx.request({
      url: this.data.context + '/order/list-item',
      header: {
        'x-access-token': wx.getStorageSync(getApp().globalData.tokenKey)
      },
      data: data,
      method: 'GET',
      success(res) {
        if (res.data.code == 200) {
          console.log('list-order:', res.data.data);
          var data = res.data.data;
          var scrollTop = 0;
          var nomore = res.data.data.length < that.data.pageSize ? true : false;
          if (that.data.pageNum == 1) {
            that.setData({
              scrollTop: 0,
              data: data,
              nomore: nomore,
            });
          } else {
            that.setData({
              scrollTop: that.data.scrollTop + 0,
              data: that.data.data.concat(data),
              nomore: nomore,
            });
          }
          wx.hideToast();
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
        console.log('get-pd-infos:', res);
      },
      complete(res) {
        that.data.searching = false;
      }
    })
  },

  loadMore: function() {
    if (this.data.searching == true || this.data.nomore == true) {
      return;
    }
    console.log('loadMore', this.data.pageNum + 1);
    this.data.searching = true;
    this.data.pageNum += 1;
    this.search();
  },

  scroll: function(e) {
    // console.log('scroll', e);
    this.data.scrollTop = e.detail.scrollTop;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('onLoad');
    this.data.orderId = options.orderId;
    if (this.data.searching == true) {
      return;
    }
    this.data.nomore = false;
    this.data.searching = true;
    this.data.pageNum = 1;
    this.search();
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
    console.log('onShow');
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