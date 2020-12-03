<template>
<view class="page">

  <view class="weui-flex">
    <view class="weui-flex__item">
      <view class="placeholder"></view>
    </view>
    <view hover-class="weui-cell_active" @tap="del">
      <view class="placeholder" style="font-weight:530;height:25px;margin-right:10px">删除</view>
    </view>
  </view>

  <scroll-view class="pd-content" scroll-y="true" enable-back-to-top="true">
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">订货标识</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{flag}}</view>
        </view>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">修改数量</view>
        </view>
        <view class="weui-cell__bd">
          <input :value="num" maxlength="9" type="number" pattern="[0-9]*" placeholder="请输入数量" @input="inputNum"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!num ? false : true) : true"></icon>
        </view>
      </view>
      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">修改备注</view>
        </view>
        <view class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="可以备注其他需求" :value="descr" maxlength="200" auto-height="true" @input="inputDesc"></textarea>
        </view>
      </view>
    </view>
  </scroll-view>
  <view class="weui-flex pd-bottom-tool">
    <view class="weui-flex__item">
      <view class="placeholder">
        <button class="weui-btn" type="primary" style="width:90%" @tap="update">提交</button>
      </view>
    </view>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      context: getApp().globalData.context,
      tmpId: '',
      flag: '',
      num: '',
      descr: '',
      checked: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var data = {};
    data.tmpId = options.tmpId;
    data.flag = options.flag;
    data.num = options.num;
    data.descr = options.descr;
    this.setData(data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
    inputNum: function (e) {
      this.setData({
        num: e.detail.value
      });
    },
    inputDesc: function (e) {
      this.descr = e.detail.value;
    },
    validate: function () {
      this.checked = true;

      if (!this.num) {
        return false;
      }

      return true;
    },
    update: function (e) {
      var result = this.validate();

      if (!result) {
        this.setData(this);
        return;
      }

      uni.showToast({
        // title: '请稍等',
        icon: 'loading',
        duration: 3000,
        mask: true
      });
      var that = this;
      var data = {
        id: this.tmpId,
        num: this.num,
        descr: this.descr
      };
      uni.request({
        url: this.context + '/order/update-tmp-num',
        header: {
          'x-access-token': uni.getStorageSync(getApp().globalData.tokenKey)
        },
        data: data,
        method: 'POST',

        success(res) {
          if (res.data.code == 200) {
            uni.hideToast();
            getApp().globalData.flushOrder = true;
            uni.navigateBack({
              delta: 1
            });
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

      });
    },
    del: function () {
      var that = this;
      uni.showModal({
        title: '提示',
        content: '确认要删除么',
        confirmText: "确认",
        cancelText: "取消",
        success: function (res) {
          console.log(res);

          if (res.confirm) {
            uni.showToast({
              // title: '请稍等',
              icon: 'loading',
              duration: 3000,
              mask: true
            });
            var data = {
              id: that.tmpId
            };
            uni.request({
              url: that.context + '/order/delete-tmp',
              header: {
                'x-access-token': uni.getStorageSync(getApp().globalData.tokenKey)
              },
              data: data,
              method: 'POST',

              success(res) {
                if (res.data.code == 200) {
                  getApp().globalData.flushOrder = true;
                  uni.hideToast();
                  uni.navigateBack({
                    delta: 1
                  });
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

            });
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./updateordertmp.css";
</style>