// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    userCategory:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  myDetail:function(res){
    wx.navigateTo({
      url: '../myDetail/myDetail?id=' + res.currentTarget.id,
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
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    })
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/getUserCategory',
      data:{
        openid: app.globalData.openid
      },success:function(res){
        // 当查询状态码正确时更新用户类别 默认为0 普通用户 0普通用户 1管理员 2驾校
        if(res.statusCode==200){
          that.setData({
            userCategory:res.data
          })
        }
      }
    })
    //console.log(that.data.userCategory)
  },
  dial: function (res) {
    wx.makePhoneCall({
      phoneNumber: '15682036702',
    })
  },
  goToOrderList:function(res){
    wx.navigateTo({
      url: '../orderList/orderList',
    })
  },
  imschool:function(res){
    wx.navigateTo({
      url: '../school/school?userCategory=' + this.data.userCategory,
    })
  },
  bookManage:function(res){
      wx.navigateTo({
        url: '../bookManage/bookManage?data=1',
      })
  },
  studentManage:function(res){
    wx.navigateTo({
      url: '../bookManage/bookManage?data=2',
    })
  },
  imboss:function(res){
  wx.navigateTo({
    url: '../template/template?userCategory=' + this.data.userCategory,
  })
  },
  imadmin:function(res){
    wx.navigateTo({
      url: '../admin/admin',
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