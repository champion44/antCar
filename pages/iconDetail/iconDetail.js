// pages/iconDetail/iconDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic:'',
    showPic:false,
    showOrderPage:false,
    date: [],
    oriDate: [],
    bookedTime: '暂未预约',
    cancel: false,
    selectDate: '请选择时间',
    up: [],
    down: [],
    upNum:'',
    downNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/getSingleBookedTime',
      data: {
        openid: app.globalData.openid
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        if (res.data.code == 0) {
          if (res.data.data.booked == 1) {
            that.setData({
              bookedTime: res.data.data.bookDate,
              cancel: true
            })
          }
        }
      }
    })
    wx.setNavigationBarTitle({
      title: options.title,
    })
    switch (options.title) {
      case '我们承诺':
      that.setData({
        showPic:true,
        showOrderPage:false,pic:'https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/4iconsPic/pic1.png'
      })
        break;
      case '预约学车':
        wx.request({
          url: 'https://antcar.net.cn/sell/weixin/paid',
          data: {
            openid: app.globalData.openid
          },
          success: function (res) {
            if (res.data != 3) {
              wx.showModal({
                title: '提示',
                content: "您还未报名缴费",
                complete: function (res) {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              })
            }else{
              that.setData({
                showPic: false,
                showOrderPage: true,
              })
            }
          }, fail: function (res) {
            wx.showModal({
              title: '提示',
              content: '发生错误',
              complete: function (res) {
                wx.switchTab({
                  url: '../index/index',
                })
              }
            })

          }
        })
        break;
      case '学车须知':
        that.setData({
          showPic: true,
          showOrderPage: false, pic: 'https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/4iconsPic/pic3.png'
        })
        break;
      case '常见问题':
        that.setData({
          showPic: true,
          showOrderPage: false, pic: 'https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/4iconsPic/pic4.png'
        })
        break;
      default:
        break;
    }
  },
  cancelBook: function (res) {
    var that = this
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/cancelBook',
      data: {
        openid: app.globalData.openid
      }, success: function (res) {
        wx.request({
          url: 'https://antcar.net.cn/sell/weixin/getBooked',
          success: function (res) {
            that.setData({
              upNum: res.data[0],
              downNum: res.data[1]
            })
            var all = []
            for (var j = 0; j < res.data.length; j++) {
              var name = []
              for (var i = 0; i < 4; i++) {
                if (i < res.data[j]) {
                  var oCar = {
                    index: i
                  }
                } else {
                  var oCar = {
                    index: 9
                  }
                }
                name.push(oCar)
              }
              all.push(name)
            }
            that.setData({
              up: all[0],
              down: all[1]
            })
          }
        })
        if (res.data.code == 0) {
          that.setData({
            cancel: false,
            bookedTime: '暂未预约'
          })
        }
        if (res.data.code == 1) {
          wx.showToast({
            title: '用户不存在',
            icon: "none"
          })
        }
      }
    })
  },

  book: function (res) {
    var that = this
    if (this.data.selectDate == undefined || this.data.selectDate == "请选择时间") {
    wx.showToast({
      title: '请选择时间',
    })
    } else {
      var date = that.data.selectDate
      wx.request({
        url: 'https://antcar.net.cn/sell/weixin/book',
        data: {
          date: date,
          openid: app.globalData.openid
        }, success: function (res) {
          wx.request({
            url: 'https://antcar.net.cn/sell/weixin/getBooked',
            success: function (res) {
              that.setData({
                upNum: res.data[0],
                downNum: res.data[1]
              })
              var all = []
              for (var j = 0; j < res.data.length; j++) {
                var name = []
                for (var i = 0; i < 4; i++) {
                  if (i < res.data[j]) {
                    var oCar = {
                      index: i
                    }
                  } else {
                    var oCar = {
                      index: 9
                    }
                  }
                  name.push(oCar)
                }
                all.push(name)
              }
              that.setData({
                up: all[0],
                down: all[1]
              })
            }
          })
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
          that.setData({
            cancel: true,
            bookedTime: date
          })
        }
      })
    }
  },
  onReady: function () {
    var that = this
    var date = []
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/getDate',
      success: function (res) {
        date.push("日期/上下午")
        date.push(res.data[0])
        that.setData({
          date: date
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: 'https://antcar.net.cn/sell/weixin/getBooked',
      success: function (res) {
       that.setData({
         upNum:res.data[0],
         downNum:res.data[1]
       })
        var all = []
        for (var j = 0; j < res.data.length; j++) {
          var name = []
          for (var i = 0; i < 4; i++) {
            if (i < res.data[j]) {
              var oCar = {
                index: i
              }
            } else {
              var oCar = {
                index: 9
              }
            }
            name.push(oCar)
          }
          all.push(name)
        }
        that.setData({
          up: all[0],
          down: all[1]
        })
      }
    })
  },
  select: function (res) {
    var id = res.currentTarget.id
    var that = this
    var selectDate = that.data.date[1]
    switch (id) {
      case '0':
        selectDate = selectDate + '上午'
        if (that.data.upNum==4) {
          wx.showModal({
            title: '提示',
            content: '预约已满',
          })
          that.setData({
            selectDate: '请选择时间'
          })
        }else{
        that.setData({
          selectDate: selectDate
        })
        }
        break;
      case '1':
        selectDate = selectDate + '下午'
        if (that.data.downNum == 4) {
          wx.showModal({
            title: '提示',
            content: '预约已满',
          })
          that.setData({
            selectDate: '请选择时间'
          })
        }else{
        that.setData({
          selectDate: selectDate
        })
        }
        break;
      default:
        break;
    }
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