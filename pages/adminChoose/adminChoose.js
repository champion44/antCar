// pages/adminChoose/adminChoose.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeList: [],
    showStore: false,
    userList: [],
    showUser: false,
    orderList: [],
    showOrder: false,
    allUsers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id
    console.log(id)
    switch (id) {
      case '1':
        wx.setNavigationBarTitle({
          title: '商户列表',
        })
        //用户点击商户列表
        wx.request({
          url: 'https://antcar.net.cn/sell/buyer/product/allStoreList',
          success: function (res) {
            console.log(res)
            that.setData({
              storeList: res.data.data,
              showStore: true,
              showUser: false,
              showOrder: false
            })
          }
        })
        break;
      case '2':
        wx.setNavigationBarTitle({
          title: '用户列表',
        })
        //用户列表
        wx.request({
          url: 'https://antcar.net.cn/sell/weixin/allUsers',
          success: function (res) {
            console.log(res.data)
            that.setData({
              allUsers: res.data,
              showStore: false,
              showUser: true,
              showOrder: false
            })
          }
        })
        break;
      case '3':
        wx.setNavigationBarTitle({
          title: '订单列表-已支付',
        })
        wx.showLoading({
          title: '加载中...',
        })
        wx.request({
          url: 'https://antcar.net.cn/sell/buyer/order/paidOrderList',
          success: function (res) {
            wx.hideLoading()
            that.setData({
              orderList: res.data.data,
              showStore: false,
              showUser: false,
              showOrder: true
            })
          }
        })
        break;
      default:
        break;
    }
  },
  paid: function (res) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.setNavigationBarTitle({
      title: '订单列表-已支付',
    })
    var that = this
    wx.request({
      url: 'https://antcar.net.cn/sell/buyer/order/paidOrderList',
      success: function (res) {
        wx.hideLoading()
        that.setData({
          orderList: res.data.data,
          showStore: false,
          showUser: false,
          showOrder: true
        })
      }
    })
  },
  refunded: function (res) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.setNavigationBarTitle({
      title: '订单列表-已退款',
    })
    var that = this
    wx.request({
      url: 'https://antcar.net.cn/sell/buyer/order/refundOrderList',
      success: function (res) {
        wx.hideLoading()
        that.setData({
          orderList: res.data.data,
          showStore: false,
          showUser: false,
          showOrder: true
        })
      }
    })
  },
  modifyUser: function (res) {
    var user = res.currentTarget.dataset.user
    wx.setStorage({
      key: 'user',
      data: user,
    })
    wx.navigateTo({
      url: '../modifyUser/modifyUser',
    })
  },
  modify: function (res) {
    var item = res.currentTarget.dataset.modify
    wx.setStorage({
      key: 'storeItem',
      data: item,
    })
    // 修改
    wx.navigateTo({
      url: '../newStore/newStore?new=0',
    })
  },
  createStore: function (res) {
    // 新增
    wx.navigateTo({
      url: '../newStore/newStore?new=1',
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