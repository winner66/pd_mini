<template>
<view class="page">
<!-- <view class="pd-split"></view> -->
  <scroll-view class="pd-content" scroll-y="true" enable-back-to-top="true">
    <view class="weui-cells weui-cells_after-title">

      <view class="weui-cell" hover-class="weui-cell_active" @tap="selectPar">
        <view class="weui-cell__hd">
          <view class="weui-label">国外厂家型号</view>
        </view>
        <view class="weui-cell__bd">
        <input type="text" class="weui-input" placeholder="请选择厂家型号" :value="model" disabled="true"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!model ? false : true) : true"></icon>
        </view>
      </view>

      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">国外产品编码</view>
        </view>
        <view class="weui-cell__bd">
          <input :value="code" class="weui-input" @input="keyInput" placeholder="请输入产品编码"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!code ? false : true) : true"></icon>
        </view>
      </view>
    </view>

    <view class="weui-flex" style="margin-top:20px">
      <view class="weui-flex__item">
        <view class="placeholder">
          <button class="weui-btn" type="primary" @tap="clear" style="width:90%">重置</button>
        </view>
      </view>

      <view class="weui-flex__item">
        <view class="placeholder">
          <!-- <navigator url="/pages/pdlist/pdlist?search=true" open-type="switchTab"> -->
          <button class="weui-btn" type="primary" @tap="search" style="width:90%">确定</button>
          <!-- </navigator> -->
        </view>
      </view>
    </view>
  </scroll-view>
  <wux-popup-select :value="value" :options="options" @valueChange="onValueChange" :visible="visible" controlled :toolbar="toolbar" @visibleChange="onVisibleChange">
  </wux-popup-select>
</view>
</template>

<script>
var fpdreq = require("../../utils/fpdreq.js");
// import wuxPopupSelect from "../../dist/popup-select/index";
// import wuxCellGroup from "../../dist/cell-group/index";
// import wuxCell from "../../dist/cell/index";

export default {
  data() {
    return {
      context: getApp().globalData.context,
      fpr: {},
      toolbar: {
        title: '请选择'
      },
      visible: false,
      options: '',
      value: '',
      checked: false,
      model: '',
      code: ''
    };
  },

  // components: {
  //   wuxPopupSelect,
  //   wuxCellGroup,
  //   wuxCell
  // },
  props: {},
  onLaunch: function () {// console.log('App Launch')
  },
  onLoad: function (options) {
    this.getFpdList();
  },
  onShow: function () {},
  onHide: function () {// console.log('App Hide');
  },
  methods: {
    keyInput: function (e) {
      var v = e.detail.value;
      this.setData({
        code: v
      });
    },

    onValueChange(e) {
      var data = {}; // console.log(e.detail);
      // model ：  AMC E系列

      data.model = e.detail.value;
      data.visible = false;
      console.log(data);
      this.setData(data);
    },

    selectPar(e) {
      this.setData({
        options: this.fpr.model,
        value: this.model,
        visible: true
      });
    },

    onVisibleChange(e) {
      this.setData({
        visible: e.detail.visible
      });
    },

    getFpdList: function () {
      var that = this;
      uni.showToast({
        // title: '数据加载中',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      uni.request({
        url: this.context + '/fpd/get-fpd-models',
        data: {},
        method: 'GET',

        success(res) {
          console.log('get-fpd-models:', res.data.data);
          that.fpr.model = res.data.data;
        },

        fail(res) {
          console.log('get-fpd-models:', res);
        },

        complete(res) {
          uni.hideToast();
        }

      });
    },
    validate: function () {
      this.checked = true;

      if (!this.model || !this.code) {
        return false;
      }

      return true;
    },
    search: function (e) {
      var result = this.validate();

      if (!result) {
        this.setData(this);
        return;
      }

      getApp().globalData.reSearchFpd = true;
      uni.navigateTo({
        url: '/pages/fpdlist/fpdlist?model=' + this.model + "&code=" + this.code
      });
    },
    clear: function (e) {
      this.setData({
        model: '',
        code: ''
      });
    }
  }
};
</script>
<style>
@import "./fpdsearch.css";
</style>