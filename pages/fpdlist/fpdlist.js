var fpdreq = require('../../utils/fpdreq.js')

Page({
  data: {
    context: getApp().globalData.context,
    pdInfos: [],
    pageNum: 1,
    pageSize: 20,
    scrollTop: 0,
    pmap: [],
    searching: false,
    nomore: false,
    model:'',
    code:'',
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
      model:this.data.model,
      code:this.data.code,
    };
   
    wx.request({
      url: this.data.context + '/fpd/get-pd-infos',
      data: data,
      method: 'GET',
      success(res) {
        if (res.data.code == 200) {
          console.log('get-fpd-infos:', res.data.data);
          var pdInfos = res.data.data.pdInfos;
          var pmap = res.data.data.pmaps;
          var scrollTop = 0;
          var nomore = pdInfos.length < that.data.pageSize ? true : false;
          if (that.pageNum == 1) {
            that.setData({
              pdInfos: pdInfos,
              pmap: pmap,
              scrollTop: 0,
              nomore: nomore,
            });
          } else {
            that.setData({
              pdInfos: that.data.pdInfos.concat(pdInfos),
              pmap: pmap,
              scrollTop: that.data.scrollTop + 0,
              nomore: nomore,
            });
            wx.hideToast();
          }
        }else{
          wx.hideToast();
          that.data.nomore = true;
          wx.showToast({
            title: '查询产品超时，请重新查询',
            icon: 'none',
            duration: 2000,
            mask: true
          });
        }
      },
      fail(res) {
        wx.hideToast();
        that.data.nomore = true;
        wx.showToast({
          title: '查询产品超时，请重新查询',
          icon: 'none',
          duration: 2000,
          mask: true
        });
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
    this.data.model = options.model;
    this.data.code = options.code;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
      this.data.nomore = true;
      this.data.searching = true;
      this.data.pageNum = 1;
      this.search();
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
  onReachBottom: function(e) {
    console.log('onReachBottom', e);
    // this.data.pageNum += 1;
    // this.search();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onPageScroll(e) {
    // this.data.scrollTop = e.scrollTop;
  },
})