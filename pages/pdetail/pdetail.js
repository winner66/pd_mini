var util = require("../../utils/util.js")

// pages/pdetail/pdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    context: getApp().globalData.context,
    pd: {},
    tempFilePath: '',
    type: '',
    toolbar: {
      title: '请选择'
    },
    tolerance: '',
    outlet: '',
    capacity: '',
    toleranceText: '',
    outletText: '',
    capacityText: '',
    wireMa:'',
    wireMaText: '',
    wireSize:'',
    wireSizeText:'',
    pin:'',
    pinText:'',
    visible: false,
    options: '',
    value: '',
    checked: false,
    rule:'',
    num:'',
    descr:'',
    tab:'rule',
    objImgHeight:'',
  },
  
  setHiehgt:function(){
    var that = this;
    var obj = wx.createSelectorQuery();
    obj.selectAll('._order_rule').boundingClientRect();
    obj.exec(function (rect) {
      // console.log(rect[0]);
      // console.log(rect[0][0].height);
      // console.log(rect[0][0].width);
      that.setData({
        objImgHeight: rect[0][0].height + "px",
      });
    });
  },
  
  changeTab:function(e){
    if (e.detail.key == '0'){
      // 规则
      this.data.tab = 'rule';
    }else{
      // 实物图
      this.setHiehgt();
      this.data.tab = 'obj';
    }
    this.setData({
      tab:this.data.tab,
    });
  },
  
  casClose: function () {
    this.setData({
      casvisible: false
    });
  },

  casOpen: function (e) {
    var handle = e.currentTarget.dataset.handle;
    if (!handle) {
      return;
    }

    this.setData({
      casoptions: this.data.pd.pdInfo.capacities,
      casvalue:this.data.capacity,
      casvisible: true,
    });
  },

  casChange(e) {
    this.setData({
      casvalue: e.detail.value,
    });
    var child = e.detail.options[e.detail.options.length - 1].children;
    if (child && child.length > 0) {
      return;
    }
    this.setData({
      capacity: e.detail.value[1],
      capacityText: e.detail.value[1] + '[' + e.detail.value[0] + ']',
    })
    this.setRule();
  },

  inputNum: function (e) {
    // this.data.num = e.detail.value;
    this.setData({
      num: e.detail.value
    });
  },

  inputDesc: function (e) {
    this.data.descr = e.detail.value;
  },

  validate: function () {
    this.data.checked = true;
    if (this.data.pd.selCapacity && !this.data.capacity) {
      return false;
    }
    if (this.data.pd.selTolerance && !this.data.tolerance) {
      return false;
    }
    if (this.data.pd.selOutlet && !this.data.outlet) {
      return false;
    }
    if (this.data.pd.pdInfo.wireMa && !this.data.wireMa) {
      return false;
    }
    if (this.data.pd.pdInfo.wireSize && !this.data.wireSize) {
      return false;
    }
    if (this.data.pd.pdInfo.pin && !this.data.pin) {
      return false;
    }
    if (!this.data.num) {
      return false;
    }
    return true;
  },

  commit: function (e) {
    var result = this.validate();
    if (!result) {
      this.setData(this.data);
      wx.showToast({
        title: '请完善必填项！',
        icon: 'none',
        duration: 1000,
      });
      return;
    }

    wx.showToast({
      title: '请稍等',
      icon: 'loading',
      duration: 10000,
      mask: true
    });

    var rule = this.data.rule.replace(/\?/g, "");

    var that = this;
    var data = {
      pdInfoId: this.data.pd.id,
      num: this.data.num,
      descr: this.data.descr,
      flag: rule,
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
            success: function () {
              setTimeout(function () {
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
      fail(res) {
        wx.hideToast();
        wx.showToast({
          title: '加入清单出错,请重试',
          icon: 'none',
          duration: 1500,
        });
       },
      complete(res) { }
    })
  },

  order: function(e) {
    wx.navigateTo({
      url: '/pages/pdrule/pdrule?piId=' + this.data.pd.id,
    })
  },

  callPhone: function(e) {
    // console.log(e, e);
    var phone = e.currentTarget.dataset.phone;
    if (!phone) {
      return;
    }
    var p = phone.split("、");
    if (p.length > 1) {
      wx.showActionSheet({
        itemList: p,
        success: function(res) {
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

  prePdImg: function(e) {
    var current = this.data.context + e.currentTarget.dataset.url;
    var urls = [];
    for (let u in this.data.pd.pdModel.objectUrls) {
      urls[u] = this.data.context + this.data.pd.pdModel.objectUrls[u];
    }
    wx.previewImage({
      current: current,
      urls: urls
    })
  },

  getPdDetail: function(piId) {
    wx.showToast({
      // title: '数据加载中',
      icon: 'loading',
      duration: 10000,
      mask: true
    });

    var pdpar = getApp().globalData.pdpar;
    var data = {};
    data.id = piId;
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
    if (text && text.capacity) {
      var index = text.capacity.lastIndexOf("\/");
      data['capacityCode'] = text.capacity.substring(index + 1, text.length);
    }

    var that = this;
    wx.request({
      url: this.data.context + '/pd/get-pd-detail',
      data: data,
      method: 'GET',
      success(res) {
        if (res.data.code == 200) {
          console.log('get-pd-detail:', res.data.data);
          that.setData({
            pd: res.data.data,
            rule:res.data.data.rule,
          });
          that.setDefault(that,res.data.data);
          that.setRule();
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

  setDefault:function(that, data){
    try{
      if (data.pdInfo.capacities.length == 1 && data.pdInfo.capacities[0].children.length == 1){
        that.data.capacity = data.pdInfo.capacities[0].children[0].value;
        that.data.capacityText = data.pdInfo.capacities[0].children[0].label + '[' + data.pdInfo.capacities[0].label + ']';
      }
      if (data.pdInfo.tolerances.length == 1){
        this.data.tolerance = data.pdInfo.tolerances[0].value;
        this.data.toleranceText = data.pdInfo.tolerances[0].title;
      }
      if (data.pdInfo.outlets.length == 1){
        this.data.outlet = data.pdInfo.outlets[0].value;
        this.data.outletText = data.pdInfo.outlets[0].title;
      }
      if (data.pdInfo.wireMas.length == 1) {
        this.data.wireMa = data.pdInfo.wireMas[0].value;
        this.data.wireMaText = data.pdInfo.wireMas[0].title;
      }
      if (data.pdInfo.wireSizes.length == 1) {
        this.data.wireSize = data.pdInfo.wireSizes[0].value;
        this.data.wireSizeText = data.pdInfo.wireSizes[0].title;
      }
      if (data.pdInfo.pins.length == 1) {
        this.data.pin = data.pdInfo.pins[0].value;
        this.data.pinText = data.pdInfo.pins[0].title;
      }
      that.setData({
        capacity: that.data.capacity,
        capacityText: that.data.capacityText,
        tolerance: this.data.tolerance,
        toleranceText: this.data.toleranceText,
        outlet: this.data.outlet,
        outletText:this.data.outletText,
        wireMa: this.data.wireMa,
        wireMaText: this.data.wireMaText,
        wireSize: this.data.wireSize,
        wireSizeText: this.data.wireSizeText,
        pin: this.data.pin,
        pinText: this.data.pinText,
      });
    }catch(e){
      console.log('setDefault', e);
    }
  },

  setRule: function () {
    var rule = this.data.pd.rule;
    rule = rule.replace('电容', !this.data.capacity ? '[?]' : this.data.capacity);
    rule = rule.replace('精度/容量偏差', !this.data.tolerance ? '[?]' : this.data.tolerance);
    rule = rule.replace('引出端形式', !this.data.outlet ? '[?]' : this.data.outlet);
    rule = rule.replace('引线材质', !this.data.wireMa ? '[?]' : this.data.wireMa);
    rule = rule.replace('引线长短', !this.data.wireSize ? '[?]' : this.data.wireSize);
    rule = rule.replace('引脚形状', !this.data.pin ? '[?]' : this.data.pin);
    this.setData({
      rule: rule,
    });
  },

  onValueChange(e) {
    var data = {};
    data[this.data.type] = e.detail.value;
    data[this.data.type + 'Text'] = e.detail.displayValue;
    data.visible = false;
    this.setData(data);
    this.setRule();
    // console.log(`onValueChange `, e.detail)
  },

  selectPar(e) {
    // console.log("selectPar start", e);
    var handle = e.currentTarget.dataset.handle;
    if (!handle){
      return;
    }
    var type = e.currentTarget.dataset.type;
    var optiontype = e.currentTarget.dataset.optiontype;
    this.setData({
      options: this.data.pd.pdInfo[optiontype],
      value: this.data[type],
      type: type,
      visible: true,
    })
    // console.log("selectPar end", e);
  },

  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log('onLoad, pdClassId:', pdreq.get());
    this.getPdDetail(options.piId);   
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