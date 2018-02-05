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
    },1000)
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
      //判断用户输入的电话号码在数据库中是否存在
      app.fetch(api.host + '/users?phone=' + phone)
        .then(res => {
          console.log(res)
          if (res.length > 0) {
            //证明在数据库中该用户存在
            //登录成功

          } else {
            //数据库中没有该用户，就让该用户注册
            let userObj = {
              phone: phone,
              // 初始化所选地址
              select_site: {}
            }
            //发送请求注册(就是把该用户的信息添加到数据库和本地中)
            app.fetch(api.host + '/users', 'post', userObj)
              .then(res => {
                console.log(res)
                //把该用户注册成功后的数据存入本地
                return new Promise(function (resolve,reject) {
                  wx.getStorage({
                    key:'userInfo',
                    data: JSON.stringify(res),
                    success () {
                      return resolve()
                    }
                  })
                })
              })
          }
        })
        //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
        .then(() => {
          //登录成功后跳转到首页
          wx.switchTab({
            url: '/pages/index/index',
          })
        })
    }
  }
})