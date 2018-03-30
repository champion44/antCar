// pages/orderList/orderList.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    openid: '',
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  refund: function (res) {
    var that = this
    var refundOrderId = res.currentTarget.dataset.refund.orderId
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '正在退款',
    })
    wx.request({
      url: 'https://antcar.net.cn/sell/buyer/order/refund',
      data: {
        orderId: refundOrderId
      }, success: function (res) {
        if (res.data.code == 0) {
          wx.hideNavigationBarLoading();
          wx.hideLoading()
          wx.showModal({
            title: '退款成功',
            content: '具体到账时间依据微信',
          })

          var openid = that.data.openid
          wx.request({
            url: 'https://antcar.net.cn/sell/buyer/order/listType',
            data: {
              openid: openid
            },
            success: function (res) {
              console.log(res.data.data)
              that.setData({
                orderList: res.data.data
              })
            }
          })
        }
        // 如果返回吗不为0 
        else {
          wx.hideNavigationBarLoading()
          wx.hideLoading()
          console.log(res)
          wx.showModal({
            title: '发生错误',
            content: res.data.msg,
          })
        }
      }
    })
  },
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'userOpenId',
      success: function (res) {
        var openid = res.data
        that.setData({
          openid: openid
        })
        wx.showLoading({
          title: '加载中...',
        })
        wx.request({
          url: 'https://antcar.net.cn/sell/buyer/order/listType',
          data: {
            openid:openid
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.data.length == 0) {
              that.setData({
                noData: true
              })
            }
            wx.hideLoading()
            that.setData({
              orderList: res.data.data
            })
          }
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