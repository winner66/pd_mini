<template>
<view>
<!-- <view class="page"> -->
  <!-- <view class="pd-split"></view> -->
  <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true">
    <block v-for="(b, index) in banner" :key="index">
      <swiper-item>
        <image :src="context + b.url" mode="widthFix" @tap="preImg" :data-url="b.url"></image>
      </swiper-item>
    </block>
  </swiper>

  <!-- <view class="weui-search-bar">
  <view class="weui-search-bar__form">
    <navigator url="/pages/search/search">
      <view class="weui-search-bar__box">
        <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
        <input type="text" class="weui-search-bar__input" placeholder="{{key}}" disabled="true" />
      </view>
    </navigator>
  </view>
</view> -->

  <view class="pd-split"></view>
<!-- <view class="weui-panel__hd" style="background-color:rgba(200, 200, 200, 0.1)">{{clz.name}}</view> -->
      <view class="weui-cell weui-cell_access manual" hover-class="weui-cell_active" @tap="openManual" data-title="应用指南">
        <view class="weui-cell__bd" style="font-weight:550">应用指南</view>
        <!-- <view class="weui-cell__ft weui-cell__ft_in-access"></view> -->
        <view class="weui-cell__ft">
            <image src="/static/images/view.png" class="pd-icon" style="float:right"></image>
        </view>
      </view>
<view class="pd-split"></view>
  <block v-for="(clz, idx) in pdClasses" :key="idx">
    <view class="weui-panel__hd" style="background-color:rgba(200, 200, 200, 0.1)">{{clz.name}}</view>
    <view class="weui-grids">
      <block v-for="(c, i) in clz.children" :key="i">
        <view :class="'weui-grid' + (clz.children.length>=4?'4':'')" hover-class="weui-grid_active" @tap="pdClassTap" :data-id="c.id" :data-name="c.name" :data-idx="i" :data-opera="c.opera" :data-url="c.fileUrl">
          <view>
            <image class="weui-grid__icon" :src="context + '' + c.icon"></image>
          </view>
          <view class="weui-grid__label">{{c.name}}</view>
        </view>
      </block>
    </view>
  </block>
  <!-- 选项 -->
  <wux-cascader :visible="visible" :value="value" :title="clzName" :options="options" @close="casClose" @change="casChange" controlled="true" position="bottom" :chooseTitle="chooseTitle"></wux-cascader>
<!-- </view> -->
</view>
</template>

<script>
var fileUtil = require("../../utils/fileUtil2.js");
// import wuxCascader from "../../uni_dist/cascader/index";



export default {
  data() {
	  
    return {
      context: getApp().globalData.context,
      key: '',
      // 所有一级：【】 {id: "1", name: "瓷介电容器", icon: "", children: Array(3), opera: "wx"}  // children: 该二级
      pdClasses: [],
      //  所有二级：【】 0: {label: "多层瓷介电容器", value: "4", opera: "wx", children: Array(9)}  // children: 该质量等级
      cas: [],
      // 应用指南文件 【】{label: "1、瓷介电容器简介", value: "1、瓷介电容器简介", opera: "file", fileUrl: "/files/manual/1、瓷介电容器简介.pdf"}
      manual: [],
      // 图片
      banner: [],
      //一级选项
      options: [],
      value: [],
      visible: false,
      clzId: '',
      clzName: '',
      search: false,
      chooseTitle: '请选择'
    };
  },

  // components: {
  //   wuxCascader
  // },
  props: {},
  onLoad: function () {
    this.listBanner();
    this.listPdClass();
  },
  onShow: function () {// this.setData({
    //   key: pdreq.get('key') ? pdreq.get('key') : '搜索产品',
    // });
  },
  onShareAppMessage: function () {},
  methods: {
    //应用指南
    openManual: function (e) {
      console.log(e);
      this.clzName = e.currentTarget.dataset.title;
      this.setData({
        options: this.manual
      });
      this.casOpen();
    },
    pdClassTap: function (e) {
      console.log(e);
      var opera = e.currentTarget.dataset.opera;

      if (opera == "file") {
        var url = this.context + e.currentTarget.dataset.url;
        var file = e.currentTarget.dataset.url.replace(/\//g, "_");
        fileUtil.open(url, file);
      } else {
        // opera: wx
        for (var i = 0; i < this.cas.length; i++) {
          if (this.cas[i].value == e.currentTarget.dataset.id) {
            this.setData({
              options: this.cas[i].children
            });
          }
        }

        ;
        this.clzId = e.currentTarget.dataset.id;
        this.clzName = e.currentTarget.dataset.name;

        try {
          if (e.currentTarget.dataset.name && e.currentTarget.dataset.name.substr(0, 2) == '微波') {
            this.chooseTitle = '请选择';
          } else {
            this.chooseTitle = '质量等级';
          }
        } catch (e) {}

        this.casOpen();
      }
    },
    // 获取产品分类（列表）
    listPdClass: function () {
      uni.showToast({
        // title: '数据加载中',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      var that = this;
      uni.request({
        url: this.context + '/pd/list-pd-class',
        data: {},
        method: 'GET',

        success(res) {
          console.log('get-pd-class:', res.data.data);
          that.setData({
            pdClasses: res.data.data.lev2,
            cas: res.data.data.cas,
            manual: res.data.data.manual
          });
        },

        fail(res) {
          console.log('list-pd-class:', res);
        },

        complete(res) {
          uni.hideToast();
        }

      });
    },
    // 图片列表（头）
    listBanner: function () {
		
		// console.log(getApp().globalData.context);
      var that = this;
      uni.request({
        url: this.context + '/pub/list-banner',
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

      });
    },
    preImg: function (e) {
      var current = this.context + e.currentTarget.dataset.url;
      var urls = [];

      for (let u in this.banner) {
        urls[u] = this.context + this.banner[u].url;
      }

      uni.previewImage({
        current: current,
        urls: urls
      });
    },
    casClose: function () {
      this.setData({
        visible: false
      });

      if (this.search) {
        getApp().globalData.reSearchPd = true;
        this.search = false; // wx.switchTab({
        //   url: '/pages/pdlist/pdlist',
        // })

        uni.navigateTo({
          url: '/pages/search/search'
        });
      }
    },
    casOpen: function () {
      this.setData({
        visible: true,
        clzName: this.clzName,
        chooseTitle: this.chooseTitle,
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
      } //转向search 


      var option = e.detail.options[0];

      if (option && option.opera && option.opera == 'file') {
        var url = this.context + option.fileUrl;
        var file = option.fileUrl.replace(/\//g, "_");
        fileUtil.open(url, file);
      } else {
        // wx
        this.search = true;
        getApp().globalData.pdpar = {};
        getApp().globalData.pdpartext = {};
        var value = [];
        value[0] = this.clzId;
        value = value.concat(e.detail.value);
        getApp().globalData.pdpar.clzqa = value;
        getApp().globalData.pdpartext.clzqa = this.clzName + "/" + e.detail.options.map(n => n.label).join('/');
      }
    }

  }
};
</script>
<style>
@import "./index.css";
</style>