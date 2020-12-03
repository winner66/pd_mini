const FileSystemManager = uni.getFileSystemManager();
const RootPath = uni.env.USER_DATA_PATH + '/' + '__chk' + "/";
const Max_Size = 10400000; //10*1024*1204=10485760

function initRootPath() {
  try {
    FileSystemManager.accessSync(RootPath);
  } catch (e) {
    try {
      FileSystemManager.mkdirSync(RootPath, true);
    } catch (e) {
      console.log('创建根目录出错', e);
    }
  }
}

function getFreeSpace() {
  var size = 0;
  var files = FileSystemManager.readdirSync(RootPath);

  for (var i = 0; i < files.length; i++) {
    size += files[i].size; //有问题
  }

  return Max_Size - size;
}

function openFile(file) {
  uni.openDocument({
    filePath: file,
    fail: function (res) {
      uni.showModal({
        content: '打开文件出错',
        showCancel: false
      });
    },
    complete: function (res) {
      uni.hideToast();
    }
  });
}

function clearAll() {
  //maybe asyn
  var files = FileSystemManager.readdirSync(RootPath);
  console.log("files", files);

  for (let i = 0, len = files.length; i < len; i++) {
    var filePath = RootPath + files[i];
    FileSystemManager.removeSavedFile({
      filePath: filePath,
      success: function (res) {
        console.log("delete success", res);
      },
      fail: function (res) {
        console.log("delete fail", res);
      }
    });
  }
}

function saveFile(tempFilePath, filePath) {
  var savedFilePath = FileSystemManager.saveFileSync(tempFilePath, filePath);
  return savedFilePath;
}

function das(url, localFile) {
  localFile = RootPath + localFile;
  uni.showToast({
    title: '文件读取中...',
    icon: 'loading',
    duration: 30000,
    mask: true
  });

  try {
    console.log(FileSystemManager.readdirSync(RootPath));
    FileSystemManager.accessSync(localFile);
    uni.openDocument({
      filePath: localFile,
      complete: function (res) {
        uni.hideToast();
      }
    });
  } catch (e) {
    doDas(url, localFile);
  }
}

function doDas(url, localFiel) {
  uni.downloadFile({
    url: url,
    success: function (res) {
      //下载成功
      console.log("download", res);
      var tempFilePath = res.tempFilePath;
      FileSystemManager.getFileInfo({
        filePath: tempFilePath,
        success: function (res) {
          try {
            var free = getFreeSpace();
            console.log("size", res.size);

            if (res.size < Max_Size) {
              //是否需要转存
              if (localFiel) {
                if (res.size > free) {
                  clearAll();
                }

                var savedFilePath;

                try {
                  savedFilePath = saveFile(tempFilePath, localFiel);
                } catch (e) {
                  openFile(tempFilePath);
                  return;
                }

                openFile(savedFilePath);
              } else {
                openFile(tempFilePath);
              }
            } else {
              uni.hideToast();
              uni.showModal({
                content: '无法打开大于10M的文件',
                showCancel: false
              });
            }
          } catch (e) {
            console.log(e);
            uni.hideToast();
            uni.showModal({
              content: '打开文件出错, 请重试',
              showCancel: false
            });
          }
        },
        fail: function (res) {
          uni.hideToast();
          uni.showModal({
            content: '获取文件信息出错',
            showCancel: false
          });
        }
      });
    },
    fail: function (res) {
      //下载失败
      console.log(res);
      uni.hideToast();
      uni.showModal({
        content: '下载文件出错',
        showCancel: false
      });
    },

    complete(res) {}

  });
}

module.exports = {
  initRootPath: initRootPath,
  das: das,
  clearAll: clearAll
};