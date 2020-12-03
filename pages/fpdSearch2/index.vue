<template>
	<view>
		<view class="page">
			<scroll-view class="pd-content" scroll-y="true" enable-back-to-top="true">
				<!-- <view class="weui-cells__title">搜索</view> -->
				<view v-if="factory!=undefined&&series!=undefined&&factory!=''&&series!='' " class="title"> 国产化替代{{factory}}--{{series}}系列</view>
				<view class="table">
					<view class="table_head">宏科系列规格:</view>

					<view class="table_line">
						<view class="line_left">宏科系列:</view>
						<view class="line_right">{{hkdata.key}}</view>
					</view>
					<view class="table_line" v-if="hkdata.elecCode!=undefined&&hkdata.elecCode!=''">
						<view class="line_left">电极特性:</view>
						<view class="line_right">{{hkdata.elecCode}}</view>
					</view>

					<view class="table_line" v-if="hkdata.quality!=undefined&&hkdata.quality!=''">
						<view class="line_left">质量等级:</view>
						<view class="line_right">{{hkdata.quality}}</view>
					</view>
					<view class="table_line" v-if="hkdata.size!=undefined&&hkdata.size!=''">
						<view class="line_left">尺寸:</view>
						<view class="line_right">{{hkdata.size}}</view>
					</view>
					<view class="table_line" v-if="hkdata.capacity!=undefined&&hkdata.capacity!=''">
						<view class="line_left">容量:</view>
						<view class="line_right">{{hkdata.capacity}}</view>
					</view>
					<view class="table_line" v-if="hkdata.voltage!=undefined&&hkdata.voltage!=''">
						<view class="line_left">电压:</view>
						<view class="line_right">{{hkdata.voltage}}</view>
					</view>
					<view class="table_line" v-if="hkdata.temperature!=undefined&&hkdata.temperature!=''">
						<view class="line_left">温度特性:</view>
						<view class="line_right">{{hkdata.temperature}}</view>
					</view>
					<view class="table_line" v-if="hkdata.tolerance!=undefined&&hkdata.tolerance!=''">
						<view class="line_left">精度:</view>
						<view class="line_right">{{hkdata.tolerance}}</view>
					</view>
					<view class="table_line" v-if="hkdata.outlet!=undefined&&hkdata.outlet!=''">
						<view class="line_left">引出端形式:</view>
						<view class="line_right">{{hkdata.outlet}}</view>
					</view>

					<view class="table_line" v-if="hkdata.eleCode!=undefined&&hkdata.eleCode!=''">
						<view class="line_left">电极材料代码:</view>
						<view class="line_right">{{hkdata.eleCode}}</view>
					</view>

				</view>
				<view class="hd">
					<text class="line"></text>
					<text class="leftTxt  redTxt " @tap="toPdList">共有({{pdCount}})宏科产品</text>
					<text class="line"></text>
				</view>
				<view class="hd">
					<text class="line"></text>
					<text class="leftTxt">详细查询</text>
					<text class="line"></text>
				</view>
				<view>
					<view v-if="hkdata.quality==undefined||hkdata.quality==''" class="weui-cell" hover-class="weui-cell_active" @tap="casOpen"
					 data-type="quality" data-title="质量等级">
						<view class="weui-cell__hd">
							<view class="weui-label">质量等级</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.quality" disabled="true"></input>
						</view>
					</view>
					<view v-else class="weui-cell" hover-class="weui-cell_active" @tap="onClick3" data-type="quality" data-title="质量等级">
						<view class="weui-cell__hd">
							<view class="weui-label">质量等级(多选)</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.quality" disabled="true"></input>
						</view>
					</view>

					<view v-if="hkdata.size==undefined||hkdata.size==''" class="weui-cell" hover-class="weui-cell_active" @tap="casOpen"
					 data-type="size" data-title="尺寸">
						<view class="weui-cell__hd">
							<view class="weui-label">尺寸</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.size" disabled="true"></input>
						</view>
					</view>
					<view v-else class="weui-cell" hover-class="weui-cell_active" @tap="onClick3" data-type="size" data-title="尺寸">
						<view class="weui-cell__hd">
							<view class="weui-label">尺寸(多选)</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.size" disabled="true"></input>
						</view>
					</view>

					<view v-if="hkdata.capacity==undefined ||hkdata.capacity==''" class="weui-cell" hover-class="weui-cell_active"
					 @tap="casOpen" data-type="capacity" data-title="容量">
						<view class="weui-cell__hd">
							<view class="weui-label">容量</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.capacity" disabled="true"></input>
						</view>
					</view>
					<!-- 容量没有多选 -->

					<view v-if="hkdata.voltage!=undefined&&hkdata.voltage!=''" class="weui-cell" hover-class="weui-cell_active" @tap="onClick3"
					 data-type="voltage" data-title="电压">
						<view class="weui-cell__hd">
							<view class="weui-label">电压(多选)</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.voltage" disabled="true"></input>
						</view>
					</view>
					<view v-else class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="voltage" data-title="电压">
						<view class="weui-cell__hd">
							<view class="weui-label">电压</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.voltage" disabled="true"></input>
						</view>
					</view>

					<view v-if="hkdata.temperature!=undefined&&hkdata.temperature!=''" class="weui-cell" hover-class="weui-cell_active"
					 @tap="onClick3" data-type="temperature" data-title="温度特性">
						<view class="weui-cell__hd">
							<view class="weui-label">温度特性(多选)</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.temperature" disabled="true"></input>
						</view>
					</view>

					<view v-else class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="temperature" data-title="温度特性">
						<view class="weui-cell__hd">
							<view class="weui-label">温度特性</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.temperature" disabled="true"></input>
						</view>
					</view>


					<view v-if="hkdata.tolerance==undefined||hkdata.tolerance==''" class="weui-cell" hover-class="weui-cell_active"
					 @tap="casOpen" data-type="tolerance" data-title="精度">
						<view class="weui-cell__hd">
							<view class="weui-label">精度</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.tolerance" disabled="true"></input>
						</view>
					</view>
					<view v-else class="weui-cell" hover-class="weui-cell_active" @tap="onClick3" data-type="tolerance" data-title="精度">
						<view class="weui-cell__hd">
							<view class="weui-label">精度</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.tolerance" disabled="true"></input>
						</view>
					</view>

					<view v-if="hkdata.outlet==undefined||hkdata.outlet==''" class="weui-cell" hover-class="weui-cell_active" @tap="casOpen"
					 data-type="outlet" data-title="引出端形式">
						<view class="weui-cell__hd">
							<view class="weui-label">引出端形式</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.outlet" disabled="true"></input>
						</view>
					</view>
					<view v-else class="weui-cell" hover-class="weui-cell_active" @tap="onClick3" data-type="outlet" data-title="引出端形式">
						<view class="weui-cell__hd">
							<view class="weui-label">引出端形式(多选)</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.outlet" disabled="true"></input>
						</view>
					</view>

					<view v-if="hkdata.eleCode==undefined||hkdata.eleCode==''" class="weui-cell" hover-class="weui-cell_active" @tap="casOpen"
					 data-type="eleCode" data-title="引出端形式">
						<view class="weui-cell__hd">
							<view class="weui-label">电极材料代码</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.eleCode" disabled="true"></input>
						</view>
					</view>
					<view v-else class="weui-cell" hover-class="weui-cell_active" @tap="onClick3" data-type="eleCode" data-title="引出端形式">
						<view class="weui-cell__hd">
							<view class="weui-label">电极材料代码(多选)</view>
						</view>
						<view class="weui-cell__bd">
							<input type="text" class="weui-input" placeholder="请选择" :value="text.eleCode" disabled="true"></input>
						</view>
					</view>
				</view>


				<view class="weui-flex" style="margin-top:20px">
					<view class="weui-flex__item">
						<view class="placeholder">
							<button class="weui-btn" type="primary" @tap="fpdclear" style="width:90%">重置</button>
						</view>
					</view>

					<view class="weui-flex__item">
						<view class="placeholder">
							<!-- <navigator url="/pages/pdlist/pdlist?search=true" open-type="switchTab"> -->
							<button class="weui-btn" type="primary" @tap="toPdList" style="width:90%">确定</button>
							<!-- </navigator> -->
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<wux-cascader :visible="visible" :value="value" :title="title" :options="options" @close="casClose" @change="casChange"
		 controlled="true" position="right" clearable="true" @clear="casClear"></wux-cascader>
		<wux-select id="wux-select3"></wux-select>
	</view>
