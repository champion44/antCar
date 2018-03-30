// pages/form/form.js
var utilMd5 = require('../../utils/md5.js');
const app = getApp()
var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js'); Page({
  data: {
    hasError: false,
    errorMsg: '',
    phone: '',
    oriPhone: '',
    paid: 0,
    add:"",
    multiArray: [],
    multiIndex: [0, 0, 0]
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = this.data.multiIndex
    console.log(data)
    data[e.detail.column] = e.detail.value;
    console.log(data)
    this.setData({
      multiIndex: data
    })
  },
  bindMultiPickerChange: function (e) {
    var index = this.data.multiIndex
    var add = ""
    add = this.data.multiArray[0][index[0]] + " " + this.data.multiArray[1][index[1]] + this.data.multiArray[2][index[2]]
    console.log(add)
    this.setData({
      add:add
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
wx.request({
  url: 'https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/dormitoryInfo.json',
  success:function(res){
    console.log("服务器的寝室json",res)
    that.setData({
      multiArray:res.data
    })
  }
})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  pay: function (res) {
    wx.showLoading({
      title: '请求中...',
    })
    var that = this
    var name = res.detail.value.name
    var add = that.data.add
    var stuNum = res.detail.value.stuNum
    var phone = that.data.oriPhone
    console.log("获取用户地址",that.data.add)
    if (name == "" || name == undefined) {
      wx.hideLoading()
      that.setData({
        hasError: true,
        errorMsg: "姓名不能为空"
      })
    } else if (stuNum == "" || stuNum == undefined) {
      wx.hideLoading()
      that.setData({
        hasError: true,
        errorMsg: "学号不能为空"
      })
    } else if (add == "" || add == undefined) {
      wx.hideLoading()
      that.setData({
        hasError: true,
        errorMsg: "地址不能为空"
      })
    }
    else {
      that.setData({
        hasError: false,
        errorMsg: ""
      })
      wx.getStorage({
        key: 'userOpenId',
        success: function (res) {
          wx.request({
            url: 'https://antcar.net.cn/sell/buyer/order/record',
            data: {
              phone: phone,
              name: name,
              add: add,
              openid: res.data,
              studentCode: stuNum
            },
            success: function (res) {
              if (res.data.code == 0) {
                //开始支付
                var openid = res.data.data.userOpenid
                var amount = 1;
                var storeId = "200";
                wx.request({
                  url: 'https://antcar.net.cn/sell/weixin/pay',
                  data: {
                    openId: openid,
                    amount: amount,
                    storeId: storeId,
                    ip: app.globalData.clientIP,
                    phone: phone
                  }, success: function (res) {
                    //发起支付
                    wx.hideLoading()
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
                        console.log("支付成功")
                        that.setData({
                          paid: 2
                        })
                      }, fail: function (res) {
                        console.log("支付失败")
                        wx.showToast({
                          title: '取消支付',
                        })
                      },
                      complete: function (res) {
                        console.log("complete")
                      }
                    })

                  }, fail: function (res) {

                  }, complete: function (res) {
wx.hideLoading()
                  }
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                })
              }
            }
          })
        }, fail: function (res) { console.log("get openidStorage err", res) }
      })
    }
  },
  goToHome:function(res){
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  payTheRest: function (res) {
    wx.showLoading({
      title: '请求中...',
    })
    var that = this
    var amount = 0.56
    //var amount = 2680
    var openid = app.globalData.openid
    var storeId = "199";
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/pay',
      data: {
        openId: openid,
        amount: amount,
        storeId: storeId,
        ip: app.globalData.clientIP,
        phone: that.data.oriPhone
      }, success: function (res) {
        //发起支付
        console.log(res)
        if (res.data.returnMsg != 'OK'){
          wx.showModal({
            title: '提示',
            content: res.data.returnMsg,
          })
        }
        var timestamp = new Date().getTime();
        var timeStamp = timestamp.toString();
        var nonceStr = res.data.nonceStr;
        var appId = res.data.appid
        var pack = 'prepay_id=' + res.data.prepayId;
        var paySign = utilMd5.hexMD5("appId=wx975b8fb14fbbef20&nonceStr=" + nonceStr + "&package=" + pack + "&signType=MD5&timeStamp=" + timestamp + "&key=38822AF10564CD4ECD56CDD322F9FE3D").toUpperCase();
        wx.hideLoading()
        wx.requestPayment({
          appId: appId,
          timeStamp: timeStamp,
          nonceStr: nonceStr,
          package: pack,
          signType: 'MD5',
          paySign: paySign,
          success: function (res) {
            console.log("支付成功")
            that.setData({
              paid: 3
            })
          }, fail: function (res) {
            console.log("支付失败")
            wx.showToast({
              title: '支付失败',
            })
          },
          complete: function (res) {
            console.log("complete")
          }
        })
      }, fail: function (res) {
        wx.showModal({
          title: '错误',
          content: res.data,
        })
      }
    })
  },
  onShow: function () {
    var that = this
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/paid',
      data: {
        openid: app.globalData.openid
      }, success: function (res) {
        if (res.data == 100) {
          wx.showToast({
            title: '状态失败',
          })
        } else {
          that.setData({
            paid: res.data
          })
        }
      }
    })
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        var phone = res.data.slice(0, 3) + '****' + res.data.slice(7, 12)
        that.setData({
          phone: phone,
          oriPhone: res.data
        })
      },
    })
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