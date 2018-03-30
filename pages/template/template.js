// pages/template/template.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeOrder: [],
    nul: false,
    storeId:101
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userCategory = options.userCategory
    that.setData({
      storeId: userCategory
    })
    wx.showLoading({
      title: '分组中...',
    })
      wx.request({
        url: 'https://antcar.net.cn/sell/buyer/order/getOrderListByStoreId',
        data: {
          userCategory: userCategory
        }, success: function (res) {
          wx.hideLoading()
          that.setData({
            storeOrder: res.data.data
          })
          console.log(res)
          if (res.data.data.length == 0) {
            that.setData({
              nul: true
            })
          }
        }
      })
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