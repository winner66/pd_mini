const ApiRootUrl = 'http://127.0.0.1:9099';

module.exports = {
  
  CatalogList: ApiRootUrl + '/fpd/get-fpd-series',  //分类目录全部分类数据接口
  // CatalogCurrent: ApiRootUrl + 'catalog/current',  //分类目录当前分类数据接口
  fpdPdCount:ApiRootUrl+'/fpd/get-fpd-'

};