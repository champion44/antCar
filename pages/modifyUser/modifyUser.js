const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  user:[]
  },
  modifyUser:function(res){
  var userName = res.detail.value.userName
  var userPhone = res.detail.value.userPhone
  var userOpenid = res.detail.value.userOpenid
  var vip = res.detail.value.vip
  var paid = res.detail.value.paid
  var userNum = res.detail.value.userNum
  var userCategory = res.detail.value.userCategory
   wx.request({
     url: 'https://antcar.net.cn/sell/weixin/modifyUser',
     data:{
       userName: userName,
       userOpenid: userOpenid,
       userPhone: userPhone,
       vip:vip,
       paid:paid,
       userCategory: userCategory,
       userNum: userNum,
       opraterOpenid:app.globalData.openid
     },success:function(res){
     if(res.data.code==0){
       wx.showModal({
         title: '提示',
         content: '修改成功',
         complete:function(res){
           wx.navigateTo({
             url: '../adminChoose/adminChoose?id=2',
           })
         }
       })
     }else{
       wx.showModal({
         title: '提示',
         content: res.data.msg,
       })
     }
     }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  wx.setNavigationBarTitle({
    title: '用户详情',
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
    var that = this
  wx.getStorage({
    key: 'user',
    success: function(res) {
      console.log(res.data)
     that.setData({
      user: res.data
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