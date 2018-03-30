Page({
  data: {
    banner: ["https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/indexBanner/1.jpg", "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/indexBanner/2.jpg", "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/indexBanner/3.jpg"], stores: []
  },
  goToStoreDetail: function (id) {
    wx.setStorage({
      key: 'storeDetail',
      data: id.currentTarget.dataset.item,
      success: function () {
        wx.navigateTo({
          url: "../storeDetail/storeDetail"
        })
      }
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
  onShow: function () {
    var that = this
    wx.showLoading({
      title: '正在拉取...',
    })
    wx.request({
      url: 'https://antcar.net.cn/sell/buyer/product/storeList',
      success: function (res) {
        wx.hideLoading()
        that.setData({
          stores: res.data.data
        })
      }
    })
  },
  apply:function(res){
    wx.navigateTo({
      url: '../card/card',
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