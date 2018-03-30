// pages/newBook/newBook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    up: "",
    down: "",
    name: "",
    phone: "",
    selectTime: "通过下方按钮选择"
  },
  newBook: function (res) {
    var userName = res.detail.value.userName;
    var userPhone = res.detail.value.userPhone;
    var bookedTime = res.detail.value.bookedTime;
    if (bookedTime == "通过下方按钮选择") {
      wx.showToast({
        title: '请选择时间',
        icon: "none"
      })
    } else {
      wx.request({
        url: 'https://antcar.net.cn/sell/weixin/bookByTrench',
        data: {
          userName: userName,
          userPhone: userPhone,
          bookedTime: bookedTime
        }, success: function (res) {
          if (res.data.code == 0) {
            wx.showModal({
              title: '提示',
              content: '成功',
              complete: function (res) {
                wx.navigateTo({
                  url: '../bookManage/bookManage?data=1',
                })
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '新增学员预约',
    })
    var hasData = options.hasData
    if (hasData == 1) {
      wx.setNavigationBarTitle({
        title: '修改学员预约',
      })
      wx.getStorage({
        key: 'hasData',
        success: function (res) {
          console.log(res)
          that.setData({
            name: res.data.userName,
            phone: res.data.userPhone,
            selectTime: res.data.bookDate
          })
        },
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
  clicked: function (res) {
    var that = this
    console.log(res.currentTarget.id)
    that.setData({
      selectTime: res.currentTarget.id
    })
  },
  onShow: function () {
    var that = this
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/getDate',
      success: function (res) {
        var date = res.data[0]
        that.setData({
          up: date + '上午',
          down: date + "下午"
        })
      }
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