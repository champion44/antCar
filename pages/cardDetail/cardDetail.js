// pages/cardDetail/cardDetail.js
const app = getApp()
var utilMd5 = require('../../utils/md5.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNo: '',
    last:'',
    star:'****',
    first:'',
    vip: 0,
    firstGet:0,
    expire:0
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
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'userOpenId',
      success: function (res) {
        wx.request({
          url: 'https://antcar.net.cn/sell/weixin/card',
          data: {
            openid: res.data
          }, success: function (res) {
            console.log(res.data.data)
            var first = res.data.data.cardNum.slice(0, 4) ;
            var last =res.data.data.cardNum.slice(15, 19)
            that.setData({
              cardNo: res.data.data.cardNum,
              first: first,
              last: last,
              vip: res.data.data.vip,
            })
            if (res.data.data.expire == 0 || res.data.data.firstGet == 0 || res.data.data.expire == 1){
              that.setData({
                firstGet: res.data.data.firstGet,
                expire: res.data.data.expire
              })
            }else{
              that.setData({
                firstGet: util.formatDate(res.data.data.firstGet),
                expire: util.formatDate(res.data.data.expire)
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
goToHome:function(res){
  console.log(res)
  wx.switchTab({
    url: '../index/index',
  })
},
goToCharge:function(res){
  wx.showModal({
    title: '提示',
    content: '您将通过微信支付¥99激活卡片',
    success:function(res){
      if(res.cancel){
      wx.showToast({
        title: '取消充值',
      })
      }
      if(res.confirm){
        var that = this
       // var amount = 99;
       var amount = 0.99
        var openid = app.globalData.openid
        console.log(app.globalData.purePhone)
        var storeId = "198";
        wx.request({
          url: 'https://antcar.net.cn/sell/weixin/pay',
          data: {
            openId: openid,
            amount: amount,
            storeId: storeId,
            ip: app.globalData.clientIP,
            phone: app.globalData.purePhone
          }, success: function (res) {
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
                console.log("支付成功")
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
      }
    }
  })
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