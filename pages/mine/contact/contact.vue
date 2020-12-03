<template>
<view class="page">
  <view class="page__bd">
    <view class="weui-panel">
      <view class="weui-panel__hd">{{data.company.name}}</view>
      <view class="weui-panel__bd">
        <navigator class="weui-cell" :url="'/pages/mine/contact/map/map?id=' + data.company.id + '&lat=' + data.company.lat + '&lng=' + data.company.lng + '&address=' + data.company.address">
          <view class="weui-cell__hd">
            <view class="weui-label">地址</view>
          </view>
          <view class="weui-cell__bd">
            {{data.company.address}}
          </view>
          <view class="weui-cell__ft weui-cell__ft_in-access"></view>
        </navigator>
        <view class="weui-cell">
          <view class="weui-cell__hd">
            <view class="weui-label">邮编</view>
          </view>
          <view class="weui-cell__bd">
            {{data.company.postCode}}
          </view>
        </view>
        <view class="weui-cell" @tap="callPhone" :data-phone="data.company.phone1">
          <view class="weui-cell__hd">
            <view class="weui-label">{{data.company.phoneTitle1}}</view>
          </view>
          <view class="weui-cell__bd">
            {{data.company.phone1}}
          </view>
          <view class="weui-cell__ft">
            <image src="/static/images/call_phone.png" class="pd-icon" style="float:right"></image>
          </view>
        </view>

        <view class="weui-cell" @tap="callPhone" :data-phone="data.company.phone2">
          <view class="weui-cell__hd">
            <view class="weui-label">{{data.company.phoneTitle2}}</view>
          </view>
          <view class="weui-cell__bd">
            {{data.company.phone2}}
          </view>
          <view class="weui-cell__ft">
            <image src="/static/images/call_phone.png" class="pd-icon" style="float:right"></image>
          </view>
        </view>
        <view class="weui-cell">
          <view class="weui-cell__hd">
            <view class="weui-label">{{data.company.faxTitle}}</view>
          </view>
          <view class="weui-cell__bd">
            {{data.company.fax}}
          </view>
        </view>
        <view class="weui-cell">
          <view class="weui-cell__hd">
            <view class="weui-label">网址</view>
          </view>
          <view class="weui-cell__bd">
            {{data.company.website}}
          </view>
        </view>
        <view class="weui-cell">
          <view class="weui-cell__hd">
            <view class="weui-label">E-mail</view>
          </view>
          <view class="weui-cell__bd">
            {{data.company.email}}
          </view>
        </view>
      </view>
    </view>

    <block v-for="(area, idx) in data.areas" :key="idx">
      <view class="weui-panel">
        <view class="weui-panel__hd">{{area.name}}</view>
        <view class="weui-cell__bd">
          <view class="weui-cell" @tap="callPhone" :data-phone="area.contactPhone">
            <view class="weui-cell__hd">
              <view class="weui-label">{{area.contactTitle}}</view>
            </view>
            <view class="weui-cell__bd">
              {{area.contactName}} {{area.contactPhone}}
            </view>
            <view class="weui-cell__ft">
              <image src="/static/images/call_phone.png" class="pd-icon" style="float:right"></image>
            </view>
          </view>
          <block v-for="(office, idx) in area.offices" :key="idx">
            <view class="weui-panel">
              <view class="weui-panel__hd cm_office">{{office.name}}</view>
              <view class="weui-panel__bd">
                <navigator class="weui-cell" :url="'/pages/mine/contact/map/map?id=' + office.id + '&lat=' + office.lat + '&lng=' + office.lng + '&address=' + office.address">
                  <view class="weui-cell__hd">
                    <view class="weui-label">地址</view>
                  </view>
                  <view class="weui-cell__bd">
                    {{office.address}}
                  </view>
                  <view class="weui-cell__ft weui-cell__ft_in-access"></view>
                </navigator>
                <view class="weui-cell">
                  <view class="weui-cell__hd">
                    <view class="weui-label">邮编</view>
                  </view>
                  <view class="weui-cell__bd">
                    {{office.postCode}}
                  </view>
                </view>
                <view class="weui-cell" @tap="callPhone" :data-phone="office.phone1">
                  <view class="weui-cell__hd">
                    <view class="weui-label">{{office.phoneTitle1}}</view>
                  </view>
                  <view class="weui-cell__bd">
                    {{office.phone1}}
                  </view>
                  <view class="weui-cell__ft">
                    <image src="/static/images/call_phone.png" class="pd-icon" style="float:right"></image>
                  </view>
                </view>
                <view class="weui-cell">
                  <view class="weui-cell__hd">
                    <view class="weui-label">{{office.contactTitle}}</view>
                  </view>
                  <view class="weui-cell__bd">
                    {{office.contactName}}
                  </view>
                </view>
                <view class="weui-cell" @tap="callPhone" :data-phone="office.contactPhone">
                  <view class="weui-cell__hd">
                    <view class="weui-label">{{office.contactTitle}}电话</view>
                  </view>
                  <view class="weui-cell__bd">
                    {{office.contactPhone}}
                  </view>
                  <view class="weui-cell__ft">
                    <image src="/static/images/call_phone.png" class="pd-icon" style="float:right"></image>
                  </view>
                </view>
              </view>
            </view>
          </block>
        </view>
      </view>
    </block>

  </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      context: getApp().globalData.context,
      data: {}
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.list();
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
    callPhone: function (e) {
      // console.log(e, e);
      var phone = e.currentTarget.dataset.phone;

      if (!phone) {
        return;
      }

      var p = phone.split(" ");

      if (p.length > 1) {
        uni.showActionSheet({
          itemList: p,
          success: function (res) {
            if (!res.cancel) {
              console.log(res.tapIndex);
              uni.makePhoneCall({
                phoneNumber: p[res.tapIndex]
              });
            }
          }
        });
      } else {
        uni.makePhoneCall({
          phoneNumber: phone
        });
      }
    },
    list: function () {
      uni.showToast({
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      var that = this;
      var data = {};
      uni.request({
        url: this.context + '/cm/list-contact',
        data: data,
        method: 'GET',

        success(res) {
          if (res.data.code == 200) {
            console.log('list-contact:', res.data.data);
            var data = res.data.data;
            that.setData({
              data: data
            });
          }
        },

        fail(res) {
          console.log('list:', res);
        },

        complete(res) {
          uni.hideToast();
        }

      });
    }
  }
};
</script>
<style>
@import "./contact.css";
</style>