// pages/storeDetail/storeDetail.js
var utilMd5 = require('../../utils/md5.js');
var app = getApp()
var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeDetail: {},
    vip: 0,
    cardNum: '',
    amount: ''
  },
  now: function (res) {
    wx.navigateTo({
      url: '../card/card',
    })
  },
  getWifi: function (res) {
    var wifi = res.currentTarget.id
    var arr = wifi.split(',')
    arr[0]='名字:'+arr[0]
    arr[1]='密码:'+arr[1]
    var info = arr.join("\n")
    console.log(arr)
    wx.showModal({
      title: 'wifi信息',
      content: info,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  view: function (res) {
    wx.navigateTo({
      url: '../cardDetail/cardDetail',
    })
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/hasCard',
      data: {
        openid: app.globalData.openid
      }, success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            vip: res.data.data.vip,
            cardNum: res.data.data.cardNum
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
        }
      }
    })
    wx.getStorage({
      key: 'storeDetail',
      success: function (res) {
        that.setData({
          storeDetail: res.data
        })
        //  console.log(res.data)
        wx.setNavigationBarTitle({
          title: res.data.storeName,
        })
      },
    })
  },
  /*
  获取用户手机 唤起支付
  */
  dial: function (res) {
    var tel = res.currentTarget.id
    wx.makePhoneCall({
      phoneNumber: tel,
    })
  },
  pay: function (res) {
    var amount = res.detail.value.Amount

    wx.getStorage({
      key: 'storeDetail',
      success: function (res) {
        var storeId = res.data.storeId
        wx.getStorage({
          key: 'userOpenId',
          success: function (res) {
            var openId = res.data
            //
            wx.request({
              url: 'https://antcar.net.cn/sell/weixin/pay',
              data: {
                openId: openId,
                amount: amount,
                storeId: storeId,
                ip: app.globalData.clientIP,
                phone: app.globalData.purePhone
              },
              success: function (res) {
                //发起支付
                console.log(res)
                var timestamp = new Date().getTime();
                var timeStamp = timestamp.toString();
                var nonceStr = res.data.nonceStr;
                var appId = res.data.appid
                var pack = 'prepay_id=' + res.data.prepayId;
                var paySign = utilMd5.hexMD5("appId=wx975b8fb14fbbef20&nonceStr=" + nonceStr + "&package=" + pack + "&signType=MD5&timeStamp=" + timestamp + "&key=38822AF10564CD4ECD56CDD322F9FE3D").toUpperCase();
                wx.requestPayment({
                  appId: appId,
                  timeStamp: timeStamp,
                  nonceStr: nonceStr,
                  package: pack,
                  signType: 'MD5',
                  paySign: paySign,
                  success: function (res) {
                    console.log("succ")
                    console.log(res)
                  }, fail: function (res) {
                    console.log("fail")
                    wx.showToast({
                      title: '用户取消',
                    })
                  },
                  complete: function (res) {
                    console.log("complete")
                    console.log(res)
                  }
                })

              }
            })
            //pay
          }

        })
      },
    })

  },
  bindconfirm: function (e) {
    this.setData({
      amount: e.detail.value
    })
  },
  getPhoneNumber: function (e) {
    var amount = this.data.amount
    wx.getStorage({
      key: 'session',
      // 用session解密微信返回数据
      success: function (res) {
        var session_key = res.data
        var AppId = 'wx975b8fb14fbbef20'
        var pc = new WXBizDataCrypt(AppId, session_key)
        var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
        console.log(data.purePhoneNumber)
        app.globalData.purePhone = data.purePhoneNumber
        wx.setStorage({
          key: 'phone',
          data: data.purePhoneNumber,
        })
      },
    })
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权'
      })
    } else {
      wx.getStorage({
        key: 'storeDetail',
        success: function (res) {
          var storeId = res.data.storeId
          wx.request({
            url: 'https://antcar.net.cn/sell/weixin/pay',
            data: {
              openId: app.globalData.openid,
              amount: amount,
              storeId: storeId,
              ip: app.globalData.clientIP,
              phone: app.globalData.purePhone
            },
            success: function (res) {
              //发起支付
              if (res.data.status == 500) {
                wx.showModal({
                  title: '提示',
                  content: res.data.message,
                })
              }
              var timestamp = new Date().getTime();
              var timeStamp = timestamp.toString();
              var nonceStr = res.data.nonceStr;
              var appId = res.data.appid
              var pack = 'prepay_id=' + res.data.prepayId;
              var paySign = utilMd5.hexMD5("appId=wx975b8fb14fbbef20&nonceStr=" + nonceStr + "&package=" + pack + "&signType=MD5&timeStamp=" + timestamp + "&key=38822AF10564CD4ECD56CDD322F9FE3D").toUpperCase();
              wx.requestPayment({
                appId: appId,
                timeStamp: timeStamp,
                nonceStr: nonceStr,
                package: pack,
                signType: 'MD5',
                paySign: paySign,
                success: function (res) {
                  console.log("succ")
                  console.log(res)
                }, fail: function (res) {
                  console.log("fail")
                  wx.showToast({
                    title: '取消支付',
                  })
                },
                complete: function (res) {
                  console.log("complete")
                  console.log(res)
                }
              })

            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})