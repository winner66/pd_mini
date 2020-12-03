<template>
<view>
<view :class="'row-wrap ' + ( !reply?'on':'off')">
  <view class="label">预约项目</view>
  <picker @change="bindCasPickerChange" :value="casIndex1" :range="casArray">
    <view>
      <text>{{casArray[casIndex]}}</text>
    </view>
  </picker>
</view>


<view :class="'section ' + (reply?'on':'off')">
  <input name="other" placeholder="请输入所预约项目" type="text"></input>
</view>


<!--logs.wxml-->
<view class="container log-list">
  <block v-for="(log, index) in logs" :key="index">
    <text class="log-item">{{index + 1}}. {{log}}</text>
  </block>
</view>
</view>
</template>

<script>
//logs.js
const util = require("../../utils/util.js");

export default {
  data() {
    return {
      logs: [],
      nickName: "",
      avatarUrl: "",
      casArray: ['双眼皮', 'TBM', '隆胸', '减肥', '手动输入'],
      userName: '',
      mobile: '',
      Gender: 'female',
      casIndex: 0,
      reply: false
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    this.setData({
      logs: (uni.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log));
      })
    });
  },
  methods: {
    bindCasPickerChange: function (e) {
      console.log('乔丹选的是', this.casArray[e.detail.value]);

      if (e.detail.value == 4) {
        this.setData({
          reply: true
        });
      } else {
        this.setData({
          reply: false
        });
      }

      this.setData({
        casIndex: e.detail.value
      });
    }
  }
};
</script>
<style>
@import "./logs.css";
</style>