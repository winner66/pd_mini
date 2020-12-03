<template>
<view>
<view class="page">
  <scroll-view class="pd-content" scroll-y="true" enable-back-to-top="true">
    <!-- <view class="weui-cells__title">搜索</view> -->
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">关键字搜索</view>
        </view>
        <view class="weui-cell__bd">
          <input :value="text.key" class="weui-input" @input="keyInput" placeholder="输入参数关键字(以空格分开)"></input>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="clzqa" data-title="产品分类">
        <view class="weui-cell__hd">
          <view class="weui-label">产品分类</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择" :value="text.clzqa" disabled="true"></input>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="quality" data-title="质量等级">
        <view class="weui-cell__hd">
          <view class="weui-label">质量等级</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择" :value="text.quality" disabled="true"></input>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="size" data-title="尺寸">
        <view class="weui-cell__hd">
          <view class="weui-label">尺寸</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择" :value="text.size" disabled="true"></input>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="capacity" data-title="容量">
        <view class="weui-cell__hd">
          <view class="weui-label">容量</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择" :value="text.capacity" disabled="true"></input>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="voltage" data-title="电压">
        <view class="weui-cell__hd">
          <view class="weui-label">电压</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择" :value="text.voltage" disabled="true"></input>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="temperature" data-title="温度特性">
        <view class="weui-cell__hd">
          <view class="weui-label">温度特性</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择" :value="text.temperature" disabled="true"></input>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="tolerance" data-title="精度">
        <view class="weui-cell__hd">
          <view class="weui-label">精度</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择" :value="text.tolerance" disabled="true"></input>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="outlet" data-title="引出端形式">
        <view class="weui-cell__hd">
          <view class="weui-label">引出端形式</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择" :value="text.outlet" disabled="true"></input>
        </view>
      </view>
    </view>


    <view class="weui-flex" style="margin-top:20px">
      <view class="weui-flex__item">
        <view class="placeholder">
          <button class="weui-btn" type="primary" @tap="clear" style="width:90%">重置</button>
        </view>
      </view>

      <view class="weui-flex__item">
        <view class="placeholder">
          <!-- <navigator url="/pages/pdlist/pdlist?search=true" open-type="switchTab"> -->
          <button class="weui-btn" type="primary" @tap="search" style="width:90%">确定</button>
          <!-- </navigator> -->
        </view>
      </view>
    </view>

  </scroll-view>
</view>
<wux-cascader :visible="visible" :value="value" :title="title" :options="options" @close="casClose" @change="casChange" controlled="true" position="right" clearable="true" @clear="casClear"></wux-cascader>
</view>
</template>

<script>
// import wuxCascader from "../../dist/cascader/index";

export default {
  data() {
    return {
      context: getApp().globalData.context,
      //已选择的查询条件text
      text: [],
      //查询条件数据
      options: [],
      //已选择的查询条件value
      value: [],
      //查询框title
      title: '',
      //当前选择的参数
      filterType: '',
	  
      visible: false
    };
  },

  // components: {
  //   wuxCascader
  // },
  props: {},
  onShow: function () {
	  getApp().globalData.pdpar['searchType']=getApp().globalData.searchType;
    this.init();
  },
  methods: {
    keyInput: function (e) {
      var v = e.detail.value;
      this.text.key = v;
      getApp().globalData.pdpartext.key = v;
      getApp().globalData.pdpar.key = v;
    },
    init: function () {
      this.setData({
        text: getApp().globalData.pdpartext
      });
    },
    search: function (e) {
      console.log("pdpar", getApp().globalData.pdpar);
      console.log("pdpartext", getApp().globalData.pdpartext);
      getApp().globalData.reSearchPd = true;
      uni.switchTab({
        url: '/pages/pdlist/pdlist'
      });
    },
    clear: function (e) {
      var pdpar = getApp().globalData.pdpar;

      for (let i in pdpar) {
        pdpar[i] = '';
      }

      var pdpartext = getApp().globalData.pdpartext;

      for (let i in pdpartext) {
        pdpartext[i] = '';
      }

      this.init();
    },
  buildReq: function() {
  	var data = {};

  	var pdpar = getApp().globalData.pdpar;
	
  	console.log('pdpar', pdpar);
  	for (let key in pdpar) {
  		if ('key' == key ||'searchType'== key) {
  			console.log(pdpar[key]);
  			if ((pdpar[key]!=undefined && pdpar[key] != '')||pdpar[key]==0) {
  				data[key] = pdpar[key];
  				console.log(pdpar[key]);
  			}
  		} else if (pdpar[key] && pdpar[key] != '') {
  			data[key] = pdpar[key][pdpar[key].length - 1];
  		}
  	}
  
  	console.log('data', data);
  	return data;
  },
    casClose: function () {
      this.setData({
        visible: false
      });
    },
    casOpen: function (e) {
      uni.showToast({
        // title: '请稍等',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      console.log(e.currentTarget.dataset);
      var type = e.currentTarget.dataset.type;
      this.filterType = type;
      var data = this.buildReq();
      data.filterType = type;
      delete data[type];
      ;
      var that = this;
      console.log(data);
      uni.request({
        url: this.context + '/pd/list-params',
        data: data,
        method: 'GET',

        success(res) {
          console.log('get-pd-class:', res.data.data);
          that.setData({
            options: res.data.data,
            value: getApp().globalData.pdpar[that.filterType],
            title: e.currentTarget.dataset.title,
            visible: true
          });
        },

        fail(res) {
          uni.hideToast();
          uni.showToast({
            title: '获取参数失败，请重新打开选择',
            icon: 'none',
            duration: 1500,
            mask: true
          });
        },

        complete(res) {
          uni.hideToast();
        }

      });
    },

    casChange(e) {
      this.setData({
        value: e.detail.value
      });
      var child = e.detail.options[e.detail.options.length - 1].children;

      if (child && child.length > 0) {
        return;
      } // console.log('casChange', e.detail)


      getApp().globalData.pdpar[this.filterType] = e.detail.value;
      console.log('pdpar', getApp().globalData.pdpar);
      getApp().globalData.pdpartext[this.filterType] = e.detail.options.map(n => n.label).join('/');
      console.log('casChange', getApp().globalData.pdpartext);
      this.setData({
        text: getApp().globalData.pdpartext
      });
    },

    casClear(e) {
      getApp().globalData.pdpar[this.filterType] = '';
      getApp().globalData.pdpartext[this.filterType] = '';
      this.setData({
        visible: false,
        text: getApp().globalData.pdpartext
      });
    }

  }
};
</script>
<style>
@import "./search.css";
</style>