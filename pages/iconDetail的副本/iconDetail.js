// pages/iconDetail/iconDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: [],
    oriDate: [],
    selectDate: '请选择时间',
    one: [],
    two: [],
    three: [],
    four: [],
    five: [],
    six: [],
    seven: [],
    eight: [],
    nine: [],
    ten: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    switch (options.title) {
      case '我们承诺':
        
        break;
      case '预约学车':
        wx.request({
          url: 'http://champion.natapp1.cc/sell/weixin/paid',
          data:{
            openid:app.globalData.openid
          },
          success:function(res){
            if(res.data!=3){
              wx.showModal({
                title: '提示',
                content: "您还未报名缴费",
                complete:function(res){
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              })
            }
          },fail:function(res){
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
       
        break;
      case '常见问题':
       
        break;
      default:
        break;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  content: function (res) {
    var oriDate = this.data.oriDate
    var selectDate = ''
    selectDate = oriDate[res.target.id % 6 - 1]
    if (selectDate != undefined) {
      if (res.target.id > 5) {
        selectDate = selectDate + "下午"
      } else {
        selectDate = selectDate + "上午"
      }
    }
    this.setData({
      selectDate: selectDate
    })
  },
  book: function (res) {
    if (this.data.selectDate == undefined || this.data.selectDate == "请选择时间") {
    } else {
      var date = this.data.selectDate
      wx.request({
        url: 'http://champion.natapp1.cc/sell/weixin/book',
        data: {
          date: date,
          openid: app.globalData.openid
        }, success: function (res) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
        }
      })
    }
  },
  onReady: function () {
    var that = this
    wx.request({
      url: 'http://champion.natapp1.cc/sell/weixin/getDate',
      success: function (res) {
        that.setData({
          oriDate: res.data
        })
        //  console.log(res.data)
        var date = []
        date.push("日期/上下午")
        for (var i in res.data) {
          var weekday = res.data[i].slice(5, 12)
          date.push(weekday)
        }
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
      url: 'http://champion.natapp1.cc/sell/weixin/getBooked',
      success: function (res) {
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
          one: all[0],
          two: all[1],
          three: all[2],
          four: all[3],
          five: all[4],
          six: all[5],
          seven: all[6],
          eight: all[7],
          nine: all[8],
          ten: all[9]
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