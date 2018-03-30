// pages/modifyStage/modifyStage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stage: []
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
  newBook: function (res) {
    var userName = res.detail.value.userName;
    var userPhone = res.detail.value.userPhone;
    var stage = res.detail.value.stage;
    if (stage == '' || stage == undefined) {
      wx.showToast({
        title: '阶段为空',
        icon: "none"
      })
    }
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/modifyStage',
      data: {
        userPhone: userPhone,
        stage: stage
      }
      , success: function (res) {
        if (res.data.code == 0) {
         wx.showModal({
           title: '提示',
           content: '修改成功',
           complete:function(res){
             wx.navigateTo({
               url: '../bookManage/bookManage?data=2',
             })
           }
         })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.setNavigationBarTitle({
      title: '修改学车阶段',
    })
    wx.getStorage({
      key: 'userStage',
      success: function (res) {
        console.log(res.data)
        that.setData({
          stage: res.data
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