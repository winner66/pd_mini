<template>
<!--pages/fpdSearchTest/fpdSearchTest.wxml-->
<view class="page">
<!-- <view class="pd-split"></view> -->
  <scroll-view class="pd-content" scroll-y="true" enable-back-to-top="true">
    <view class="weui-cells weui-cells_after-title">

      <view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen">
        <view class="weui-cell__hd">
          <view class="weui-label">厂家型号</view>
        </view>
        <view class="weui-cell__bd">
        <input type="text" class="weui-input" placeholder="请选择厂家" :value="factory" disabled="true"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!factory ? false : true) : true"></icon>
        </view>
      </view>
    </view>
    <!-- <view class="weui-flex__item">
        <view class="placeholder">    
          <button class="weui-btn" type="primary" bindtap="search" style="width:90%">确定</button>       
        </view>
      </view> -->
  </scroll-view>

  <!-- <wux-popup-select value="{{value}}" options="{{options}}" bind:valueChange="onValueChange" visible="{{ visible }}" controlled toolbar="{{toolbar}}" bind:visibleChange="onVisibleChange">
  </wux-popup-select> -->

  <wux-cascader :visible="visible" :value="value" :title="title" :options="options" @close="casClose" @change="casChange" controlled="true" position="top" clearable="true" @clear="casClear"></wux-cascader>

</view>
</template>

<script>
var deepCopy = require("../../utils/deepCopy.js"); 
// import wuxPopupSelect from "../../dist/popup-select/index";
// import wuxCellGroup from "../../dist/cell-group/index";
// import wuxCell from "../../dist/cell/index";
// import wuxCascader from "../../dist/cascader/index";

