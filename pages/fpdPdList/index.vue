<template>
<!--pages/fpdPdList/index.wxml-->
<view class="page">
  <view class="weui-search-bar">
    <view class="weui-search-bar__form">
      <navigator url="/pages/fpdTest/fpdTest">
        <view class="weui-search-bar__box">
          <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
          <input type="text" class="weui-search-bar__input" :placeholder="key" disabled="true"></input>
        </view>
      </navigator>
    </view>
  </view>

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


  <scroll-view scroll-y="true" class="pd-content" @scrolltolower="loadMore" @scroll="scroll" croll-with-animation="true" enable-back-to-top="true" :scroll-top="scrollTop">
  <!-- <view class="weui-cells weui-cells_after-title"> -->
    <view class="weui-panel weui-panel_access">
      <!-- <view class="weui-panel__hd">产品列表</view> -->
      <view class="weui-panel__bd">
        <block v-for="(pd, index) in pdInfos" :key="index">
          <view @tap="nav" :data-id="pd.id" :data-title="pd.desc" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__hd">
              <image :src="context + '/' + pd.pcIcon" class="pd-icon"></image>
            </view>
            <view class="weui-cell__bd"><view class="pd-cell-label">{{pd.desc}}</view></view>
          </view>
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
// pages/fpdPdList/index.js
var util = require("../../utils/util.js");

export default {
  data() {
    return {
      context: getApp().globalData.context,
      pdInfos: [],
      pageNum: 1,
      pageSize: 20,
      scrollTop: 0,
      key: '',
      searching: false,
      // 加载是否完毕
      nomore: false
    };
  },


  props: {},
  onLoad: function (options) {
    console.log('onLoad', options);
    getApp().globalData.fpdReSearchPd = true;
  },
  onShow: function (options) {
    // console.log('onLoad, pdClassId:', pdreq.get());
    if (getApp().globalData.fpdReSearchPd) {
      if (this.searching == true) {
        return;
      }

      this.nomore = false;
      this.searching = true;
      this.pageNum = 1;
      this.search();
    }

    var key = getApp().globalData.fpdPdpartext.key;
    this.setData({
      key: key ? key : '搜索产品'
    });
  } // onShareAppMessage: function() {
  // },
  ,
  methods: {
    // （埋点）
    nav: function (e) {
      util.collect({
        token: uni.getStorageSync(getApp().globalData.tokenKey),
        page: '产品列表页',
        event: '查看产品',
        data: e.currentTarget.dataset.title
      });
      uni.navigateTo({
        url: '/pages/pdetail/pdetail?piId=' + e.currentTarget.dataset.id
      });
    },
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
        pageSize: this.pageSize
      };
      var pdpar = getApp().globalData.fpdPdpar;
      console.log('pdpar', pdpar);

      for (let key in pdpar) {
        if ('key' == key) {
          if (pdpar[key] && pdpar[key] != '') {
            data[key] = pdpar[key];
          }
        } else if ("clzqa" == key || "capacity" == key) {
          // clzqa capacity 单选（范围缩小）
          if (pdpar[key] && pdpar[key] != '') {
            // var tem=new Array()        
            // tem[0]=pdpar[key][pdpar[key].length - 1];
            data[key] = pdpar[key][pdpar[key].length - 1];
          }
        } else if (pdpar[key] && pdpar[key] != '') {
          // 数组类型
          var temstr = "";

          for (var item in pdpar[key]) {
            temstr = temstr + pdpar[key][item] + ",";
          }

          data[key] = temstr.substring(0, temstr.length - 1);
        }
      }

      var text = getApp().globalData.fpdPdpartext;

      if (text && text.capacity) {
        var index = text.capacity.lastIndexOf("\/"); // var tem=new Array()        
        // tem[0]=text.capacity.substring(index + 1, text.length);

        console.log('capacity', text.capacity.substring(index + 1, text.length));
        data['capacityCode'] = text.capacity.substring(index + 1, text.length);
      }

      console.log('pdpar', getApp().globalData.fpdPdpar);
      console.log('data', data);
      uni.request({
        url: this.context + '/pd/get-pd-infos-fpd',
        data: data,
        method: 'GET',

        success(res) {
          if (res.data.code == 200) {
            console.log('get-pd-infos:', res.data.data);
            var pdInfos = res.data.data;
            var scrollTop = 0;
            var nomore = res.data.data.length < that.pageSize ? true : false;

            if (that.pageNum == 1) {
              that.setData({
                scrollTop: 0,
                pdInfos: pdInfos,
                nomore: nomore
              });
            } else {
              that.setData({
                scrollTop: that.scrollTop + 0,
                pdInfos: that.pdInfos.concat(pdInfos),
                nomore: nomore
              });
            }

            uni.hideToast();
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
          console.log('get-pd-infos-fpd:', res);
          uni.hideToast();
          that.nomore = true;
          uni.showToast({
            title: '查询产品超时，请重新查询',
            icon: 'none',
            duration: 2000,
            mask: true
          }); // that.setData({
          //   scrollTop: 0,
          //   pdInfos: [],
          //   nomore: true,
          // });
        },

        complete(res) {
          that.searching = false;
          getApp().globalData.fpdReSearchPd = false;
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
      this.scrollTop = e.detail.scrollTop;
    }
  }
};
</script>
<style>
@import "./index.css";
</style>