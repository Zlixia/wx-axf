var app = getApp()
let api = require('../../utils/api.js')
Page({
  data: {
    categories: [],
    bannar: [],
    products:[]
  },
  onLoad(){
    wx.request({
      url: api.host + '/bannar',
      success: res => {
        this.setData({
          bannar: res.data
        })
      }
    })
    this.setData({
      categories: app.globalData.categories,
      products: app.globalData.products,
    })
  },

})