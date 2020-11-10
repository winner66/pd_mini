const Max_Size = 10400000; //10*1024*1204=10485760

function initRootPath() {
  //nothing...
}

function openFile(file) {
  wx.openDocument({
    filePath: file,
    fail: function(res) {
      console.log(res);
      hitErr('打开文件出错-6');
    },
    complete: function(res) {
      wx.hideToast();
    }
  })
}

function clear() {
  clearStorage();
  wx.getSavedFileList({
    success: function(res) {
      for (let i = 0; i < res.fileList.length; i++) {
        var file = res.fileList[i].filePath;
        wx.removeSavedFile({
          filePath: file,
          success:function(res){
            console.log("remove file", file);
          }
        })
      }
    },
    fail: function(res) {
      console.log(res);
    }
  });
}

function getKey(url) {
  return "__file__" + url;
}

function clearStorage() {
  const res = wx.getStorageInfoSync();
  for (let i = 0; i < res.keys.length; i++) {
    if (res.keys[i].indexOf("__file__") == 0) {
      console.log("remove key", res.keys[i]);
      wx.removeStorageSync(res.keys[i]);
    }
  }
}

function open(url) {
  var key = getKey(url);
  wx.showToast({
    title: '请稍等...',
    icon: 'loading',
    duration: 30000,
    mask: true
  });
  var file = wx.getStorageSync(key);
  if (file) {
    console.log('有缓存文件,直接打开', url + "--" + file);
    wx.openDocument({
      filePath: file,
      success:function(){
        wx.hideToast();
      },
      fail: function() {
        das(url, key);
      },
      complete: function(res) {
      }
    })
  } else {
    das(url, key);
  }
}

function sas(tempFilePath, key) {
  console.log('转存并打开', tempFilePath);
  wx.saveFile({
    tempFilePath: tempFilePath,
    success: function(res) {
      wx.setStorageSync(key, res.savedFilePath);
      openFile(res.savedFilePath);
    },
    fail: function(res) {
      //总空间小于10M也报错。。。这里清空缓存再尝试打开
      console.log(res);
      if (res.errMsg == "saveFile:fail exceeded the maximum size of the file storage limit 10M"){
        wx.getSavedFileList({
          success: function (res) {
            console.log('转存失败，先清空缓存')
            for (let i = 0; i < res.fileList.length; i++) {
              var file = res.fileList[i].filePath;
              wx.removeSavedFile({
                filePath: file,
                success: function (res) {
                  console.log("remove file", file);
                }
              })
            }
            console.log('先清空缓存后转存', tempFilePath)
            wx.saveFile({
              tempFilePath: tempFilePath,
              success: function (res) {
                wx.setStorageSync(key, res.savedFilePath);
                openFile(res.savedFilePath);
              },
              fail: function (res) {
                console.log('二次转存失败，尝试直接打开');
                openFile(tempFilePath);
              }
            })
          },
          fail: function (res) {
            console.log(res);
            hitErr('打开文件出错-1-1');
          }
        });
      }else{
        hitErr('打开文件出错-5');
      }
    }
  })
}

function hitErr(err){
  wx.hideToast();
  wx.showModal({
    content: err,
    showCancel: false,
  })
}

function das(url, key) {
  console.log('下载并打开', url);
  wx.downloadFile({
    url: url,
    success: function(res) {
      //下载成功
      console.log("download", res)
      var tempFilePath = res.tempFilePath;
      wx.getFileInfo({
        filePath: tempFilePath,
        success: function(res) {
          var fileSize = res.size;
          if (fileSize < Max_Size) {
            //检查空间大小
            wx.getSavedFileList({
              success: function(res) {
                var size = fileSize;
                for (let i = 0; i < res.fileList.length; i++) {
                  size += res.fileList[i].size;
                }
                if (size >= Max_Size) {
                  console.log('存储空间不够，清空存储孔空间');
                  //清除缓存
                  clearStorage();
                  wx.getSavedFileList({
                    success: function(res) {
                      for (let i = 0; i < res.fileList.length; i++) {
                        var file = res.fileList[i].filePath;
                        wx.removeSavedFile({
                          filePath: file,
                          success: function (res) {
                            console.log("remove file", file);
                          }
                        })
                      }
                      //保持和打开
                      sas(tempFilePath,key);
                    },
                    fail: function(res) {
                      console.log(res);
                      hitErr('打开文件出错-1');
                    }
                  });
                } else {                  
                  sas(tempFilePath, key);
                }
              },
              fail: function(res) {
                console.log(res);
                hitErr('打开文件出错-2');
              }
            });
          } else {
            // wx.hideToast();
            // wx.showModal({
            //   content: '无法打开大于10M的文件',
            //   showCancel: false,
            // })
            console.log('文件太大,不转存直接打开')
            wx.setStorageSync(key, tempFilePath);
            openFile(tempFilePath);
          }
        },
        fail: function(res) {
          console.log(res);
          hitErr('打开文件出错-3');
        }
      });
    },
    fail: function(res) {
      //下载失败
      console.log(res);
      hitErr('打开文件出错-3');
    },
    complete(res) {
      
    }
  })
}

module.exports = {
  open: open,
  clear: clear,
};