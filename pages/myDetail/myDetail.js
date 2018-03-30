// pages/myDetail/myDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
pic:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    switch (options.id) {
      case 'protocol':
      wx.setNavigationBarTitle({
        title: '学车协议',
      })
      that.setData({
        pic:'https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/my/protocol.jpeg'
      })
        break;
      case 'about':
        wx.setNavigationBarTitle({
          title: '关于我们',
        })
        that.setData({
          pic: 'https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/my/about.jpeg'
        })
        break;
      case 'contact':
        wx.setNavigationBarTitle({
          title: '联系驾校',
        })
        that.setData({
          pic: 'https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/my/contact.jpeg'
        })
        break;
    }
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