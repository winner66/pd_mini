<template>
<view class="page">

  <!-- <view class="pd-split"></view> -->
  <!-- <view class="weui-flex" style="height:30px;padding-top:10px"> -->
  <view class="weui-flex">
    <view class="weui-flex__item">
      <view class="placeholder" style="padding-left:5px;font-weight:530;" @tap="checkAllFun">
        <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!checkAll"></icon>
        <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="checkAll"></icon>
        全选
      </view>
    </view>
    <!-- <view class="weui-flex__item">
      <view hover-class="weui-cell_active1" bindtap="copyRule">
        <view class="placeholder" style="font-weight:530;height:25px">
        复制标识<image src="/images/copy.png" class="pd-icon" style="padding-left:3px"></image>
        </view>
      </view>
    </view> -->
    <view class="weui-flex__item">
    </view>
    <view hover-class="weui-cell_active1" @tap="navOrderList">
      <view class="placeholder" style="font-weight:530;height:25px;margin-right:10px">历史清单</view>
    </view>
  </view>

  <view class="pd-split"></view>
  <scroll-view scroll-y="true" class="pd-content" style="100%" @scrolltolower="loadMore" @scroll="scroll" croll-with-animation="true" enable-back-to-top="true" :scroll-top="scrollTop">

    <!-- <view class="weui-panel weui-panel_access"> -->
    <!-- <view class="weui-panel__hd">产品列表</view> -->
    <!-- <view class="weui-panel__bd"> -->
    <!-- <checkbox-group bindchange="checkboxChange"> -->
    <block v-for="(d, index) in data" :key="index">
      <view class="weui-cell" hover-class="weui-cell_active1">
        <!-- <checkbox class="weui-check" value="{{d.id}}" checked="{{d.checked}}" /> -->
        <view class="weui-cell__hd weui-check__hd_in-checkbox" @tap="selOrder" :data-id="d.id">
          <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!d.checked"></icon>
          <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="d.checked"></icon>
        </view>
        <image :src="context + '/' + d.pcIcon" class="pd-icon"></image>
        <!-- <view url="/pages/ordertmp/updateordertmp?tmpId={{d.id}}&flag={{d.flag}}&num={{d.num}}&descr={{d.descr}}" class="weui-cell weui-cell_access" hover-class="weui-cell_active"> -->
        <view class="weui-cell__bd" hover-class="weui-cell_active1" :data-id="d.id" :data-flag="d.flag" :data-num="d.num" :data-descr="d.descr" @tap="navupdate">
          <view class="weui-cell__bd weui-cell__ft_in-access" hover-class="weui-cell_active1">
            <view class="pd-cell-label">{{d.flag}}</view>
          </view>
          <view class="weui-cell__ft" style="padding-top:2px;text-align:left;font-size:11px;color:rgba(0, 0, 0, 0.5)">数量 {{d.num}}</view>
        </view>
        <!-- </view> -->
      </view>
    </block>
    <!-- </checkbox-group> -->

    <view class="weui-loadmore" :hidden="nomore">
      <view class="weui-loading"></view>
      <view class="weui-loadmore__tips">正在加载...</view>
    </view>

    <view class="weui-loadmore weui-loadmore_line" :hidden="haspd">
      <view class="weui-loadmore__tips weui-loadmore__tips_in-line">您还未添加产品</view>
    </view>
    <!-- </view> -->
    <!-- </view> -->
  </scroll-view>

  <view class="weui-flex pd-bottom-tool" :hidden="data.length==0">
    <view class="weui-flex__item">
      <view class="placeholder">
        <button class="weui-btn" type="primary" style="width:90%" @tap="copyRule">复制标识</button>
      </view>
    </view>
    <view class="weui-flex__item">
      <view class="placeholder">
        <button class="weui-btn" type="primary" style="width:90%" @tap="commit">提交清单</button>
      </view>
    </view>
  </view>
</view>
</template>

<script>
var util = require("../../utils/util.js");

