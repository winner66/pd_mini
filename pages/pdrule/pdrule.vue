<template>
<view class="page">
  <scroll-view class="pd-content" scroll-y="true" enable-back-to-top="true">
    <view class="weui-cells__title">订货示例</view>
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_access">
        <text>
            {{rule.pdExp}}
          </text>
      </view>
      <view class="weui-cell weui-cell_access">
        <text>
            {{rule.orderRule}}
          </text>
      </view>
    </view>

    <view class="weui-cells__title">我的订货</view>
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell" hover-class="weui-cell_active">
        <!-- <text>
            {{rule.pd}}
          </text> -->
        <view class="weui-cell__hd">
          <view class="weui-label">订货标识</view>
        </view>
        <view class="weui-cell__bd" :data-text="rule.pd" @tap="copyRule">
          <view>{{rule.pd}}</view>
        </view>
      </view>

      <view :class="'weui-cell weui-cell_access ' + (rule.showCapacity ? 'on' : 'off')" hover-class="weui-cell_active" @tap="selectPar" data-type="capacity" data-optiontype="capacities">
        <view class="weui-cell__hd">
          <view class="weui-label">标称容量</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择标称容量" :value="capacity" disabled="true"></input>
        </view>
        <!-- <view class="weui-cell__ft weui-cell__ft_in-access"> -->
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!capacity ? false : true) : true"></icon>
        </view>
      </view>

      <view :class="'weui-cell weui-cell_access ' + (rule.showTolerance ? 'on' : 'off')" hover-class="weui-cell_active" @tap="selectPar" data-type="tolerance" data-optiontype="tolerances">
        <view class="weui-cell__hd">
          <view class="weui-label">容量偏差</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择容量偏差" :value="tolerance" disabled="true"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!tolerance ? false : true) : true"></icon>
        </view>
      </view>

      <view :class="'weui-cell weui-cell_access ' + (rule.showOutlet ? 'on' : 'off')" hover-class="weui-cell_active" @tap="selectPar" data-type="outlet" data-optiontype="outlets">
        <view class="weui-cell__hd">
          <view class="weui-label">引出端形式</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择引出端形式" :value="outlet" disabled="true"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!outlet ? false : true) : true"></icon>
        </view>
      </view>

      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">数量</view>
        </view>
        <view class="weui-cell__bd">
          <input class="weui-input" type="number" maxlength="9" pattern="[0-9]*" placeholder="请输入数量" @input="inputNum" :value="num"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!num ? false : true) : true"></icon>
        </view>
      </view>

      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">备注</view>
        </view>
        <view class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="可以备注其他需求" :value="descr" maxlength="200" auto-height="true" :hidden="visible" @input="inputDesc"></textarea>
        </view>
      </view>
    </view>
  </scroll-view>
  <view class="weui-flex pd-bottom-tool">
    <view class="weui-flex__item">
      <view class="placeholder">
        <button class="weui-btn" type="primary" @tap="addOrder" style="width:90%">加入清单</button>
      </view>
    </view>
  </view>

  <wux-popup-select :value="value" :options="options" @valueChange="onValueChange" :visible="visible" controlled :toolbar="toolbar" @visibleChange="onVisibleChange">
  </wux-popup-select>

</view>
</template>

<script>
// import wuxPopupSelect from "../../dist/popup-select/index";
// import wuxCellGroup from "../../dist/cell-group/index";
// import wuxCell from "../../dist/cell/index";

export default {
  data() {
    return {
      context: getApp().globalData.context,
      rule: {},
      piId: '',
      num: '',
      descr: '',
      capacity: '',
      tolerance: '',
      outlet: '',
      type: '',
      toolbar: {
        title: '请选择'
      },
      visible: false,
      options: '',
      value: '',
      checked: false
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
    console.log('onLoad', options);
    var text = getApp().globalData.pdpartext;
    var value = getApp().globalData.pdpar;

    if (text.capacity) {
      var index = text.capacity.lastIndexOf("\/");
      this.capacity = text.capacity.substring(index + 1, text.length);
    }

    if (text.tolerance) {
      this.tolerance = value.tolerance[0];
    }

    if (text.outlet) {
      this.outlet = value.outlet[0];
    }

    this.piId = options.piId;
    console.log(this);
    this.getPdRule(options.piId);
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
      // this.data.num = e.detail.value;
      this.setData({
        num: e.detail.value
      });
    },
    inputDesc: function (e) {
      this.descr = e.detail.value;
    },
    validate: function () {
      this.checked = true;

      if (this.rule.showCapacity && !this.capacity) {
        return false;
      }

      if (this.rule.showTolerance && !this.tolerance) {
        return false;
      }

      if (this.rule.showOutlet && !this.outlet) {
        return false;
      }

      if (!this.num) {
        return false;
      }

      return true;
    },
    addOrder: function (e) {
      var result = this.validate();

      if (!result) {
        this.setData(this);
        return;
      }

      uni.showToast({
        title: '请稍等',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      var that = this;
      var data = {
        pdInfoId: this.piId,
        num: this.num,
        descr: this.descr,
        flag: this.rule.pd
      };
      uni.request({
        url: this.context + '/order/save-tmp',
        header: {
          'x-access-token': uni.getStorageSync(getApp().globalData.tokenKey)
        },
        data: data,
        method: 'POST',

        success(res) {
          if (res.data.code == 200) {
            getApp().globalData.flushOrder = true;
            uni.hideToast();
            uni.showToast({
              title: '加入清单成功',
              icon: 'success',
              duration: 1500,
              success: function () {
                setTimeout(function () {
                  uni.switchTab({
                    url: '/pages/pdlist/pdlist'
                  });
                }, 1500);
              }
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
    getPdRule: function (piId) {
      uni.showToast({
        // title: '数据加载中',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      var that = this;
      uni.request({
        url: this.context + '/pd/get-pd-rule',
        data: {
          piId: piId
        },
        method: 'GET',

        success(res) {
          if (res.data.code == 200) {
            console.log('get-pd-rule:', res.data.data);
            var data = that;
            data.rule = res.data.data;
            that.setPd();
            that.setData(data);
          }
        },

        fail(res) {
          console.log('get-pd-detail:', res);
        },

        complete(res) {
          uni.hideToast();
        }

      });
    },
    copyRule: function (e) {
      uni.setClipboardData({
        data: e.currentTarget.dataset.text,
        success: function (res) {
          uni.getClipboardData({
            success: function (res) {
              uni.showToast({
                title: '已复制订货标识'
              });
            }
          });
        }
      });
    },

    onValueChange(e) {
      var data = {};
      data[this.type] = e.detail.value;
      data.visible = false;
      this.setData(data);
      this.setPd(); // console.log(`onValueChange `, e.detail)
    },

    selectPar(e) {
      var type = e.currentTarget.dataset.type;
      var optiontype = e.currentTarget.dataset.optiontype;
      this.setData({
        options: this.rule[optiontype],
        value: this[type],
        type: type,
        visible: true
      });
    },

    onVisibleChange(e) {
      this.setData({
        visible: e.detail.visible
      });
    },

    setPd: function () {
      var rule = this.rule;
      rule.pd = this.rule.pdTemplate;
      rule.pd = this.rule.pd.replace('电容', !this.capacity ? '[?]' : this.capacity);
      rule.pd = this.rule.pd.replace('精度/容量偏差', !this.tolerance ? '[?]' : this.tolerance);
      rule.pd = this.rule.pd.replace('引出端形式', !this.outlet ? '[?]' : this.outlet);
      this.setData({
        rule: rule
      });
    }
  }
};
</script>
<style>
@import "./pdrule.css";
</style>