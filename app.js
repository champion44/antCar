//app.js
App({
  onLaunch: function () {
    // 登录
    wx.setEnableDebug({
      enableDebug: true
    })
    wx.login({
      success: res => {
        var that = this
        console.log("用户code为", res)
        wx.request({
          url: 'https://antcar.net.cn/sell/weixin/auth',
          data: {
            code: res.code
          },
          fail: function () {
            wx.showToast({
              title: '打开调试',
            })
          },
          success(res) {
            //把session存起来用于解码手机号
            console.log("openid为", res.data.openid)
            that.globalData.openid = res.data.openid
            console.log(that.globalData.openid )
            wx.setStorage({
              key: 'session',
              data: res.data.session_key,
            })
            //openid确定用户身份
            wx.setStorage({
              key: 'userOpenId',
              data: res.data.openid,
            })
          }, complete: function (res) {
            // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      console.log("获取用户信息", res)
                      // 可以将 res 发送给后台解码出 unionId
                      that.globalData.userInfo = res.userInfo
                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (this.userInfoReadyCallback) {
                        this.userInfoReadyCallback(res)
                      }
                    }
                  })
                } else {
                  wx.getUserInfo({
                    success: res => {
                      //第一进来
                      console.log("首次登陆")
                      var gender = res.userInfo.gender
                      var wxName = res.userInfo.nickName
                      var avatarUrl = res.userInfo.avatarUrl
                      wx.getStorage({
                        key: 'userOpenId',
                        success: function (res) {
                          wx.request({
                            url: 'https://antcar.net.cn/sell/buyer/order/firstIn',
                            data: {
                              openid: res.data,
                              gender: gender,
                              wxName: wxName,
                              avatarUrl: avatarUrl
                            }
                          })
                          wx.showModal({
                            title: '提示',
                            content: '您的信息已记录',
                          })
                          console.log("您的信息已记录")
                        }, fail: function (res) {
                          wx.showModal({
                            title: '错误',
                            content: 'openid没有准备好',
                          })
                        }
                      })
                      that.globalData.userInfo = res.userInfo
                    }, fail: function (res) {
                      wx.showModal({
                        title: '提示',
                        content: '您未授权,将限制功能.重新授权？',
                        success: res => {
                          if (res.confirm) {
                            wx.getSetting({
                              success: res => {
                                if (!res.authSetting['scope.userInfo']) {
                                  wx.openSetting({
                                    success: res => {
                                      if (!res.authSetting['scope.userInfo']) {
                                        wx.showToast({
                                          title: '您再次取消',
                                        })
                                      }
                                      if (res.authSetting['scope.userInfo']) {
                                        wx.getUserInfo({
                                          success: res => {
                                            that.globalData.userInfo = res.userInfo
                                            var gender = res.userInfo.gender
                                            var wxName = res.userInfo.nickName
                                            var avatarUrl = res.userInfo.avatarUrl
                                            wx.getStorage({
                                              key: 'userOpenId',
                                              success: function (res) {
                                                wx.request({
                                                  url: 'https://antcar.net.cn/sell/buyer/order/firstIn',
                                                  data: {
                                                    openid: res.data,
                                                    gender: gender,
                                                    wxName: wxName,
                                                    avatarUrl: avatarUrl
                                                  }
                                                })
                                              },
                                            })
                                          }
                                        })
                                      }
                                    }
                                  })
                                }
                              }
                            })
                          } else if (res.cancel) {
                            wx.showToast({
                              title: '您再次取消',
                            })
                          }
                        }
                      })
                    }
                  })
                }
              },
              fail: res => {
                console.log("fail", res)
              }
            })
          }//auth complete
        })
      }
    })
    //获取IP 存入全局
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/getIP',
      success: res => {
        console.log("ip为", res)
        this.globalData.clientIP = res.data.query
      }
    })
  },//onLaunch
  globalData: {
    userInfo: "",
    clientIP: "",
    openid: "",
    purePhone: ''
  }
})