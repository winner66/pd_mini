var util = require("../../utils/util.js")

Page({
  data: {
    context: getApp().globalData.context,
    pdInfos: [],
    pageNum: 1,
    pageSize: 20,
    scrollTop: 0,
    key: '',
    searching: false,
    // 加载是否完毕
    nomore: false,
  },
// （埋点）
  nav: function(e) {
    util.collect({
      token: wx.getStorageSync(getApp().globalData.tokenKey),
      page: '产品列表页',
      event: '查看产品',
      data: e.currentTarget.dataset.title,
    });

    wx.navigateTo({
      url: '/pages/pdetail/pdetail?piId=' + e.currentTarget.dataset.id,
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
      pageSize: this.data.pageSize
    };

    var pdpar = getApp().globalData.pdpar;
    console.log('pdpar',pdpar);
    for (let key in pdpar) {
      if ('key' == key) {
        if (pdpar[key] && pdpar[key] != '') {
          data[key] = pdpar[key];
        }
      } else if (pdpar[key] && pdpar[key] != '') {
        data[key] = pdpar[key][pdpar[key].length - 1];
      }
    }
    var text = getApp().globalData.pdpartext;
    console.log('pdpartext',text);
    if (text && text.capacity) {
      var index = text.capacity.lastIndexOf("\/");
      data['capacityCode'] = text.capacity.substring(index + 1, text.length);
    }

    console.log('pdreq', data);
    wx.request({
      url: this.data.context + '/pd/get-pd-infos',
      data: data,
      method: 'GET',
      success(res) {
        if (res.data.code == 200) {
          console.log('get-pd-infos:', res.data.data);
          var pdInfos = res.data.data;
          var scrollTop = 0;
          var nomore = res.data.data.length < that.data.pageSize ? true : false;
          if (that.data.pageNum == 1) {
            that.setData({
              scrollTop: 0,
              pdInfos: pdInfos,
              nomore: nomore,
            });
          } else {
            that.setData({
              scrollTop: that.data.scrollTop + 0,
              pdInfos: that.data.pdInfos.concat(pdInfos),
              nomore: nomore,
            });
          }
          wx.hideToast();
        } else {
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
        console.log('get-pd-infos:', res);
        wx.hideToast();
        that.data.nomore = true;
        wx.showToast({
          title: '查询产品超时，请重新查询',
          icon: 'none',
          duration: 2000,
          mask: true
        });
        // that.setData({
        //   scrollTop: 0,
        //   pdInfos: [],
        //   nomore: true,
        // });
      },
      complete(res) {
        that.data.searching = false;
        getApp().globalData.reSearchPd = false;
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
    this.data.scrollTop = e.detail.scrollTop;
  },

  onLoad: function(options) {
    console.log('onLoad', options);
    getApp().globalData.reSearchPd = true;
  },

  onShow: function(options) {
    // console.log('onLoad, pdClassId:', pdreq.get());
    if (getApp().globalData.reSearchPd) {
      if (this.data.searching == true) {
        return;
      }
      this.data.nomore = false;
      this.data.searching = true;
      this.data.pageNum = 1;
      this.search();
    }
    var key = getApp().globalData.pdpartext.key;
    this.setData({
      key: key ? key : '搜索产品',
    });
  },

  // onShareAppMessage: function() {

  // },
})