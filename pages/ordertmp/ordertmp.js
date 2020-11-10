var util = require("../../utils/util.js")

Page({
  data: {
    context: getApp().globalData.context,
    data: [],
    pageNum: 1,
    pageSize: 100,
    scrollTop: 0,
    searching: false,
    nomore: false,
    contact: '',
    phone: '',
    haspd: true,
    checkAll: false,
    checked: false,
    checkIds:[],
  },

  copyRule: function (e) {
    var rule = '';
    for (var i = 0; i < this.data.data.length; i++) {
      if (this.data.data[i].checked) {
        if (rule != ''){
          rule += '\n';
        }
        rule += this.data.data[i].flag;
      }
    }
    if (!rule){
      wx.showToast({
        title: '请选中要复制的产品',
        icon: 'none',
        mask:true,
        duration: 1000,
      });
      return;
    }
    wx.setClipboardData({
      data: rule,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '已复制选中标识',
              duration: 1000,
            })
          }
        })
      }
    })
  },

  navOrderList: function() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },

  navupdate: function(e) {
    var id = e.currentTarget.dataset.id;
    var flag = e.currentTarget.dataset.flag;
    var num = e.currentTarget.dataset.num;
    var descr = e.currentTarget.dataset.descr;
    wx.navigateTo({
      url: '/pages/ordertmp/updateordertmp?tmpId=' + id + '&flag=' + flag + '&num=' + num + '&descr=' + descr,
    })
  },

  selOrder: function(e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var data = this.data.data;
    var checkid = e.currentTarget.dataset.id;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == checkid) {
        data[i].checked = !data[i].checked;
        break;
      }
    }
    var checkAll = true;
    for (var i = 0; i < data.length; i++) {
      if (!data[i].checked){
        checkAll = false;
        break;
      }
    }
    this.setData({
      data: data,
      checkAll:checkAll,
    });
  },

  inputContact: function(e) {
    this.setData({
      contact: e.detail.value
    });
  },

  inputPhone: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  checkAll: function() {
    var checkAll = !this.data.checkAll;
    var data = this.data.data;
    for (var i = 0; i < data.length; i++) {
      data[i].checked = checkAll;
    }
    this.setData({
      data: data,
      checkAll:checkAll,
    });
  },

  selectAll: function(data) {
    for (var i = 0; i < data.length; i++) {
      data[i].checked = true;
    }
  },

  search: function() {
    wx.showToast({
      // title: '数据加载中',
      icon: 'loading',
      duration: 10000,
      mask: true
    });

    this.data.checkIds = {};
    for (var i=0; i<this.data.data.length;i++){
      if (this.data.data[i].checked){
        this.data.checkIds[this.data.data[i].id] = true;
      }
    }

    var that = this;
    var data = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    };

    wx.request({
      url: this.data.context + '/order/list-tmp',
      header: {
        'x-access-token': wx.getStorageSync(getApp().globalData.tokenKey)
      },
      data: data,
      method: 'GET',
      success(res) {
        if (res.data.code == 200) {
          console.log('list-tmp:', res.data.data);
          var data = res.data.data;
          var scrollTop = 0;
          var nomore = data.length < that.data.pageSize ? true : false;
          var haspd = data.length > 0 ? true : false;
          // that.selectAll(data);
          var checkAll = true;
          if (data.length == 0){
            checkAll = false;
          }
          for (var i = 0; i < data.length; i++) {
            if (that.data.checkIds[data[i].id]) {
              data[i].checked = true;
            }else{
              checkAll = false;
            }
          }
          that.setData({
            data: data,
            scrollTop: 0,
            nomore: nomore,
            haspd: haspd,
            checkAll: checkAll,
          });
          getApp().globalData.flushOrder = false;
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
        wx.hideToast();
        console.log('list-tmp', res);
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

  commit: function() {
    if (this.data.data.length == 0) {
      wx.showToast({
        title: '清单中无任何产品',
        icon: 'none',
        duration: 1500,
        mask: true
      });
      return;
    }

    var ids = [];
    for (var i = 0; i < this.data.data.length; i++) {
      if (this.data.data[i].checked) {
        ids[i] = this.data.data[i].id;
      }
    }

    if (ids.length == 0) {
      wx.showToast({
        title: '请选中要提交的产品',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      return;
    }

    ids = ids.join(',');
    wx.navigateTo({
      url: '/pages/ordertmp/ordercon?ids=' + ids,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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
    util.login();
    if (this.data.searching == true) {
      return;
    }
    if (getApp().globalData.flushOrder) {
      this.data.nomore = false;
      this.data.searching = true;
      this.data.pageNum = 1;
      this.search();
    }
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
  // onShareAppMessage: function() {

  // }
})