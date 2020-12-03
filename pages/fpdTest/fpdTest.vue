<template>
	<view>
		<view class="container">
			<!-- 		<view class="catalog">
				<scroll-view class="nav" scroll-y="true">
					<block v-for="(item, index) in navList" :key="index">
						<view :data-id="item.id" :data-index="index" @tap="switchCate" class="'item'+currentCategory.id == item.id ? 'active' : ''">
							{{item.name}}
						</view>
					</block>
				
				</scroll-view>
				<scroll-view class="cate" scroll-y="true">

				</scroll-view>
			</view> -->
			<view class="catalog">
				<scroll-view class="nav" scroll-y="true">
					<!-- 	<view class="'item'+fpdindex==index ? 'active' : ''" v-for="(item, index) in navList"  data-id="item.value"
					 data-index="index" @tap="switchCate">{{item.label}}</view> -->
					<block v-for="(item, navindex) in navList" :key="navindex">
						<view :class="['item ',fpdindex==navindex ? 'active' : '']" @tap="switchCate" :data-id="item.value" :data-index="navindex">{{item.label}}
						</view>
					</block>

				</scroll-view>

				<scroll-view class="cate" scroll-y="true">

					<!-- 	<view class="hd">
						<text class="line"></text>
						<text class="leftTxt">{{navList[fpdindex].label}}厂对应的宏科系列</text>
						<text class="line"></text>
					</view> -->

					<view class="bd">
						<!-- 工厂系列 -->
						<block v-for="(item, index) in currentCategory" :key="index">

							<!-- 	<view :data-id="item.id" :data-index="index" @tap="switchCate" class="'item'+currentCategory.id == item.id ? 'active' : ''">
								{{item.name}}
							</view> -->
							<view class="hd">
								<text class="line"></text>
								<text class="leftTxt redTxt ">{{item.label}}系列：</text>
								<text class="line"></text>
							</view>

							<view class="cell_line">

						<!-- 		<navigator :url="'/pages/fpdSearch2/index?data='+hkitem+'&factory='+{{navList[fpdindex].label}}+'&series='+{{item.label}}" >
								
									<view class="weui-cell ">
										<view class="weui-cell__bd">
											<view class="weui-label">{{hkitem.label}}</view>
										</view>
										<view class="weui-cell__ft">
											<i-icon type="enter" size="24" color="#80848f"></i-icon>
										</view>
									</view>

								</navigator> -->
								
								<block :key="hkindex" v-for="(hkitem, hkindex) in item.children">
									<!-- :class="['item',(hkindex+1) % 3 == 0 ? 'last' : '']" -->
										<!-- <image class="icon" :src="hkitem.wap_banner_url"></image> -->
										<!-- <text class="txt">{{item.name}}</text> -->
										<!-- 	<view >
										<text class="hkName">{{hkitem.label}}</text>
										<text class="hkdes">描述信息</text>
									</view> -->
									<view class="weui-cell " @tap="hkChangeTap" :data-hkitem="hkitem" :data-series="item.label">
										<view class="weui-cell__bd">
											<view class="weui-label">{{hkitem.label}}</view>
										</view>
										<view class="weui-cell__ft">
											<i-icon type="enter" size="24" color="#80848f"></i-icon>
										</view>
									</view>
									
								</block>
							</view>

						</block>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	var util = require('../../utils/config/util.js');
	var api = require('../../utils/config/api.js');
	var deepCopy = require("../../utils/deepCopy.js"); 

	export default {
		data() {
			return {
				navList: [],
				categoryList: [],
				currentCategory: [],
				// 国外厂
				fpdindex: 0,
				fpdserindex: 0,

				scrollLeft: 0,
				scrollTop: 0,
				goodsCount: 0,
				scrollHeight: 0,
				fpdPdpartextfirst: {},
				fpdPdparfirst: {},
			}
		},

		onLoad: function(options) {
			this.getCatalog();
			var  tem=getApp().globalData.fpdPdpartext;
			var tem1=getApp().globalData.fpdPdpar;
			
			var fpdPdparfirst = deepCopy.baseClone(tem1);
			var fpdPdpartextfirst = deepCopy.baseClone(tem);
			uni.setStorage({
				key: "fpdPdparfirst",
				data: fpdPdparfirst,
				success() {
					console.log('fpdPdparfirst存储成功')
				}
			})		
			uni.setStorage({
				key: "fpdPdpartextfirst",
				data: fpdPdpartextfirst,
				success() {
					console.log('fpdPdpartextfirst存储成功')
				}
			})
			
		},
		methods: {
			getCatalog: function() {
				//CatalogList
				let that = this;
				wx.showLoading({
					title: '加载中...',
				});
				util.request(api.CatalogList).then(function(res) {

					that.setData({
						navList: res.data,
						currentCategory: res.data[0].children
					});
					wx.hideLoading();
				});
				// util.request(api.GoodsCount).then(function(res) {
				// 	that.setData({
				// 		goodsCount: res.data.goodsCount
				// 	});
				// });

			},
			getCurrentCategory: function(id) {
				console.log(id);
				let that = this;
				// util.request(api.CatalogCurrent, {
				// 		id: id
				// 	})
				// 	.then(function(res) {
				// 		that.setData({
				// 			currentCategory: res.data.currentCategory
				// 		});
				// 	});
			},
			getList: function() {
				var that = this;
				// util.request(api.ApiRootUrl + 'api/catalog/' + that.data.currentCategory.cat_id)
				// 	.then(function(res) {
				// 		that.setData({
				// 			categoryList: res.data,
				// 		});
				// 	});
			},
			switchCate: function(event) {
				// 更换厂
				var that = this;

				console.log(event.currentTarget.dataset);
				var currentTarget = event.currentTarget;
				if (this.fpdindex == event.currentTarget.dataset.index) {
					return false;
				}
				var index=event.currentTarget.dataset.index
				let tem = this.navList[index].children;
				that.setData({
					currentCategory: tem,
					fpdindex: index,
				});
				// this.getCurrentCategory(event.currentTarget.dataset);
			},
			hkChangeTap:function(e){
					
			
				console.log(e.currentTarget.dataset.hkitem);
				var data = e.currentTarget.dataset.hkitem.data;
				var tem = getApp().globalData.fpdPdpar;
			
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
				
				console.log('temText', temText);
				
				if (temText["key"] != null && temText["socStr"] != null && temText["key"] != '' && temText["socStr"] != '') {
				  temText["key"] = temText["key"] + "-" + temText["socStr"][0];
				}
				
				
				getApp().globalData.fpdPdpartext = temText;
				console.log(' temText', temText);
				console.log('data', getApp().globalData.options);
				
				var series=e.currentTarget.dataset.series;
				this.search(series);
				
			},
			search: function (series) {
			  // pages/search/search
			  getApp().globalData.fpdReSearchPd = true;
			  console.log("pdpartext", getApp().globalData.fpdPdpartext);
			  console.log("pdpar", getApp().globalData.fpdPdpar);
			   console.log("data", this);
			  // '/pages/fpdSearch2/index?data='+hkitem+'&factory='+{{navList[fpdindex].label}}+'&series='+{{item.label}}		
			  uni.navigateTo({
			    url: '/pages/fpdSearch2/index?factory='+this.navList[this.fpdindex].label+'&series='+series,
			  });
			},
		},
		onReady: function() {
			// 页面渲染完成
		},
		onShow: function() {
			// 页面显示
			uni.getStorage({
				key: 'fpdPdparfirst',
				success: res => {
					console.log('获取值')
				 this.fpdPdparfirst=res.data;
				}
			})
			uni.getStorage({
				key: 'fpdPdpartextfirst',
				success: res => {
					
				this.fpdPdpartextfirst=res.data;
				}
			})
			getApp().globalData.fpdPdpar = this.fpdPdparfirst;
			getApp().globalData.fpdPdpartext = this.fpdPdpartextfirst;
			
		
		},
		onHide: function() {
			// 页面隐藏
		},
		onUnload: function() {
			// 页面关闭
			uni.removeStorage({
				key: 'fpdPdparfirst',
				success: function() {
					console.log('fpdPdparfirst删除成功')
				}
			})
			// fpdPdpartextStart
			uni.removeStorage({
				key: 'fpdPdpartextfirst',
				success: function() {
					console.log('fpdPdpartextfirst删除成功')
				}
			})
			
		},
	};
