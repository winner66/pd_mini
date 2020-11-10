// pages/fpdSearch2/index.js
// 搜索国外产品对应的宏科产品（搜索页 search）
import { $wuxSelect } from '../../dist/index'
Page({
  data: {
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
    fpdValue:[],
    title3: '',

  },
  onClick3(e) {
    console.log(e);
    this.data.filterType=e.currentTarget.dataset.type;
    var selectOption=[{
      title: '画画',
      value: '1',
  },
  {
      title: '打球',
      value: '2',
  },
  {
      title: '唱歌',
      value: '3',
  },
  {
      title: '游泳',
      value: '4',
  },
  {
      title: '健身',
      value: '5',
  },
  {
      title: '睡觉',
      value: '6',
  },
    ];
    var title=e.currentTarget.dataset.title;
    $wuxSelect('#wux-select3').open({
        value: this.data.fpdValue[this.data.filterType],
        multiple: true,
        toolbar: {
            title: title+'(多选)',
            confirmText: '确认',
        },
        options: selectOption,
        onChange: (value, index, options) => {
            console.log('onChange', value, index, options)
            this.setData({
                value3: value,
                title3: index.map((n) => options[n].title),
            })
        },
        onConfirm: (value, index, options) => {
            console.log('onConfirm', value, index, options)

            let temFpdValue=this.data.fpdValue;
            temFpdValue[this.data.filterType]=value;
            this.setData({
                // value3: fpdvalue[this.data.filterType] ,
                title3: index.map((n) => options[n].title),
                fpdValue:temFpdValue,
            })
            

            
            getApp().globalData.fpdPdpar[this.data.filterType] = index.map((n) => options[n].title),
            console.log('pdpar',getApp().globalData.fpdPdpar);
            getApp().globalData.fpdPdpartext[this.data.filterType] = index.map((n) =>options[n].title).join(',');
            console.log('pdpartext',getApp().globalData.fpdPdpartext);
            console.log('value:',this.data.value3);
            this.setData({
              text: getApp().globalData.fpdPdpartext,             
            });
        },
      })
    },
  

  onShow: function () {
    this.init();
  },

  keyInput: function(e) {
    var v = e.detail.value;
    this.data.text.key = v;
    getApp().globalData.fpdPdpartext.key = v;
    getApp().globalData.fpdPdpar.key = v;
  },

  init: function() {
    this.setData({
      text: getApp().globalData.fpdPdpartext,
    })
  },

  search: function(e) {
    console.log("pdpar",getApp().globalData.fpdPdpar);
    console.log("pdpartext",getApp().globalData.fpdPdpartext);
    getApp().globalData.fpdReSearchPd = true;
    // wx.switchTab({
    //   url: '/pages/fpdPdList/index',
    // })

    wx.navigateTo({  
      url: '/pages/fpdPdList/index',
    })
  },

  clear: function(e) {
    var pdpar = getApp().globalData.fpdPdpar;
    for (let i in pdpar) {
      pdpar[i] = '';
    }
    var pdpartext = getApp().globalData.fpdPdpartext;
    for (let i in pdpartext) {
      pdpartext[i] = '';
    }
    this.init();
  },

  buildReq: function() {
    var data = {};
    var pdpar = getApp().globalData.fpdPdpar;
    for (let key in pdpar) {
      if ('key' == key){
        if (pdpar[key] && pdpar[key] != ''){
          data[key] = pdpar[key];
        }
      }else if (pdpar[key] && pdpar[key] != '') {
        data[key] = pdpar[key][pdpar[key].length - 1];
      }
    }
    return data;
  },

  casClose: function() {
    this.setData({
      visible: false
    });
  },

  casOpen: function(e) {
    wx.showToast({
      // title: '请稍等',
      icon: 'loading',
      duration: 10000,
      mask: true
    });
    console.log(e.currentTarget.dataset);
    var type = e.currentTarget.dataset.type;
    this.data.filterType = type;
    var data = this.buildReq();
    data.filterType = type;
    delete data[type];;
    var that = this;
    console.log(data);
    wx.request({
      url: this.data.context + '/pd/list-params',
            // url: this.data.context + '/pd/list-params-fpd',
      data: data,
      method: 'GET',
      success(res) {
        console.log('get-pd-class:', res.data.data);
        that.setData({
          options: res.data.data,
          value: getApp().globalData.fpdPdpar[that.data.filterType],
          title: e.currentTarget.dataset.title,
          visible: true,
        });
      },
      fail(res) {
        wx.hideToast();
        wx.showToast({
          title: '获取参数失败，请重新打开选择',
          icon: 'none',
          duration: 1500,
          mask: true
        });
      },
      complete(res) {
        wx.hideToast();
      }
    })
  },

  casChange(e) {
    this.setData({
      value: e.detail.value
    });
    var child = e.detail.options[e.detail.options.length - 1].children;
    if (child && child.length > 0) {
      return;
    }

    console.log('casChange', e.detail)
    getApp().globalData.fpdPdpar[this.data.filterType] = e.detail.value;
    console.log('pdpar',getApp().globalData.fpdPdpar);
    getApp().globalData.fpdPdpartext[this.data.filterType] = e.detail.options.map((n) => n.label).join('/');
    console.log('casChange',getApp().globalData.fpdPdpartext);
    this.setData({
      text: getApp().globalData.fpdPdpartext
    });

  },

  casClear(e){
    getApp().globalData.fpdPdpar[this.data.filterType] = '';
    getApp().globalData.fpdPdpartext[this.data.filterType] = '';
    this.setData({
      visible: false,
      text: getApp().globalData.fpdPdpartext
    });
  }
});