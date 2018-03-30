// pages/bookManage/bookManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    users: [],
    showBooks: false,
    showUserStage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data = options.data
    if (data == 1) {
      that.setData({
        showBooks: true,
        showUserStage: false
      })
      wx.setNavigationBarTitle({
        title: '预约管理',
      })
    }
    if (data == 2) {
      wx.setNavigationBarTitle({
        title: '学车阶段管理',
      })
      wx.request({
        url: 'https://antcar.net.cn/sell/weixin/allUserWhoPaid',
        success: function (res) {
          that.setData({
            users: res.data,
            showBooks: false,
            showUserStage: true
          })
        }
      })
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
    var that = this
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/getBookedInfo',
      success: function (res) {
        that.setData({
          books: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  createBook: function (res) {
    wx.navigateTo({
      url: '../newBook/newBook?hasData=0',
    })
  },
  modify: function (res) {
    var that = this
    var info = res.currentTarget.dataset.modify
    wx.setStorage({
      key: 'hasData',
      data: info,
    })
    wx.navigateTo({
      url: '../newBook/newBook?hasData=1',
    })
  },
  modifyStage: function (res) {
    var that = this
    var info = res.currentTarget.dataset.modify
    wx.setStorage({
      key: 'userStage',
      data: info,
    })
    wx.navigateTo({
      url: '../modifyStage/modifyStage',
    })
  },
  deleteTime: function (res) {
    var that = this
    var openid = res.currentTarget.dataset.delete.userOpenid
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/deleteTime',
      data: {
        openid: openid
      }, success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        wx.request({
          url: 'https://antcar.net.cn/sell/weixin/getBookedInfo',
          success: function (res) {
            that.setData({
              books: res.data
            })
          }
        })
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