export default {
  data() {
    return {
      context: getApp().globalData.context,
      data: [],
      pageNum: 1,
      pageSize: 100,
      scrollTop: 0,
      searching: false,
      nomore: false,
      contact: '',
      phone: '',
      haspd: true,
      checkAll: false,
      checked: false,
      checkIds: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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

    if (this.searching == true) {
      return;
    }

    if (getApp().globalData.flushOrder) {
      this.nomore = false;
      this.searching = true;
      this.pageNum = 1;
      this.search();
    }
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
  onReachBottom: function () {}
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {
  // }
  ,
  methods: {
    copyRule: function (e) {
      var rule = '';

      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].checked) {
          if (rule != '') {
            rule += '\n';
          }

          rule += this.data[i].flag;
        }
      }

      if (!rule) {
        uni.showToast({
          title: '请选中要复制的产品',
          icon: 'none',
          mask: true,
          duration: 1000
        });
        return;
      }

      uni.setClipboardData({
        data: rule,
        success: function (res) {
          uni.getClipboardData({
            success: function (res) {
              uni.showToast({
                title: '已复制选中标识',
                duration: 1000
              });
            }
          });
        }
      });
    },
    navOrderList: function () {
      uni.navigateTo({
        url: '/pages/order/order'
      });
    },
    navupdate: function (e) {
      var id = e.currentTarget.dataset.id;
      var flag = e.currentTarget.dataset.flag;
      var num = e.currentTarget.dataset.num;
      var descr = e.currentTarget.dataset.descr;
      uni.navigateTo({
        url: '/pages/ordertmp/updateordertmp?tmpId=' + id + '&flag=' + flag + '&num=' + num + '&descr=' + descr
      });
    },
    selOrder: function (e) {
      // console.log('checkbox发生change事件，携带value值为：', e.detail.value);
      var data = this.data;
      var checkid = e.currentTarget.dataset.id;

      for (var i = 0; i < data.length; i++) {
        if (data[i].id == checkid) {
          data[i].checked = !data[i].checked;
          break;
        }
      }

      var checkAll = true;

      for (var i = 0; i < data.length; i++) {
        if (!data[i].checked) {
          checkAll = false;
          break;
        }
      }

      this.setData({
        data: data,
        checkAll: checkAll
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
    checkAllFun: function () {
      var checkAll = !this.checkAll;
      var data = this.data;

      for (var i = 0; i < data.length; i++) {
        data[i].checked = checkAll;
      }

      this.setData({
        data: data,
        checkAll: checkAll
      });
    },
    selectAll: function (data) {
      for (var i = 0; i < data.length; i++) {
        data[i].checked = true;
      }
    },
    search: function () {
      uni.showToast({
        // title: '数据加载中',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      this.checkIds = {};

      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].checked) {
          this.checkIds[this.data[i].id] = true;
        }
      }

      var that = this;
      var data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      uni.request({
        url: this.context + '/order/list-tmp',
        header: {
          'x-access-token': uni.getStorageSync(getApp().globalData.tokenKey)
        },
        data: data,
        method: 'GET',

        success(res) {
          if (res.data.code == 200) {
            console.log('list-tmp:', res.data.data);
            var data = res.data.data;
            var scrollTop = 0;
            var nomore = data.length < that.pageSize ? true : false;
            var haspd = data.length > 0 ? true : false; // that.selectAll(data);

            var checkAll = true;

            if (data.length == 0) {
              checkAll = false;
            }

            for (var i = 0; i < data.length; i++) {
              if (that.checkIds[data[i].id]) {
                data[i].checked = true;
              } else {
                checkAll = false;
              }
            }

            that.setData({
              data: data,
              scrollTop: 0,
              nomore: nomore,
              haspd: haspd,
              checkAll: checkAll
            });
            getApp().globalData.flushOrder = false;
            uni.hideToast();
          } else {
            uni.hideToast();
            uni.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500
            });
          }
        },

        fail(res) {
          uni.hideToast();
          console.log('list-tmp', res);
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
    commit: function () {
      if (this.data.length == 0) {
        uni.showToast({
          title: '清单中无任何产品',
          icon: 'none',
          duration: 1500,
          mask: true
        });
        return;
      }

      var ids = [];

      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].checked) {
          ids[i] = this.data[i].id;
        }
      }

      if (ids.length == 0) {
        uni.showToast({
          title: '请选中要提交的产品',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return;
      }

      ids = ids.join(',');
      uni.navigateTo({
        url: '/pages/ordertmp/ordercon?ids=' + ids
      });
    }
  }
};
</script>
<style>
@import "./ordertmp.css";
</style>