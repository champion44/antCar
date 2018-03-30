// pages/newStore/newStore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeItem: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 判断是修改还是新增
    var flag = options.new
    switch (flag) {
      case '0':
        //修改
        wx.setNavigationBarTitle({
          title: '修改商家信息',
        })
        wx.getStorage({
          key: 'storeItem',
          success: function (res) {
            console.log(res)
            that.setData({
              storeItem: res.data
            })
          },
        })
        break;
      case '1':
        wx.setNavigationBarTitle({
          title: '新增商家信息',
        })
        //新增
        break;
      default:
        break;
    }
  },

  newStore: function (res) {
    wx.showNavigationBarLoading()
    var delFlag = res.detail.value.delFlag
    var discount = res.detail.value.discount
    var storeName = res.detail.value.storeName
    var storePic = res.detail.value.storePic
    var storeSubtitle = res.detail.value.storeSubtitle
    var storeAdd = res.detail.value.storeAdd
    var storeId = res.detail.value.storeId
    var storeTel = res.detail.value.storeTel
    var storeTime = res.detail.value.storeTime
    var storeLocation = res.detail.value.storeLocation

    wx.request({
      url: 'https://antcar.net.cn/sell/buyer/product/saveStore',
      data: {
        discount: discount,
        storeName: storeName,
        storePic: storePic,
        storeSubtitle: storeSubtitle,
        storeAdd: storeAdd,
        storeId: storeId,
        delFlag: delFlag,
        storeTime: storeTime,
        storeTel:storeTel,
        storeLocation: storeLocation
      }, success: function (res) {
        wx.hideNavigationBarLoading()
        if (res.data.code == 0) {
          wx.showModal({
            title: '提示',
            content: '成功',
            complete:function(res){
              wx.navigateTo({
                url: '../adminChoose/adminChoose?id=' + 1,
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg
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