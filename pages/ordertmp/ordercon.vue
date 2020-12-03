<template>
<view class="page">
<view class="weui-cells__title">请完善清单信息</view>
  <scroll-view scroll-y="true" class="pd-content" @scroll="scroll" croll-with-animation="true" enable-back-to-top="true" :scroll-top="scrollTop">
  <view class="weui-cell" hover-class="weui-cell_active" @tap="selectPar">
        <view class="weui-cell__hd">
          <view class="weui-label">清单类型</view>
        </view>
        <view class="weui-cell__bd">
        <input type="text" class="weui-input" placeholder="请选清单类型【必填】" :value="orderType" disabled="true"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!orderType ? false : true) : true"></icon>
        </view>
      </view>

    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">联系人</view>
        </view>
        <view class="weui-cell__bd">
          <input maxlength="10" :value="contact" placeholder="请输入联系人姓名【必填】" @input="inputContact"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!contact ? false : true) : true"></icon>
        </view>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">联系电话</view>
        </view>
        <view class="weui-cell__bd">
          <input maxlength="15" :value="phone" type="number" placeholder="请输入联系人电话【必填】" @input="inputPhone"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!phone ? false : true) : true"></icon>
        </view>
      </view>
      <view class="weui-cell" id="bottom">
        <view class="weui-cell__hd">
          <view class="weui-label">公司</view>
        </view>
        <view class="weui-cell__bd">
          <input maxlength="50" :value="company" placeholder="请输入联系人公司【必填】" @input="inputCompany"></input>
        </view>
         <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!company ? false : true) : true"></icon>
        </view>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">备注</view>
        </view>
        <view class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="可以备注其他需求" :value="descr" maxlength="200" auto-height="true" @input="inputDescr"></textarea>
        </view>
      </view>
    </view>
  </scroll-view>

  <view class="weui-flex pd-bottom-tool">
    <view class="weui-flex__item">
      <view class="placeholder">
        <button class="weui-btn" type="primary" style="width:90%" @tap="save">提交</button>
      </view>
    </view>
  </view>

  <wux-popup-select :value="value" :options="options" @valueChange="onValueChange" :visible="visible" controlled :toolbar="toolbar" @visibleChange="onVisibleChange">
  </wux-popup-select>

</view>
</template>

<script>
var util = require("../../utils/util.js");
// import wuxPopupSelect from "../../dist/popup-select/index";
// import wuxCellGroup from "../../dist/cell-group/index";
// import wuxCell from "../../dist/cell/index";

export default {
  data() {
    return {
      context: getApp().globalData.context,
      ids: [],
      data: [],
      pageNum: 1,
      pageSize: 100,
      scrollTop: 0,
      searching: false,
      nomore: false,
      contact: '',
      phone: '',
      company: '',
      descr: '',
      orderType: '',
      haspd: false,
      checked: false,
      scrollIntoView: '',
      options: [],
      value: '',
      visible: false,
      toolbar: {
        title: '请选择'
      }
    };
  },

  // components: {
  //   wuxPopupSelect,
  //   wuxCellGroup,
  //   wuxCell
  // },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderRelInfo();
    var ids = options.ids;

    if (ids) {
      this.ids = ids.split(',');
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
    util.login();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    navOrderList: function () {
      uni.navigateTo({
        url: '/pages/order/order'
      });
    },
    inputContact: function (e) {
      this.setData({
        contact: e.detail.value
      });
    },
    inputPhone: function (e) {
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
    scroll: function (e) {
      // console.log('scroll', e);
      this.scrollTop = e.detail.scrollTop;
    },
    validate: function () {
      this.checked = true;

      if (!this.phone || !this.contact || !this.orderType || !this.company) {
        this.setData({
          scrollTop: 999999
        });
        return false;
      }

      return true;
    },
    save: function (e) {
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
        this.setData(this);
        return;
      }

      var that = this;
      uni.showToast({
        // title: '数据加载中',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      var data = {
        type: that.orderType,
        contact: that.contact,
        phone: that.phone,
        company: that.company,
        descr: that.descr,
        tmpIds: that.ids
      };
      uni.request({
        url: that.context + '/order/save-order',
        header: {
          'x-access-token': uni.getStorageSync(getApp().globalData.tokenKey)
        },
        data: data,
        method: 'POST',

        success(res) {
          if (res.data.code == 200) {
            that.setData({
              data: [],
              scrollTop: 0,
              nomore: true,
              haspd: false
            });
            uni.hideToast();
            getApp().flushOrder = true;
            uni.showToast({
              title: '清单提交成功',
              icon: 'success',
              duration: 1500,
              mask: true
            });
            setTimeout(function () {
              uni.navigateBack({
                delta: 1
              });
            }, 1500);
          } else {
            uni.hideToast();
            uni.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500
            });
          }
        },

        fail(res) {},

        complete(res) {}

      }); // var that = this;
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
    getOrderRelInfo: function (e) {
      uni.showToast({
        // title: '数据加载中',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      var that = this;
      uni.request({
        url: that.context + '/order/get-order-rel-info',
        header: {
          'x-access-token': uni.getStorageSync(getApp().globalData.tokenKey)
        },
        data: {},
        method: 'GET',

        success(res) {
          if (res.data.code == 200) {
            that.setData({
              contact: res.data.data.address.contact,
              phone: res.data.data.address.phone,
              company: res.data.data.address.company,
              options: res.data.data.orderType
            });
          } else {}
        },

        fail(res) {},

        complete(res) {
          uni.hideToast();
        }

      });
    },

    onValueChange(e) {
      var data = {};
      data.orderType = e.detail.value;
      data.visible = false;
      this.setData(data);
      console.log(`onValueChange `, e.detail);
    },

    selectPar(e) {
      this.setData({
        options: this.options,
        value: this.orderType,
        visible: true
      });
    },

    onVisibleChange(e) {
      // console.log('visible:',e);
      this.setData({
        visible: e.detail.visible
      });
    }

  }
};
</script>
<style>
@import "./ordercon.css";
</style>