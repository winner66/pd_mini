// pages/sku/sku.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    context: getApp().globalData.context,
    rule: {},
    piId: '',
    num: '',
    descr: '',
    capacity: '',
    tolerance: '',
    outlet: '',
    type: '',
    toolbar: {
      title: '请选择'
    },
    visible:false,
    options:'',
    value:'',
    checked:false,
  },

  inputNum: function(e) {
    // this.data.num = e.detail.value;
    this.setData({
      num: e.detail.value
    });
  },

  inputDesc: function (e) {
    this.data.descr = e.detail.value;
  },

  validate:function(){
    this.data.checked = true;
    if (this.data.rule.showCapacity && !this.data.capacity){
      return false;
    }
    if (this.data.rule.showTolerance && !this.data.tolerance) {
      return false;
    }
    if (this.data.rule.showOutlet && !this.data.outlet) {
      return false;
    }
    if (!this.data.num){
      return false;
    }
    return true;
  },

  addOrder: function(e) {
    var result = this.validate();    
    if (!result){
      this.setData(this.data);
      return;
    }

    wx.showToast({
      title: '请稍等',
      icon: 'loading',
      duration: 10000,
      mask: true
    });

    var that = this;
    var data = {
      pdInfoId: this.data.piId,
      num: this.data.num,
      descr:this.data.descr,
      flag: this.data.rule.pd,
    };

    wx.request({
      url: this.data.context + '/order/save-tmp',
      header: {
        'x-access-token': wx.getStorageSync(getApp().globalData.tokenKey)
      },
      data: data,
      method: 'POST',
      success(res) {
        if (res.data.code == 200) {
          getApp().globalData.flushOrder = true;
          wx.hideToast();
          wx.showToast({
            title: '加入清单成功',
            icon: 'success',
            duration: 1500,
            success: function() {
              setTimeout(function() {
                wx.switchTab({
                  url: '/pages/pdlist/pdlist',
                })
              }, 1500);
            }
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
      fail(res) {},
      complete(res) {}
    })
  },

  getPdRule: function(piId) {
    wx.showToast({
      // title: '数据加载中',
      icon: 'loading',
      duration: 10000,
      mask: true
    });

    var that = this;
    wx.request({
      url: this.data.context + '/pd/get-pd-rule',
      data: {
        piId: piId
      },
      method: 'GET',
      success(res) {
        if (res.data.code == 200) {
          console.log('get-pd-rule:', res.data.data);
          var data = that.data;
          data.rule = res.data.data;
          that.setPd();
          that.setData(data);
        }
      },
      fail(res) {
        console.log('get-pd-detail:', res);
      },
      complete(res) {
        wx.hideToast();
      }
    })
  },

  copyRule: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '已复制订货标识'
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('onLoad', options);
    var text = getApp().globalData.pdpartext;
    var value = getApp().globalData.pdpar;

    if (text.capacity) {
      var index = text.capacity.lastIndexOf("\/");
      this.data.capacity = text.capacity.substring(index + 1, text.length);
    }
    if (text.tolerance) {
      this.data.tolerance = value.tolerance[0];
    }
    if (text.outlet) {
      this.data.outlet = value.outlet[0];
    }
    this.data.piId = options.piId;
    console.log(this.data);
    this.getPdRule(options.piId);
  },

  onValueChange(e) {
    var data = {};
    data[this.data.type] = e.detail.value;
    data.visible = false;
    this.setData(data);
    this.setPd();
    // console.log(`onValueChange `, e.detail)
  },

  selectPar(e) {
    var type = e.currentTarget.dataset.type;
    var optiontype = e.currentTarget.dataset.optiontype;
    this.setData({
      options: this.data.rule[optiontype],
      value:this.data[type],
      type: type,
      visible: true,
    })
  },

  onVisibleChange(e) {
    this.setData({ visible: e.detail.visible })
  },

  setPd: function() {
    var rule = this.data.rule;
    rule.pd = this.data.rule.pdTemplate;
    rule.pd = this.data.rule.pd.replace('电容', !this.data.capacity ? '[?]' : this.data.capacity);
    rule.pd = this.data.rule.pd.replace('精度/容量偏差', !this.data.tolerance ? '[?]' : this.data.tolerance);
    rule.pd = this.data.rule.pd.replace('引出端形式', !this.data.outlet ? '[?]' : this.data.outlet);
    this.setData({
      rule: rule,
    });
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