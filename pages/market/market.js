// pages/market/market.js
var app = getApp()
let api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //分类和商品数据
    computedCategories:[],
    //激活的大分类,保存的是分类的小标
    activeCategory: 0,
    //激活的标题
    activeCid: '全部分类',
    // 激活的子分类的下标,默认为all为全部分类
    activeCidIndex: 'all',
    //控制全部分类的标题显示或隐藏
    allCategories: false,
    //排序的类型
    sortList: ['综合排序', '价格最高', '价格最低'],
    //默认排序的是 综合排序
    sortType: '综合排序',
    //控制排序列表的显示或隐藏，默认隐藏
    sortSh: false,
    //减和数量的显示和隐藏,默认隐藏
    actionBol: true,
    //控制蒙版显示和隐藏
    mengbanBol:true,
    //激活的商品
    activeProducts: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let computedCategories = app.globalData.computedCategories
    if (computedCategories.length > 0) {
      this.setData({
        computedCategories: computedCategories
      })
      this.changeActiveProducts()
    } else {
      //调用app里面的getComputedCategories方法
      app.getComputedCategories(computedCategories => {
        this.setData({
          computedCategories: computedCategories
        })
        this.changeActiveProducts()
      })
    }
  },
  //更改激活的分类
  changeActiveProducts() {
    // 激活的分类下标
    let activeCategory = this.data.activeCategory
    // 所有的商品数据
    let computedCategories = this.data.computedCategories
    // 根据激活的分类下标返回激活分类对应商品数据
    let activeProducts = computedCategories[activeCategory].products
    // 根据全部分类的值进行过滤(值为all不过滤)
    // 激活的子分类下标
    let activeCidIndex = this.data.activeCidIndex
    if (activeCidIndex !== 'all') {
      activeProducts = activeProducts.filter(item => item.cidsId === Number(activeCidIndex))
    }

    // 根据激活的排序方式进行排序
    let sortType = this.data.sortType
    if (sortType === '价格最低') {
      activeProducts = activeProducts.slice(0).sort((a, b) => a.price - b.price)
    } else if (sortType === '价格最高') {
      activeProducts = activeProducts.slice(0).sort((a, b) => b.price - a.price)
    }
    this.setData({
      activeProducts: activeProducts
    })
  },
  //改变激活的分类
  changeActiveCategory (event) {
  //拿到传过来的index
    let index = event.currentTarget.dataset.index
    this.setData({
      activeCategory: index,
      activeCid: '全部分类',
      activeCidIndex:'all'
    })
    this.changeActiveProducts()
  },
  //改变激活的全部分类标题
  changeActiveCid (event) {
    let name = event.currentTarget.dataset.name
    let index = event.currentTarget.dataset.index
    this.setData({
      activeCidIndex: index,
      activeCid: name,
      allCategories: false,
      mengbanBol: true
    })
    this.changeActiveProducts()
  },
  //全部分类的显示和隐藏
  changeAllCategories () {
    let allCategories = this.data.allCategories
    this.setData({
      allCategories: !allCategories,
      sortSh:false,
      mengbanBol: allCategories
    })
  },
  //控制排序列表的显示或隐藏
  changeSortSh () {
    let sortSh = this.data.sortSh
    this.setData({
      sortSh: !sortSh,
      allCategories: false,
      mengbanBol: sortSh
    })
  },
  //激活排序的类型
  changeSortType (event) {
    let item = event.currentTarget.dataset.item
    this.setData({
      sortType: item,
      sortSh: false,
      mengbanBol: true
    })
    this.changeActiveProducts()
  }
})