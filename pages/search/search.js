Page({
  data: {
    context: getApp().globalData.context,
    //已选择的查询条件text
    text: [],
    //查询条件数据
    options: [],
    //已选择的查询条件value
    value: [],
    //查询框title
    title: '',
    //当前选择的参数
    filterType: '',
  },

  onShow: function () {
    this.init();
  },

  keyInput: function(e) {
    var v = e.detail.value;
    this.data.text.key = v;
    getApp().globalData.pdpartext.key = v;
    getApp().globalData.pdpar.key = v;
  },

  init: function() {
    this.setData({
      text: getApp().globalData.pdpartext,
    })
  },

  search: function(e) {
    console.log("pdpar",getApp().globalData.pdpar);
    console.log("pdpartext",getApp().globalData.pdpartext);
    getApp().globalData.reSearchPd = true;
    wx.switchTab({
      url: '/pages/pdlist/pdlist',
    })
  },

  clear: function(e) {
    var pdpar = getApp().globalData.pdpar;
    for (let i in pdpar) {
      pdpar[i] = '';
    }
    var pdpartext = getApp().globalData.pdpartext;
    for (let i in pdpartext) {
      pdpartext[i] = '';
    }
    this.init();
  },

  buildReq: function() {
    var data = {};
    var pdpar = getApp().globalData.pdpar;
    for (let key in pdpar) {
      if ('key' == key){
        if (pdpar[key] && pdpar[key] != ''){
          data[key] = pdpar[key];
        }
      }else if (pdpar[key] && pdpar[key] != '') {
        data[key] = pdpar[key][pdpar[key].length - 1];
      }
    }
    console.log('data',data);
    return data;
  },

  casClose: function() {
    this.setData({
      visible: false
    });
  },

  casOpen: function(e) {
    wx.showToast({
      // title: '请稍等',
      icon: 'loading',
      duration: 10000,
      mask: true
    });
    console.log(e.currentTarget.dataset);
    var type = e.currentTarget.dataset.type;
    this.data.filterType = type;
    
    var data = this.buildReq();
    data.filterType = type;
    delete data[type];;
    var that = this;
    console.log(data);
    wx.request({
      url: this.data.context + '/pd/list-params',
      data: data,
      method: 'GET',
      success(res) {
        console.log('get-pd-class:', res.data.data);
        that.setData({
          options: res.data.data,
          value: getApp().globalData.pdpar[that.data.filterType],
          title: e.currentTarget.dataset.title,
          visible: true,
        });
      },
      fail(res) {
        wx.hideToast();
        wx.showToast({
          title: '获取参数失败，请重新打开选择',
          icon: 'none',
          duration: 1500,
          mask: true
        });
      },
      complete(res) {
        wx.hideToast();
      }
    })
  },

  casChange(e) {
    this.setData({
      value: e.detail.value
    });
    var child = e.detail.options[e.detail.options.length - 1].children;
    if (child && child.length > 0) {
      return;
    }

    // console.log('casChange', e.detail)
    getApp().globalData.pdpar[this.data.filterType] = e.detail.value;
    console.log('pdpar',getApp().globalData.pdpar);
    getApp().globalData.pdpartext[this.data.filterType] = e.detail.options.map((n) => n.label).join('/');
    console.log('casChange',getApp().globalData.pdpartext);
    this.setData({
      text: getApp().globalData.pdpartext
    });

  },

  casClear(e){
    getApp().globalData.pdpar[this.data.filterType] = '';
    getApp().globalData.pdpartext[this.data.filterType] = '';
    this.setData({
      visible: false,
      text: getApp().globalData.pdpartext
    });
  }
});