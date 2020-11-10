var fileUtil = require("../../utils/fileUtil2.js")

Page({
  data: {
    context: getApp().globalData.context,
    key: '',
    // 所有一级：【】 {id: "1", name: "瓷介电容器", icon: "", children: Array(3), opera: "wx"}  // children: 该二级
    pdClasses: [],
    //  所有二级：【】 0: {label: "多层瓷介电容器", value: "4", opera: "wx", children: Array(9)}  // children: 该质量等级
    cas:[],
    // 应用指南文件 【】{label: "1、瓷介电容器简介", value: "1、瓷介电容器简介", opera: "file", fileUrl: "/files/manual/1、瓷介电容器简介.pdf"}
    manual:[],
    // 图片
    banner: [],
    //一级选项
    options: [],
    value: [],
    visible: false,
    clzId: '',
    clzName: '',
    search: false,
    chooseTitle:'请选择',
  },
//应用指南
  openManual:function(e){
    console.log(e);
    this.data.clzName = e.currentTarget.dataset.title;
    this.setData({
      options: this.data.manual,
    });
    this.casOpen();
  },

  pdClassTap: function(e) {
    console.log(e);
    var opera = e.currentTarget.dataset.opera;
    if (opera == "file") {
      var url = this.data.context + e.currentTarget.dataset.url;
      var file = e.currentTarget.dataset.url.replace(/\//g, "_");
      fileUtil.open(url, file);

    } else {
      // opera: wx
      for (var i = 0; i < this.data.cas.length; i++) {
        if (this.data.cas[i].value == e.currentTarget.dataset.id) {
          this.setData({
            options: this.data.cas[i].children
          });
        }
      };
      this.data.clzId = e.currentTarget.dataset.id;
      this.data.clzName = e.currentTarget.dataset.name;
      try{
        if (e.currentTarget.dataset.name && e.currentTarget.dataset.name.substr(0,2) == '微波'){
          this.data.chooseTitle = '请选择';
        }else{
          this.data.chooseTitle = '质量等级';
        }
      }catch(e){

      }
      this.casOpen();
    }
  },
// 获取产品分类（列表）
  listPdClass: function() {
    wx.showToast({
      // title: '数据加载中',
      icon: 'loading',
      duration: 10000,
      mask: true
    });

    var that = this;
    wx.request({
      url: this.data.context + '/pd/list-pd-class',
      data: {},
      method: 'GET',
      success(res) {
        console.log('get-pd-class:', res.data.data);
        that.setData({
          pdClasses: res.data.data.lev2,
          cas: res.data.data.cas,
          manual: res.data.data.manual,
        });
      },
      fail(res) {
        console.log('list-pd-class:', res);
      },
      complete(res) {
        wx.hideToast();
      }
    })
  },
// 图片列表（头）
  listBanner: function() {
    var that = this;
    wx.request({
      url: this.data.context + '/pub/list-banner',
      data: {},
      method: 'GET',
      success(res) {
        console.log('list-banner:', res.data.data);
        that.setData({
          banner: res.data.data
        });
      },
      fail(res) {
        console.log('list-banner:', res);
      },
      complete(res) {}
    })
  },

  preImg: function(e) {
    var current = this.data.context + e.currentTarget.dataset.url;
    var urls = [];
    for (let u in this.data.banner) {
      urls[u] = this.data.context + this.data.banner[u].url;
    }
    wx.previewImage({
      current: current,
      urls: urls
    })
  },

  onLoad: function() {
    this.listBanner();
    this.listPdClass();
  },

  onShow: function() {
    // this.setData({
    //   key: pdreq.get('key') ? pdreq.get('key') : '搜索产品',
    // });
  },

  casClose: function() {
    this.setData({
      visible: false
    });
    if (this.data.search) {
      getApp().globalData.reSearchPd = true;
      this.data.search = false;
      // wx.switchTab({
      //   url: '/pages/pdlist/pdlist',
      // })
      wx.navigateTo({
        url: '/pages/search/search'
      })
    }
  },

  casOpen: function() {
    this.setData({
      visible: true,
      clzName: this.data.clzName,
      chooseTitle: this.data.chooseTitle,
      value: ''
    });
  },
// 点击二级列表
  casChange(e) {
    console.log(e);
    this.setData({
      value: e.detail.value
    });
    var child = e.detail.options[e.detail.options.length - 1].children;
    if (child && child.length > 0) {
      return;
    }
    //转向search 
    var option = e.detail.options[0];
    if (option && option.opera && option.opera == 'file') {
      var url = this.data.context + option.fileUrl;
      var file = option.fileUrl.replace(/\//g, "_");
      fileUtil.open(url, file);
    }else{
      // wx
      this.data.search = true;
      getApp().globalData.pdpar = {};
      getApp().globalData.pdpartext = {};
      var value = [];
      value[0] = this.data.clzId;
      value = value.concat(e.detail.value);
      getApp().globalData.pdpar.clzqa = value;
      getApp().globalData.pdpartext.clzqa = this.data.clzName + "/" + e.detail.options.map((n) => n.label).join('/');
    }
  },

  onShareAppMessage: function () {

  }

});