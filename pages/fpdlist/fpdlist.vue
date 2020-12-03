<template>
<view class="page">
  <!-- <view class="weui-search-bar">
    <view class="weui-search-bar__form">
      <navigator url="/pages/fpdsearch/fpdsearch">
        <view class="weui-search-bar__box">
          <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
          <input type="text" class="weui-search-bar__input" placeholder="{{pd}}" disabled="true" />
        </view>
      </navigator>
    </view>
  </view> -->

  <!-- <view class="weui-cells__title">产品列表</view> -->
  <!-- <view class="weui-cells weui-cells_after-title">
  <block wx:for="{{pdInfos}}" wx:for-item="pd" wx:key="pd">
    <navigator url="/pages/pdetail/pdetail" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <view class="weui-cell__hd">
          <image src="{{pd.icon}}" class="pd-icon"></image>
        </view>
        <view class="weui-cell__bd">{{pd.pmName}}-{{pd.pmCode}}-{{pd.quality}}</view>
        <view class="weui-cell__ft weui-cell__ft_in-access"></view>
    </navigator>
  </block>
</view> -->
<view class="pd-split"></view>
  <view :class="'weui-grids ' + (pdInfos.length>1?'on':'off')">
    <view class="weui-grid">
      <view class="weui-grid__label">参数类型</view>
    </view>
    <view class="weui-grid">
      <view class="weui-grid__label">国外参数</view>
    </view>
    <view class="weui-grid">
      <view class="weui-grid__label">宏科参数</view>
    </view>
    <block v-for="(p, idx) in pmap" :key="idx">
      <view class="weui-grid">
        <view class="weui-grid__label">{{p.type}}</view>
      </view>
      <view class="weui-grid">
        <view class="weui-grid__label">{{p.fcode}}</view>
      </view>
      <view class="weui-grid">
        <view class="weui-grid__label">{{p.code}}</view>
      </view>
    </block>
  </view>
<view class="pd-split"></view>
  <scroll-view scroll-y="true" class="pd-content" @scrolltolower="loadMore" @scroll="scroll" croll-with-animation="true" enable-back-to-top="true" :scroll-top="scrollTop">
    <view class="weui-panel weui-panel_access">
      <!-- <view class="weui-panel__hd">产品列表</view> -->
      <view class="weui-panel__bd">
        <block v-for="(pd, index) in pdInfos" :key="index">
          <navigator :url="'/pages/pdetail/pdetail?piId=' + pd.id" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <!-- <view class="weui-media-box weui-media-box_text">
              <view class="weui-media-box__title weui-media-box__title_in-text">{{pd.title}}</view>
              <view class="weui-media-box__desc"><view class="pd-cell-label">{{pd.desc}}</view></view>
            </view> -->
            <view class="weui-cell__hd">
              <image :src="context + '/' + pd.pcIcon" class="pd-icon"></image>
            </view>
            <view class="weui-cell__bd"><view class="pd-cell-label">{{pd.desc}}</view></view>
          </navigator>
        </block>
        <view class="weui-loadmore" :hidden="nomore">
            <view class="weui-loading"></view>
            <view class="weui-loadmore__tips">正在加载...</view>
        </view>
        <view class="weui-loadmore weui-loadmore_line" :hidden="!nomore">
          <view class="weui-loadmore__tips weui-loadmore__tips_in-line">已无更多数据</view>
        </view>
      </view>
    </view>
  </scroll-view>
</view>
</template>

<script>
var fpdreq = require("../../utils/fpdreq.js");

export default {
  data() {
    return {
      context: getApp().globalData.context,
      pdInfos: [],
      pageNum: 1,
      pageSize: 20,
      scrollTop: 0,
      pmap: [],
      searching: false,
      nomore: false,
      model: '',
      code: ''
    };
  },

  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.model = options.model;
    this.code = options.code;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.nomore = true;
    this.searching = true;
    this.pageNum = 1;
    this.search();
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
  onReachBottom: function (e) {
    console.log('onReachBottom', e); // this.data.pageNum += 1;
    // this.search();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    search: function () {
      uni.showToast({
        // title: '数据加载中',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      var that = this;
      var data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        model: this.model,
        code: this.code
      };
      uni.request({
        url: this.context + '/fpd/get-pd-infos',
        data: data,
        method: 'GET',

        success(res) {
          if (res.data.code == 200) {
            console.log('get-fpd-infos:', res.data.data);
            var pdInfos = res.data.data.pdInfos;
            var pmap = res.data.data.pmaps;
            var scrollTop = 0;
            var nomore = pdInfos.length < that.pageSize ? true : false;

            if (that.pageNum == 1) {
              that.setData({
                pdInfos: pdInfos,
                pmap: pmap,
                scrollTop: 0,
                nomore: nomore
              });
            } else {
              that.setData({
                pdInfos: that.pdInfos.concat(pdInfos),
                pmap: pmap,
                scrollTop: that.scrollTop + 0,
                nomore: nomore
              });
              uni.hideToast();
            }
          } else {
            uni.hideToast();
            that.nomore = true;
            uni.showToast({
              title: '查询产品超时，请重新查询',
              icon: 'none',
              duration: 2000,
              mask: true
            });
          }
        },

        fail(res) {
          uni.hideToast();
          that.nomore = true;
          uni.showToast({
            title: '查询产品超时，请重新查询',
            icon: 'none',
            duration: 2000,
            mask: true
          });
        },

        complete(res) {
          that.searching = false;
        }

      });
    },
    loadMore: function () {
      if (this.searching == true || this.nomore == true) {
        return;
      }

      console.log('loadMore', this.pageNum + 1);
      this.searching = true;
      this.pageNum += 1;
      this.search();
    },
    scroll: function (e) {
      // console.log('scroll', e);
      this.scrollTop = e.detail.scrollTop;
    },

    onPageScroll(e) {// this.data.scrollTop = e.scrollTop;
    }

  }
};
</script>
<style>
@import "./fpdlist.css";
</style>