var util = require("../../utils/util.js")

Page({
  data: {
    context: getApp().globalData.context,
    ids:[],
    data: [],
    pageNum: 1,
    pageSize: 100,
    scrollTop: 0,
    searching: false,
    nomore: false,
    contact: '',
    phone: '',
    company:'',
    descr:'',
    orderType:'',
    haspd: false,
    checked: false,
    scrollIntoView:'',
    options:[],
    value:'',
    visible:false,
    toolbar: {
      title: '请选择'
    },
  },

  navOrderList:function(){
      wx.navigateTo({
        url: '/pages/order/order',
      })
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

  inputCompany: function (e) {
    this.setData({
      company: e.detail.value
    });
  },

  inputDescr: function (e) {
    this.setData({
      descr: e.detail.value
    });
  },

  scroll: function(e) {
    // console.log('scroll', e);
    this.data.scrollTop = e.detail.scrollTop;
  },

  validate: function () {
    this.data.checked = true;
    if (!this.data.phone || !this.data.contact || !this.data.orderType || !this.data.company) {
      this.setData({
        scrollTop: 999999,
      });
      return false;
    }
    return true;
  },

  save: function(e) {
    // if (this.data.data.length == 0) {
    //   wx.showToast({
    //     title: '清单中无任何产品',
    //     icon: 'none',
    //     duration: 3000,
    //     mask: true
    //   });
    //   return;
    // }

    var result = this.validate();
    if (!result) {
      this.setData(this.data);
      return;
    }

    var that = this;
    wx.showToast({
      // title: '数据加载中',
      icon: 'loading',
      duration: 10000,
      mask: true
    });

    var data = {
      type:that.data.orderType,
      contact: that.data.contact,
      phone: that.data.phone,
      company:that.data.company,
      descr:that.data.descr,
      tmpIds:that.data.ids,
    };
    wx.request({
      url: that.data.context + '/order/save-order',
      header: {
        'x-access-token': wx.getStorageSync(getApp().globalData.tokenKey)
      },
      data: data,
      method: 'POST',
      success(res) {
        if (res.data.code == 200) {
          that.setData({
            data: [],
            scrollTop: 0,
            nomore: true,
            haspd: false,
          });
          wx.hideToast();
          getApp().globalData.flushOrder = true;
          wx.showToast({
            title: '清单提交成功',
            icon: 'success',
            duration: 1500,
            mask: true
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 1500);
        } else {
          wx.hideToast();
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500,
          });
        }
      },
      fail(res) { },
      complete(res) { }
    })

    // var that = this;
    // wx.showModal({
    //   title: '确定提交清单?',
    //   // content: '是否确定提交清单？',
    //   showCancel: true,
    //   cancelText: "否",
    //   confirmText: "是",
    //   success: function(res) {
    //     if (res.cancel) {} else {
          
    //     }
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },

  getOrderRelInfo: function(e) {
    wx.showToast({
      // title: '数据加载中',
      icon: 'loading',
      duration: 10000,
      mask: true
    });
    var that = this;
    wx.request({
      url: that.data.context + '/order/get-order-rel-info',
      header: {
        'x-access-token': wx.getStorageSync(getApp().globalData.tokenKey)
      },
      data: {},
      method: 'GET',
      success(res) {
        if (res.data.code == 200) {
          that.setData({
            contact: res.data.data.address.contact,
            phone: res.data.data.address.phone,
            company: res.data.data.address.company,
            options: res.data.data.orderType,
          });
        } else {
        }
      },
      fail(res) {},
      complete(res) { wx.hideToast();}
    })
  },

  onValueChange(e) {
    var data = {};
    data.orderType = e.detail.value;
    data.visible = false;
    this.setData(data);
    console.log(`onValueChange `, e.detail)
  },

  selectPar(e) {
    this.setData({
      options:this.data.options,
      value: this.data.orderType,
      visible: true,
    })
  },

  onVisibleChange(e) {
    // console.log('visible:',e);
    this.setData({ visible: e.detail.visible })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOrderRelInfo();
    var ids = options.ids;
    if (ids){
      this.data.ids = ids.split(',');
    }
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
    util.login();
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