<script>
var util = require("./utils/util.js");

export default {
  onLaunch: function () {
    var that = this;
    util.login(that);
    uni.getSystemInfo({
      success: function (res) {
        that.globalData.platform = res.platform;
      }
    }); // updateApp();  
  },
  globalData: {
    updateApp: function () {
      if (!uni.canIUse('getUpdateManager')) {
        return;
      }

      const updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          uni.showLoading({
            title: '更新下载中...'
          });
        }
      });
      updateManager.onUpdateReady(function () {
        uni.hideLoading();
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          }
        });
      });
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
        uni.hideLoading();
        uni.showToast({
          title: '下载失败...',
          icon: "none"
        });
      });
    },
    platform: 'ios',
    flushOrder: true,
    tokenKey: 'chk_token',
    reSearchPd: false,
    //新方式搜索参数值
    pdpar: {
      clzqa: []
    },
    //新方式搜索参数文本
    pdpartext: {
      clzqa: []
    },
    // 国外产品对应  宏科产品全局变量
    fpdReSearchPd: false,
    //新方式搜索参数值
    fpdPdpar: {
      clzqa: []
    },
    //新方式搜索参数文本
    fpdPdpartext: {
      clzqa: []
    },
    // 选择某系列后-国外产品参数选项
    options: {},
	// 搜索标签
	// searchTab:0,
	searchType:0,
    //每次发布需检查域名和appid
    // context: 'https://pd.chinahongke.com',
    // context: 'http://116.62.26.69:9099',
    // context: 'http://118.31.120.41:9099',
    // context: 'http://192.168.1.12:9099',
    context: 'http://127.0.0.1:9099' ,
	//online: appid: wx82252aab6c844393
    //32 "appid": "wx36363735ab5c2820",
    //36 "appid": "wx5a447e4dc9a74601",
    // {
    //       "pagePath": "pages/index/index",
    //       "iconPath": "/images/m-icon-1-1.png",
    //       "selectedIconPath": "/images/m-icon-1-2.png",
    //       "text": "首页"
    //     },

  },
  methods: {}
};
</script>
<style>
@import "./app.css";
</style>