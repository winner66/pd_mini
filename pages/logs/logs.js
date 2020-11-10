//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    nickName: "",
    avatarUrl: "",
    casArray: ['双眼皮', 'TBM', '隆胸', '减肥', '手动输入'],
    userName: '',
    mobile: '',
    Gender: 'female',
    casIndex: 0,
  },

  bindCasPickerChange: function (e) {
    console.log('乔丹选的是', this.data.casArray[e.detail.value])
    if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      casIndex: e.detail.value
    })

  },
  
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