export default {
  data() {
    return {
      // factorys:[
      //   {value:"test1",id:11},
      //   {value:"test2",id:11}
      //   // {id: "11", name: "AMC E系列", code: "AMC E系列", orderRule: "电压(位置1;长度3)封装及外形尺寸(位置4;长度3)温度特性/系数(位置7;长度1)", value: "AMC E系列1"},
      //   // {id: "11", name: "AMC E系列", code: "AMC E系列", orderRule: "电压(位置1;长度3)封装及外形尺寸(位置4;长度3)温度特性/系数(位置7;长度1)", value: "AMC E系列2"},
      // ],
      // factory:'',
      // toolbar: {
      //   title: '请选择'
      // },
      // visible: false,
      // options: '',
      // // value:'',
      // checked: false,
      factorys: [{
        label: "厂1",
        value: "4",
        opera: "wx",
        children: [{
          label: "系列1-1",
          value: "9",
          opera: "wx",
          children: [{
            label: "产品1-1-1",
            value: "11",
            opera: "wx",
            children: []
          }, {
            label: "产品1-1-2",
            value: "12",
            opera: "wx",
            children: []
          }]
        }, {
          label: "系列1-2",
          value: "13",
          opera: "wx",
          children: [{
            label: "产品1-2-1",
            value: "14",
            opera: "op",
            data: {
              key: "CT4L",
              voltage: "200V"
            }
          }, {
            label: "产品1-2-2",
            value: "15",
            opera: "op",
            data: {
              key: "CT4L",
              voltage: "200V"
            }
          }]
        }]
      }, {
        label: "厂2",
        value: "5",
        opera: "wx",
        children: [{
          label: "系列2-1",
          value: "12",
          opera: "wx",
          children: [{
            label: "产2-1-1",
            value: "5",
            opera: "op",
            data: {
              key: "CT4L",
              size: 1,
              voltage: "<=100V"
            }
          }, {
            label: "产品2-1-2",
            value: "6",
            opera: "op",
            data: {
              key: "CC4L",
              voltage: "<=100V"
            }
          }]
        }, {
          label: "系列2-2",
          value: "2",
          opera: "wx",
          children: [{
            label: "产品2-2-1",
            value: "1",
            opera: "op",
            data: {
              key: "CT41P",
              size: 4045
            }
          }, {
            label: "产品2-2-2",
            value: "3",
            opera: "op",
            data: {
              key: "CC411",
              size: "0505"
            }
          }]
        }]
      }],
      //已选择的查询条件text
      text: [],
      value: [],
      //查询条件数据
      options: [],
      //查询框title
      title: '',
      // 
      context: getApp().globalData.context,
      //已选择的查询条件text
      text: [],
      visible: false
    };
  },

  // components: {
  //   wuxPopupSelect,
  //   wuxCellGroup,
  //   wuxCell,
  //   wuxCascader
  // },
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
    this.getFactorys();
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
    getFactorys: function () {
      var that = this;
      uni.showToast({
        // title: '数据加载中',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      uni.request({
        url: this.context + '/fpd/get-fpd-series',
        data: {},
        method: 'GET',

        success(res) {
          console.log('get-factorys:', res.data.data);
          that.factorys = res.data.data;
        },

        fail(res) {
          console.log('get-factorys:', res);
        },

        complete(res) {
          uni.hideToast();
        }

      });
    },
    // selectPar(e) {  
    //   this.setData({
    //     options: this.data.factorys,
    //     value: this.factory,
    //     visible: true,
    //   })
    //   console.log(e);
    // },
    // onValueChange(e) {
    //   var data = {};
    //   // console.log(e.detail);
    //   // model ：  AMC E系列
    //   data.factory = e.detail.value;
    //   data.visible = false;
    //   console.log(data);
    //   this.setData(data);
    // },
    // onVisibleChange(e) {
    //   this.setData({ visible: e.detail.visible })
    // },
    // clear:function(e){
    //   this.setData({
    //     factory:'',
    //     // code:'',
    //   });
    // },
    //cas--------
    casClose: function () {
      this.setData({
        visible: false
      });
    },
    casOpen: function (e) {
      var that = this;
      that.setData({
        options: that.factorys,
        value: "value",
        title: e.currentTarget.dataset.title,
        visible: true
      });
    },

    casChange(e) {
      this.setData({
        value: e.detail.value
      });
      var child = e.detail.options[e.detail.options.length - 1].children;

      if (child && child.length > 0) {
        return;
      }

      var len = e.detail.options.length - 1; // text=e.detail.options.map((n) => n.label).join('/');
      // 对data内部做处理（除了key 以外的值 设置为【】）

      var data = e.detail.options[len].data;
      var tem = getApp().globalData.fpdPdpartext;
      console.log(data);
		console.log(tem);
      for (let key in data) {
        console.log(key);

        if ('key' == key) {
          tem["key"] = data[key][0].title;
        } else if (data[key] && data[key] != '') {
          // data[key] = data[key][pdpar[key].length - 1];
          var array = [];

          for (var item in data[key]) {
            array.push(data[key][item].title);
          }

          console.log(array);
          tem[key] = array;
        }
      }

      console.log('tem', tem);

      if (tem["key"] != null && tem["socStr"] != null && tem["key"] != '' && tem["socStr"] != '') {
        tem["key"] = tem["key"] + "-" + tem["socStr"][0];
      }

      getApp().globalData.options = data;
      getApp().globalData.fpdPdpar = tem;
      var temText = getApp().globalData.fpdPdpartext;

      for (let key in data) {
        console.log(key);

        if ('key' == key) {
          temText["key"] = data[key][0].title;
        } else if (data[key] && data[key] != '') {
          // data[key] = data[key][pdpar[key].length - 1];
          var array = [];

          for (var item in data[key]) {
            array.push(data[key][item].title);
          }

          console.log(array);
          temText[key] = array;
        }
      }

      console.log(' temText', temText);

      if (temText["key"] != null && temText["socStr"] != null && temText["key"] != '' && temText["socStr"] != '') {
        temText["key"] = temText["key"] + "-" + temText["socStr"][0];
      }

      var deep = deepCopy.baseClone(tem);
      getApp().globalData.fpdPdpartext = deep;
      console.log(' temText', temText);
      console.log('data', getApp().globalData.options);
      this.search();
    },

    search1: function (e) {
      console.log("pdpartext", getApp().globalData.fpdPdpartext);
      console.log("pdpar", getApp().globalData.fpdPdpar);
      getApp().globalData.fpdReSearchPd = true; // wx.switchTab({
      //   url: '/pages/pdlist/pdlist',
      // })
    },
    search: function (e) {
      // pages/search/search
      getApp().globalData.fpdReSearchPd = true;
      console.log("pdpartext", getApp().globalData.fpdPdpartext);
      console.log("pdpar", getApp().globalData.fpdPdpar);
      uni.navigateTo({
        url: '/pages/fpdSearch2/index'
      });
    },

    casClear(e) {
      this.setData({
        visible: false
      });
    }

  }
};
</script>
<style>
@import "./fpdSearchTest.css";
</style>