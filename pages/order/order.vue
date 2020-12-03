<template>
<view class="page">

  <scroll-view scroll-y="true" class="pd-content" @scrolltolower="loadMore" @scroll="scroll" croll-with-animation="true" enable-back-to-top="true" :scroll-top="scrollTop">
    <block v-for="(d, index) in data" :key="index">
      <navigator :url="'/pages/orderitem/orderitem?orderId=' + d.id" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <view class="weui-cell__bd weui-cell__ft_in-access">
          <view style="font-size:14px" class="pd-cell-label">{{d.contact}}    {{d.phone}}    {{d.company}}</view>
          <view style="padding-top:5px;text-align:left;font-size:12px;color:rgba(0, 0, 0, 0.7)">{{d.formatCreateDate}}</view>
          <view style="padding-top:5px;text-align:left;font-size:12px;color:rgba(0, 0, 0, 0.5)">备注 {{d.descr}}</view>
        </view>
        <!-- <view class="weui-cell__ft"></view> -->
      </navigator>
    </block>

    <view class="weui-loadmore" :hidden="nomore">
      <view class="weui-loading"></view>
      <view class="weui-loadmore__tips">正在加载...</view>
    </view>
    <view class="weui-loadmore weui-loadmore_line" :hidden="!nomore">
      <view class="weui-loadmore__tips weui-loadmore__tips_in-line">已无更多数据</view>
    </view>
  </scroll-view>
</view>
</template>

<script>

export default {
  data() {
    return {
      context: getApp().globalData.context,
      data: [],
      pageNum: 1,
      pageSize: 50,
      scrollTop: 0,
      searching: false,
      nomore: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');

    if (this.searching == true) {
      return;
    }

    this.nomore = false;
    this.searching = true;
    this.pageNum = 1;
    this.search();
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
      uni.request({
        url: this.context + '/order/list-order',
        header: {
          'x-access-token': uni.getStorageSync(getApp().globalData.tokenKey)
        },
        data: data,
        method: 'GET',

        success(res) {
          if (res.data.code == 200) {
            console.log('list-order:', res.data.data);
            var data = res.data.data;
            var scrollTop = 0;
            var nomore = res.data.data.length < that.pageSize ? true : false;

            if (that.pageNum == 1) {
              that.setData({
                scrollTop: 0,
                data: data,
                nomore: nomore
              });
            } else {
              that.setData({
                scrollTop: that.scrollTop + 0,
                data: that.data.concat(data),
                nomore: nomore
              });
            }

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
          console.log('get-pd-infos:', res);
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
    }
  }
};
</script>
<style>
@import "./order.css";
</style>