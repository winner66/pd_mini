<template>
<view class="page">
  <scroll-view class="pd-content" scroll-y="true" enable-back-to-top="true">
    <view class="container">
      <view class="userinfo">
        <button v-if="!hasUserInfo && canIUse" open-type="getUserInfo" @getuserinfo="getUserInfo"> 获取我的昵称 </button>
        <block v-else>
          <image @tap="bindViewTap" class="userinfo-avatar" :src="userInfo.avatarUrl" mode="cover"></image>
          <text class="userinfo-nickname">你好 : {{userInfo.nickName}}</text>
        </block>
      </view>
    </view>
    <view class="pd-split"></view>
    <view class="weui-cells weui-cells_after-title">
      <!-- <navigator url="/pages/pdetail/pdetail" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
    <view class="weui-cell__bd">我的地址</view>
    <view class="weui-cell__ft weui-cell__ft_in-access"></view>
  </navigator> -->
      <!-- <navigator url="/pages/pdetail/pdetail" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
    <view class="weui-cell__bd">产品推荐</view>
    <view class="weui-cell__ft weui-cell__ft_in-access"></view>
  </navigator> -->
      <!-- <navigator url="/pages/mine/about/about"  class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <view class="weui-cell__bd">关于宏科</view>
          <view class="weui-cell__ft weui-cell__ft_in-access"></view>
      </navigator> -->

      <view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="openPdf" :data-url="pdf.intro">
        <view class="weui-cell__bd">公司介绍</view>
        <view class="weui-cell__ft weui-cell__ft_in-access"></view>
      </view>

      <navigator url="/pages/mine/contact/contact" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <view class="weui-cell__bd">联系我们</view>
        <view class="weui-cell__ft weui-cell__ft_in-access"></view>
      </navigator>

      <!-- <view class="weui-cell weui-cell_access" hover-class="weui-cell_active" bindtap="openPdf" data-url="{{pdf.contact}}">
        <view class="weui-cell__bd">联系我们</view>
        <view class="weui-cell__ft weui-cell__ft_in-access"></view>
      </view> -->
      <view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="clear">
        <view class="weui-cell__bd">清除缓存</view>
        <view class="weui-cell__ft weui-cell__ft_in-access"></view>
      </view>
      <view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="testTap">
        <view class="weui-cell__bd">测试入口</view>
        <view class="weui-cell__ft weui-cell__ft_in-access"></view>
      </view>
    </view>
  </scroll-view>
</view>
</template>

<script>
var fileUtil = require("../../utils/fileUtil2.js");
var util = require("../../utils/util.js"); //index.js
//获取应用实例
//index.js
//获取应用实例
const app = getApp();

export default {
  data() {
    return {
      context: getApp().globalData.context,
      pdf: '',
      userInfo: {},
      hasUserInfo: false,
      canIUse: uni.canIUse('button.open-type.getUserInfo')
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    this.init();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.globalData.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      uni.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  methods: {
    init: function () {
      uni.showToast({
        // title: '数据加载中',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      var that = this;
      uni.request({
        url: this.context + '/pub/get-pdf',
        data: {},
        method: 'GET',

        success(res) {
          if (res.data.code == 200) {
            console.log('get-pdf:', res.data.data);
            that.setData({
              pdf: res.data.data
            });
          }
        },

        fail(res) {
          console.log('get-pdf:', res);
        },

        complete(res) {
          uni.hideToast();
        }

      });
    },
    clear: function () {
      uni.removeStorageSync(getApp().globalData.tokenKey);
      util.login();
      fileUtil.clear();
      uni.showToast({
        title: '清除缓存成功',
        icon: 'none',
        duration: 1500,
        mask: true
      });
    },
    testTap: function () {
      uni.navigateTo({
        url: '/pages/fpdTest/fpdTest'
      });
    },
    openPdf: function (e) {
      var url = this.context + e.currentTarget.dataset.url;
      var file = e.currentTarget.dataset.url.replace(/\//g, "_");
      fileUtil.open(url, file);
    },
    getUserInfo: function (e) {
      console.log(e);
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
    }
  }
};
</script>
<style>
@import "./mine.css";
</style>