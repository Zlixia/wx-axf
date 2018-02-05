var app = getApp()
let api = require('../../utils/api.js')
Page({
  data: {
    computedCategories: [],
    bannar: [],
    products:[]
  },
  onLoad(){
    let computedCategories = app.globalData.computedCategories
    if (computedCategories.length > 0) {
      this.setData({
        computedCategories: computedCategories
      })
    } else {
      //调用app里面的getComputedCategories方法
      app.getComputedCategories(computedCategories => {
        this.setData({
          computedCategories: computedCategories
        })
      })
    }
    app.fetch(api.host + '/bannar')
      .then(res => {
        this.setData({
          bannar: res
        })
      })
    
  },

})