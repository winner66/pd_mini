<template>
	<!--pages/V2/search/search.wxml-->
	<view class="page">
		<view class="weui-search-bar">
			<view class="weui-search-bar__form">
				<view class="weui-search-bar__box">
					<icon class="weui-icon-search_in-box" type="search" size="14"></icon>
					<!-- <input type="text" class="weui-search-bar__input" :placeholder="key" disabled="true"></input> -->
					   <input :value="text.key" type="text" class="weui-search-bar__input" @input="keyInput"  placeholder="输入参数关键字(以空格分开)"></input>
				</view>
			</view>
		</view>
		
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item, index) in itemNav" :key="index" :class="'cu-item ' + (index==TabCur?'text-green cur':'')" @click="tabSelect"
			 :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<scroll-view scroll-y v-if="TabCur==0">
			<!--0"电容器",  -->
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



			<view class="weui-flex" style="margin-top:20px">
				<view class="weui-flex__item">
					<view class="placeholder">
						<button class="weui-btn" type="primary" @tap="clear" style="width:90%">重置</button>
					</view>
				</view>
			</view>
			<view class="weui-flex__item">
				<view class="placeholder">
					<!-- <navigator url="/pages/pdlist/pdlist?search=true" open-type="switchTab"> -->
					<button class="weui-btn" type="primary" @tap="search" style="width:90%">确定</button>
					<!-- </navigator> -->
				</view>
			</view>




		</scroll-view>

		<scroll-view scroll-y v-if="TabCur==1">
			<!-- 1 "滤波器", [名]	waveFilter-->
			<!-- 质量等级	产品型号	封装格式(尺寸代码) -->
		<!-- 		
	<view class="weui-cell" hover-class="weui-cell_active"  
			 data-title="滤波器分类">

				<view class="weui-cell__hd">
					<view class="weui-label">滤波器分类:</view>
				</view>
				<view class="weui-cell__bd">			
					<picker mode="selector" name=""  :range='hkarray'  :value='hkindex'   data-title="滤波器分类" @change='tapWaveFilter'>
					               <view class='picker' data-item="item">{{hkarray[hkindex]}}</view>
					 </picker>					
				</view>
				<view>
					<i-icon type="unfold" size="28" color="#80848f"></i-icon>
				</view>
			</view>
 -->
			<!-- 	<view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="quality" data-title="产品型号">
				<view class="weui-cell__hd">
					<view class="weui-label">产品型号</view>
				</view>
				<view class="weui-cell__bd">
					<input type="text" class="weui-input" placeholder="请选择" :value="text.claz" disabled="true"></input>
				</view>
			</view> -->

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
				<!-- LL -->
				<view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="passBandRange" data-title="通带频率范围">
					<view class="weui-cell__hd">
						<view class="weui-label">通带频率范围</view>
					</view>
					<view class="weui-cell__bd">
						<input type="text" class="weui-input" placeholder="请选择" :value="text.passBandRange" disabled="true"></input>
					</view>
				</view>
				<!-- LB -->
				<view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="centerFrequency" data-title="中心频率">
					<view class="weui-cell__hd">
						<view class="weui-label">中心频率</view>
					</view>
					<view class="weui-cell__bd">
						<input type="text" class="weui-input" placeholder="请选择" :value="waveFilter.centerFrequency" disabled="true"></input>
					</view>
				</view>
				
				<view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="bandwidth" data-title="带宽">
					<view class="weui-cell__hd">
						<view class="weui-label">带宽</view>
					</view>
					<view class="weui-cell__bd">
						<input type="text" class="weui-input" placeholder="请选择" :value="waveFilter.bandwidth" disabled="true"></input>
					</view>
				</view>
				<!-- LH -->
				<view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="cutOffFrequency" data-title="3dB截止频率">
					<view class="weui-cell__hd">
						<view class="weui-label">3dB截止频率</view>
					</view>
					<view class="weui-cell__bd">
						<input type="text" class="weui-input" placeholder="请选择" :value="waveFilter.cutOffFrequency" disabled="true"></input>
					</view>
				</view>
	<!-- 		<view v-if="hkindex==2">				
			</view>
			<view v-else-if="hkindex==1">				
			</view>
			<view v-else>			
			</view>	 -->
			
			<view class="weui-flex" style="margin-top:20px">
				<view class="weui-flex__item">
					<view class="placeholder">
						<button class="weui-btn" type="primary" @tap="clear" style="width:90%">重置</button>
					</view>
				</view>
			</view>
			<view class="weui-flex__item">
				<view class="placeholder">
					<!-- <navigator url="/pages/pdlist/pdlist?search=true" open-type="casChangeswitchTab"> -->
					<button class="weui-btn" type="primary" @tap="search" style="width:90%">确定</button>
					<!-- </navigator> -->
				</view>
			</view>
			
		
	

		</scroll-view>
	<scroll-view scroll-y v-if="TabCur==2">
		<!-- 2"功分器",  -->
	<!-- 	<view class="weui-cell" hover-class="weui-cell_active" 
		 data-title="功分器分类">		
			<view class="weui-cell__hd">
				<view class="weui-label">功分器分类:</view>
			</view>
			<view class="weui-cell__bd">						
				 <picker mode="selector" name=""  :range='jLTCArray' :value='jLTCIndex'   data-title="功分器分类" @change='tapJLTC'>
				                <view class='picker' data-item="item">{{jLTCArray[jLTCIndex]}}</view>
				  </picker>	
			</view>
			<view>
				<i-icon type="unfold" size="28" color="#80848f"></i-icon>
			</view>		
		</view> -->
		<view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="quality" data-title="质量等级">
			<view class="weui-cell__hd">
				<view class="weui-label">质量等级</view>
			</view>
			<view class="weui-cell__bd">
				<input type="text" class="weui-input" placeholder="请选择" :value="jLTC.quality" disabled="true"></input>
			</view>
		</view>
		
		<view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="size" data-title="尺寸">
			<view class="weui-cell__hd">
				<view class="weui-label">尺寸</view>
			</view>
			<view class="weui-cell__bd">
				<input type="text" class="weui-input" placeholder="请选择" :value="jLTC.size" disabled="true"></input>
			</view>
		</view>
		<view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="passBandRange" data-title="频率范围">
			<view class="weui-cell__hd">
				<view class="weui-label">频率范围</view>
			</view>
			<view class="weui-cell__bd">
				<input type="text" class="weui-input" placeholder="请选择" :value="jLTC.passBandRange" disabled="true"></input>
			</view>
		</view>
		
	</scroll-view>
	<scroll-view scroll-y v-if="TabCur==3">
		<!-- 3"陶瓷介质基片" -->
		<view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="materialCode" data-title="材料代码">
			<view class="weui-cell__hd">
				<view class="weui-label">材料代码</view>
			</view>
			<view class="weui-cell__bd">
				<input type="text" class="weui-input" placeholder="请选择" :value="text.materialCode" disabled="true"></input>
			</view>
		</view>
		
		<view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="lengthWidthCode" data-title="长宽代码">
			<view class="weui-cell__hd">
				<view class="weui-label">长宽代码</view>
			</view>
			<view class="weui-cell__bd">
				<input type="text" class="weui-input" placeholder="请选择" :value="text.lengthWidthCode" disabled="true"></input>
			</view>
		</view>
		<view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="thicknessCode" data-title="厚度代码">
			<view class="weui-cell__hd">
				<view class="weui-label">厚度代码</view>
			</view>
			<view class="weui-cell__bd">
				<input type="text" class="weui-input" placeholder="请选择" :value="text.thicknessCode" disabled="true"></input>
			</view>
		</view>
		<view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" data-type="surfaceCode" data-title="表面代码">
			<view class="weui-cell__hd">
				<view class="weui-label">表面代码</view>
			</view>
			<view class="weui-cell__bd">
				<input type="text" class="weui-input" placeholder="请选择" :value="text.surfaceCode" disabled="true"></input>
			</view>
		</view>
	</scroll-view>
			<wux-cascader :visible="visible" :value="value" :title="title" :options="options" @close="casClose" @change="casChange"
			 controlled="true" position="right" clearable="true" @clear="casClear">

			</wux-cascader>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//     
				key: '搜索产品',
				TabCur: 0,
				scrollLeft: 0,
				itemNav: ["电容器", "滤波器", "功分器", "陶瓷介质基片"],
				context: getApp().globalData.context,
				// 电容器使用参数 	 
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
				visible: false,
				// 

				hkarray: ['高通滤波器', '带通滤波器', '低通滤波器'],
				hkindex: 0,

				//功分器
				jLTCArray: ['请选择','一路功分器', '二路功分器', '三路功分器'],
				jLTCIndex: 0,
				

			};
		},


		props: {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function(e) {
			var searchTab = getApp().globalData.searchType;
			let that = this;
			if (searchTab == 0) {
				that.setData({
					TabCur: 0,
				})			
			
				getApp().globalData.pdpar["searchType"] = 0;
				getApp().globalData.pdpartext["searchType"] =0;
				this.init();

			} else if (searchTab == 1) {
				this.setData({
					TabCur: 1,
				})
				this.init();
			} else if (searchTab == 2) {
				this.setData({
					TabCur: 2,
				})
				this.init();
			} else if (searchTab == 3) {
				// this.TabCur=3;
				this.setData({
					TabCur: 3,
				})
				this.init();
			}
		},
		methods: {
		
			// 
			keyInput: function(e) {
				var v = e.detail.value;
				this.text.key = v;
				getApp().globalData.pdpartext.key = v;
				getApp().globalData.pdpar.key = v;
			},
			init: function() {
				this.setData({
					text: getApp().globalData.pdpartext
				});
			},
			tapWaveFilter: function(e) {
				console.log(e);
				this.hkindex = e.detail.value;
			},
			tapJLTC:function(e){
				var  index=e.detail.value;
				
					this.jLTCIndex=index;
				
			},
			// tapWaveFilter:function(e){
			// 		console.log(e);
			// 		var  index=e.e.detail.index;
			// },



			search: function(e) {
				console.log("pdpar", getApp().globalData.pdpar);
				console.log("pdpartext", getApp().globalData.pdpartext);
				getApp().globalData.reSearchPd = true;
				uni.switchTab({
					url: '/pages/pdlist/pdlist'
				});
			},
			clear: function(e) {
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
			
			waveFilterSearch:function(e){
				console.log("pdpar", getApp().globalData.pdpar);
				console.log("pdpartext", getApp().globalData.pdpartext);
				getApp().globalData.reSearchPd = true;
				uni.switchTab({
					url: '/pages/pdlist/pdlist'
				});
				
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
			casClose: function() {
				this.setData({
					visible: false
				});
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
			tabSelect:function(e) {
				this.clear(); 
				var that=this;
				let tem=e.currentTarget.dataset.id
				that.TabCur=tem;
				console.log(tem);
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				// 				
			
				getApp().globalData.pdpar["searchType"] = tem;
				getApp().globalData.pdpartext["searchType"] =tem;
		
		
		
				this.setData({
					text: getApp().globalData.pdpartext
				});
				
				
			},
			// casOpen  从pd_param中获取参数
			getParam:function(e){
				uni.showToast({
					// title: '请稍等',
					icon: 'loading',
					duration: 10000,
					mask: true
				});
				var data={};
				data["searchType"]=this.TabCur;
				
				uni.request({
					url: this.context + '/pd/getParamByPd/'+this.TabCur,
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
			},
			
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {

		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},



		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},

	};
</script>
<style>
	@import "./search.css";
</style>
