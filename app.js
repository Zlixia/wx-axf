let api = require('/utils/api.js')
App({
  onLaunch(){
    //读取保存在本地的用户信息
    let userinfo = wx.getStorageSync('userinfo')
    console.log(userinfo)
  },
  globalData:{
    //保存的是合并后的商品数据
    computedCategories: [],
    products: [],
    //购物车中的数据
    carts:[]
  },

  //获取分类数据和商品数据
  getComputedCategories(cb){
    //加载前
    wx.showLoading({
      title: '加载中...',
    })
    let categories = []
    let products = []
    this.fetch(api.host + '/categories')
      .then(res => {
        console.log(res)
        categories = res
        return this.fetch(api.host + '/products')
      })
      .then(res => {
        products = res
        for (let i = 0; i < products.length; i++) {
          for (let j = 0; j < categories.length; j++) {
            // 找到商品相对应的分类
            if (categories[j].id === products[i].categoryId) {
              categories[j].products.push(products[i])
            }
          }
        }
        this.globalData.computedCategories = categories
        cb(categories)
        //加载完后
        wx.hideLoading()
      })
  },

  /* 
   * 封装的请求方法
   * @param string method 请求的方法
   * @param object data   请求携带的数据
   */
  fetch(url, method = "get", data = {}) {
    //异步转同步 
    return new Promise(function (resolve,reject) {
      wx.request({
        url: url,
        method: method,
        data: data,
        //加header 是解决后台请求时拿不到数据的问题
        header: {
          'content-type': 'application/json'//默认值
        },
        success: res => {
          resolve(res.data)
        },
        fail: res => {
          reject("请求失败")
        }
      })
    })
  }
})