</template>

<script>
	// pages/fpdSearch2/index.js
	// 搜索国外产品对应的宏科产品（搜索页 search）
	import {
		$wuxSelect
	} from '../../wxcomponents/dist/index';
	var util = require('../../utils/config/util.js');
	var api = require('../../utils/config/api.js');
	var deepCopy = require("../../utils/deepCopy.js");

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
				// 多选
				fpdValue: [],
				title3: '',
				value3: "",
				visible: false,
				// 国外产品
				factory: "",
				series: "",
				// 常数
				hkdata: {},
				// 国产化替代产品个数
				pdCount: 0,
				// 重置初始数据
				fpdPdpartextStart: {},
				fpdPdparStart: {},

			};
		},

		// components: {

		//   wuxSelect
		// },
		props: {},
		onShow: function() {},
		onLoad: function(options) {

			let factory = options.factory;
			let series = options.series;
			if (factory != undefined && series != undefined) {
				this.setData({
					factory: factory,
					series: series,
				})
			}


			var tem = getApp().globalData.fpdPdpartext;
			var tem1 = getApp().globalData.fpdPdpar;
	
			var fpdPdparStart = deepCopy.baseClone(tem1);
			var fpdPdpartextStart = deepCopy.baseClone(tem);
			uni.setStorage({
				key: "fpdPdparStart",
				data: fpdPdparStart,
				success() {
					console.log('fpdPdparStart存储成功')
				}
			})
			uni.setStorage({
				key: "fpdPdpartextStart",
				data: fpdPdpartextStart,
				success() {
					console.log('fpdPdpartextStart存储成功')
				}
			})

			this.setData({
				fpdPdparStart: fpdPdparStart,
				fpdPdpartextStart: fpdPdpartextStart,
			})
			
			this.init();
		},
		onUnload: function() {
			this.clear();
			uni.removeStorage({
				key: 'fpdPdparStart',
				success: function() {
					console.log('fpdPdparStart删除成功')
				}
			})
			// fpdPdpartextStart
			uni.removeStorage({
				key: 'fpdPdpartextStart',
				success: function() {
					console.log('fpdPdpartextStart删除成功')
				}
			})
		},
		methods: {
			onClick3(e) {
				console.log(e);
				this.filterType = e.currentTarget.dataset.type; //   var selectOption=[{
				//     title: '画画',
				//     value: '1',
				// },
				// {
				//     title: '打球',
				//     value: '2',
				// },
				// {
				//     title: '睡觉',
				//     value: '6',
				// },
				//   ];

				var selectOption = getApp().globalData.options[this.filterType];
				console.log('options', selectOption);
				console.log('fpdvalue', this.fpdValue[this.filterType]);
				var title = e.currentTarget.dataset.title;
				$wuxSelect('#wux-select3').open({
					value: this.fpdValue[this.filterType],
					multiple: true,
					toolbar: {
						title: title + '(多选)',
						confirmText: '确认'
					},
					options: selectOption,
					onChange: (value, index, options) => {
						console.log('onChange', value, index, options);
						this.setData({
							value3: value,
							title3: index.map(n => options[n].title)
						});

					},
					onConfirm: (value, index, options) => {
						console.log('onConfirm', value, index, options);
						let temFpdValue = this.fpdValue;
						temFpdValue[this.filterType] = value;
						this.setData({
							// value3: fpdvalue[this.data.filterType] ,
							title3: index.map(n => options[n].title),
							fpdValue: temFpdValue
						});
						getApp().globalData.fpdPdpar[this.filterType] = [index.map(n => [options[n].title])], getApp().globalData.fpdPdpartext[
							this.filterType] = index.map(n => options[n].title).join(',');
						this.setData({
							text: getApp().globalData.fpdPdpartext
						});
						this.search();
					}
				});
			},

			keyInput: function(e) {
				var v = e.detail.value;
				this.text.key = v;
				getApp().globalData.fpdPdpartext.key = v;
				getApp().globalData.fpdPdpar.key = v;
			},
			init: function() {
				var temText = getApp().globalData.fpdPdpartext;
				var temFpdValue = {};
				var text = "";

				for (var element in temText) {
					if (temText[element].constructor==Array) {
						// element != "key"&&element!="clzqa"

						temFpdValue[element] = temText[element];
						if (temText[element] != "" && temText[element] != []) {
							text = temText[element].map(n => n).join(',');
						}
						temText[element] = text;
						console.log(text);
					}
				}

				getApp().globalData.fpdPdpartext = temText;
				this.setData({
					text: temText,
					fpdValue: temFpdValue
				}); // console.log('pdpartext',getApp().fpdPdpartext);

				console.log('pdpar', getApp().globalData.fpdPdpar);
				console.log('pdpartest', getApp().globalData.fpdPdpartext);
				// console.log('fpdValue',this.data.fpdValue);
				var factorydata = getApp().globalData.fpdPdpartext;
				var hkdata = {};
				for (var key in factorydata) {
					hkdata[key] = factorydata[key];
				}
				this.setData({
					hkdata: hkdata,
				})
				console.log('hkdata', this.hkdata);

				this.search();

			},
			toPdList: function(e) {
				console.log("pdpar", getApp().globalData.fpdPdpar);
				console.log("pdpartext", getApp().globalData.fpdPdpartext);
				getApp().globalData.fpdReSearchPd = true; // wx.switchTab({
				//   url: '/pages/fpdPdList/index',
				// })

				uni.navigateTo({
					url: '/pages/fpdPdList/index'
				});
			},
			search: function() {
				uni.showToast({
					// title: '数据加载中',
					icon: 'loading',
					duration: 10000,
					mask: true
				});
				var that = this;
				var data = {};
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
					url: this.context + '/pd/get-pd-count-fpd',
					data: data,
					method: 'GET',

					success(res) {
						if (res.data.code == 200) {
							var count = res.data.count;
							that.setData({
								pdCount: count
							});

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
						console.log('get-pd-count-fpd:', res);
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

				})
			},
			// 重置搜索条件		
			fpdclear: function(e) {
				console.log("1111111111", getApp().globalData.fpdPdpartext);
				console.log(this.fpdPdparStart);
			
				uni.getStorage({
					key: 'fpdPdparStart',
					success: res => {
						this.fpdPdparStart = res.data
					}
				})
				uni.getStorage({
					key: 'fpdPdpartextStart',
					success: res => {
						this.fpdPdpartextStart = res.data
					}
				})
				getApp().globalData.fpdPdpar = this.fpdPdparStart;
				getApp().globalData.fpdPdpartext = this.fpdPdpartextStart;
				// this.clear();
				this.init();
			},
			// 清除
			clear: function(e) {
				var pdpar = getApp().globalData.fpdPdpar;

				for (let i in pdpar) {
					if(i!='key'){
						pdpar[i] = {};
					}
				}

				var pdpartext = getApp().globalData.fpdPdpartext;

				for (let i in pdpartext) {
						if(i!='key'){
							pdpartext[i] = {};
						}
					
				}

				// this.init();
			},
			buildReq: function() {
				var data = {};
				var pdpar = getApp().globalData.fpdPdpar;

				for (let key in pdpar) {
					if ('key' == key) {
						if (pdpar[key] && pdpar[key] != '') {
							data[key] = pdpar[key];
						}
					} else if (pdpar[key] && pdpar[key] != '') {
						var temstr = "";

						for (var item in pdpar[key]) {
							temstr = temstr + pdpar[key][item] + ",";
						}

						data[key] = temstr.substring(0, temstr.length - 1);
					}
				}

				return data;
			},
			casClose: function() {

				this.setData({
					visible: false
				});
				this.search();  
			},
			casOpen: function(e) {
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
				delete data[type];;
				var that = this;
				console.log("req-param:", data);
				var requestURL;
				uni.request({
					// url:requestURL,
					url: this.context + '/pd/list-params-fpd',
					data: data,
					method: 'GET',

					success(res) {
						console.log('get-pd-param:', res.data.data);
						that.setData({
							options: res.data.data,
							value: getApp().globalData.fpdPdpar[that.filterType],
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
				console.log('e', e);
				this.setData({
					value: e.detail.value
				});
				var child = e.detail.options[e.detail.options.length - 1].children;

				if (child && child.length > 0) {
					return;
				}

				console.log('pdpar', getApp().globalData.fpdPdpar);

				if (this.filterType == 'size') {
					console.log(this.filterType);

					var size = e.detail.options[0].value.split("_");
					console.log(size);
					getApp().globalData.fpdPdpartext[this.filterType] = size[0];
					getApp().globalData.fpdPdpar[this.filterType] = [size[0]];
				} else {
					getApp().globalData.fpdPdpartext[this.filterType] = e.detail.options.map(n => n.label).join('/');
					getApp().globalData.fpdPdpar[this.filterType] = e.detail.value;
				}
				this.setData({
					text: getApp().globalData.fpdPdpartext
				});
			},

			casClear(e) {
				console.log(e);

				if (this.filterType == "key") {
					getApp().globalData.fpdPdpar[this.filterType] = '';
					getApp().globalData.fpdPdpartext[this.filterType] = '';
				} else {
					getApp().globalData.fpdPdpar[this.filterType] = [];
					getApp().globalData.fpdPdpartext[this.filterType] = [];
				}

				this.setData({
					visible: false,
					text: getApp().globalData.fpdPdpartext
				});
				this.search();
			}

		}
	};
</script>
<style>
	@import "./index.css";

	.title {
		padding-top: 20rpx;
		font-size: 36rpx;
		font-weight: 600;
		text-align: center;
	}

	.table {
		min-height: 200rpx;
		width: 650rpx;
		display: flex;
		background-color: #EBEEF5;
		border-radius: 20rpx;
		margin: 20rpx;
		padding: 30rpx;

		flex-direction: column;
	}

	.table .table_head {
		display: flex;
		font-size: 30rpx;
	}

	.table .table_line {
		display: flex;
		flex-direction: row;
	}

	.table .table_line .line_left {
		width: 40%;

	}

	.table .table_line .line_right {
		width: auto;
	}


	.hd {
		padding-top: 30rpx;
		height: 20rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.hd .txt {
		font-size: 24rpx;
		text-align: center;
		color: #333;
		padding: 0 10rpx;
		width: auto;
	}

	.hd .redTxt {
		color: #AB2B2B;
	}

	.hd .line {
		width: 40rpx;
		height: 1px;
		background: #d9d9d9;
	}
</style>
