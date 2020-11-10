const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 用户查看产品（埋点）
function collect(data) {
  console.log('collect', data);
  wx.request({
    url: getApp().globalData.context + '/data/collect',
    data: data,
    method: 'POST',
    success(res) {
      // setTimeout(function () {
      // }, 1500);
    },
    fail(res) {},
    complete(res) {
      console.log('collect:', res);
    }
  })
}

function login(app, callback) {
  if (app == null) {
    app = getApp();
  }
  var token = wx.getStorageSync(app.globalData.tokenKey);
  if (!token) {
    console.log('no token，重新登录');
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: app.globalData.context + '/user/login',
            data: {
              wxcode: res.code
            },
            method: 'GET',
            success(res) {
              if (res.data.code == 200) {
                var token = res.data.data.token;
                console.log('登录成功, token', token);
                wx.setStorageSync(app.globalData.tokenKey, token);
                if (callback) {
                  callback();
                }
              } else {
                console.log('登录失败！' + res)
              }
            },
            fail(res) {},
            complete(res) {}
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail: function(res) {
        console.log('登录失败！' + res.errMsg)
      }
    })
  } else {
    console.log('有token，无需登录', token);
  }
}

function downloadAndShow(url, fileName) {
  wx.showToast({
    title: '文件读取中...',
    icon: 'loading',
    duration: 99999999,
    mask: true
  });

  var root = wx.env.USER_DATA_PATH + "/" + '__chk';
  var filePath = root + "/" + fileName;
  const FileSystemManager = wx.getFileSystemManager();
  FileSystemManager.access({
    path: filePath,
    success: function() {
      console.log("file exist, open", filePath);
      wx.openDocument({
        filePath: filePath,
        fail: function(res) {
          wx.showModal({
            content: '打开文件出错',
            showCancel: false,
          })
        },
        complete: function(res) {
          wx.hideToast();
        }
      })
    },
    fail: function() {
      FileSystemManager.mkdir({
        dirPath: root,
        recursive: true,
        complete: function() {
          //创建目录，开始下载
          wx.downloadFile({
            url: url,
            success: function(res) {
              //下载成功,转存文件
              console.log("download", res)
              var tempFilePath = res.tempFilePath;
              FileSystemManager.getFileInfo({
                filePath: tempFilePath,
                success: function(res) {
                  // var size = 10485760; //10*1024*1204;
                  var size = 10000000;
                  console.log("size", res.size);
                  if (res.size < size) {
                    FileSystemManager.saveFile({
                      tempFilePath: tempFilePath,
                      filePath: filePath,
                      success(res) {
                        console.log('success save :', res);
                        //转存完成，打开文件
                        console.log("openfile", filePath);
                        wx.openDocument({
                          filePath: filePath,
                          fail: function(res) {
                            wx.showModal({
                              content: '打开文件出错',
                              showCancel: false,
                            })
                          },
                          complete(res) {
                            wx.hideToast();
                          }
                        })
                      },
                      fail: function(res) {
                        wx.hideToast();
                      },
                      complete: function(res) {

                      },
                    });
                  } else {
                    wx.showModal({
                      content: '无法缓存大于10M的文件，点击确定直接浏览',
                      showCancel: false,
                    })
                    //文件大于10M，打开文件
                    console.log("openfile", tempFilePath);
                    wx.openDocument({
                      filePath: tempFilePath,
                      fail: function(res) {
                        wx.showModal({
                          content: '打开文件出错',
                          showCancel: false,
                        })
                      },
                      complete(res) {
                        wx.hideToast();
                      }
                    })
                  }
                }
              });
            },
            fail: function(res) {
              //下载失败
              console.log(res);
              wx.hideToast();
            },
            complete(res) {}
          })
        }
      })
    },
    complete: function(res) {
      console.log('', res);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  login: login,
  collect: collect,
  // das: downloadAndShow
}