</script>

<style>
	.container {
		background: #f9f9f9;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}


	.catalog {
		flex: 1;
		width: 100%;
		background: #fff;
		display: flex;
		border-top: 1px solid #fafafa;
	}

	.catalog .nav {
		width: 162rpx;
		height: 100%;
	}

	.catalog .nav .item {
		text-align: center;
		line-height: 90rpx;
		width: 162rpx;
		height: 90rpx;
		color: #333;
		font-size: 28rpx;
		border-left: 6rpx solid #fff;
	}

	.catalog .nav .item.active {
		color: #ab2b2b;
		font-size: 36rpx;
		border-left: 6rpx solid #ab2b2b;
	}

	.catalog .cate {
		border-left: 1px solid #fafafa;
		flex: 1;
		height: 100%;
		margin-top: 20rpx;
		padding: 0 30rpx 0 30rpx;
	}

	.banner {
		display: block;
		height: 222rpx;
		width: 100%;
		position: relative;
	}

	.banner .image {
		position: absolute;
		top: 30rpx;
		left: 0;
		border-radius: 4rpx;
		height: 192rpx;
		width: 100%;
	}

	.banner .txt {
		position: absolute;
		top: 30rpx;
		text-align: center;
		color: #fff;
		font-size: 28rpx;
		left: 0;
		height: 192rpx;
		line-height: 192rpx;
		width: 100%;
	}

	.catalog .hd {
		height: 20rpx;
		width: 100%;
		display: flex;
		justify-content: left;
		align-items: center;
	}

	.catalog .hd .txt {
		font-size: 24rpx;
		text-align: center;
		color: #333;
		padding: 0 10rpx;
		width: auto;
	}
	.catalog .hd  .redTxt{
		color: #AB2B2B;
	}

	.catalog .hd .line {
		width: 40rpx;
		height: 1px;
		background: #d9d9d9;
	}

	.catalog .bd {
		height: auto;
		width: 100%;
		overflow: hidden;
	}

	.catalog .bd .item {
		display: block;
		float: left;
		height: 216rpx;
		width: 144rpx;
		margin-right: 34rpx;
	}

	.catalog .bd .item.last {
		margin-right: 0;
	}

	.catalog .bd .item .icon {
		height: 144rpx;
		width: 144rpx;
	}

	.catalog .bd .item .txt {
		display: block;
		text-align: center;
		font-size: 24rpx;
		color: #333;
		height: 72rpx;
		width: 144rpx;
	}

	.catalog .bd .item .leftTxt {
		display: block;
		text-align: left;
		font-size: 28rpx;
		color: #333;
		height: 72rpx;
		width: 144rpx;
	}

	.catalog .bd .cell_line {

		border-color: #80848f;
		border-radius: 15rpx;
	}
	
</style>
