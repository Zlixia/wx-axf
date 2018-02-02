// pages/login/login.js
const app = getApp()
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制显示隐藏
    picHide: false,
    phone: ''
  },
  // 聚焦时的状态
  picHidefocus () {
    this.setData({
      picHide: true
    })
  },
  // 失焦时的状态
  picHideBlue() {
    setTimeout(() => {
      this.setData({
        picHide: false
      })
    }, 1000)
  },
  //获取每次输入的input值
  changeInput (event) {
    //console.log(event)
    let phone = event.detail.value
    this.setData({
      phone: phone
    })
  },
  //登录操作
  login () {
    let phone = this.data.phone
    let reg = /^1[34578]\d{9}$/g
    //验证
    if (reg.test(phone)) {
      //验证通过
      
    }
  }
})