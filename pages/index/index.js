//index.js
//获取应用实例
var utilMd5 = require('../../utils/md5.js');
const app = getApp()
var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    stage: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    adPic: [{ adPicUrl: "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/indexBanner/4.jpg" }, { adPicUrl: "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/indexBanner/5.jpg" }, { adPicUrl: "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/indexBanner/6.jpg" }],
    location: '成都理工大学',
    icons: [{ iconPath: '/images/4icon/promise.png', iconTitle: '我们承诺' }, { iconPath: '/images/4icon/schedual.png', iconTitle: '预约学车' }, { iconPath: '/images/4icon/notice.png', iconTitle: '学车须知' }, { iconPath: '/images/4icon/question.png', iconTitle: '常见问题' }],
    // { iconPath: 'iconfont icon-jiediandengdai', iconTitle: '观望' },
    schedual: [{ iconPath: 'iconfont icon-agreementpenm', iconTitle: '协议' }, { iconPath: 'iconfont icon-sifakaoshi', iconTitle: '科目一' }, { iconPath: 'iconfont icon-jiaoche', iconTitle: '科目二' }, { iconPath: 'iconfont icon-daoluzhifache', iconTitle: '科目三' }, { iconPath: 'iconfont icon-zuoyejindu', iconTitle: '科目四' }, { iconPath: 'iconfont icon-icon-test', iconTitle: '拿证' }],
    articles: [{
      articleTitle: "便宜没好货-学车也一样", readNum: 402, articlePic: "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/contentPics/article-cheap.png", contentPics: [
  "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/contentPics/article-cheap-inner.png"]
    }, {
        articleTitle: "大学学车的优势", readNum: 143, articlePic: "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/contentPics/article-advantage.png", contentPics: [
          "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/contentPics/article-advantage-inner.png"]
    }, {
        articleTitle: "强有力的后备资源", readNum: 629, articlePic: "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/contentPics/article-team.png", contentPics: [
          "https://antcar-1256058998.cos.ap-guangzhou.myqcloud.com/contentPics/article-team-inner.png"]
    }]
  },
  iconDetail: function (res) {
    wx.navigateTo({
      url: '../iconDetail/iconDetail?title=' + res.currentTarget.id,
    })
  },
  getPhoneNumber: function (e) {
    wx.getStorage({
      key: 'session',
      // 用session解密微信返回数据
      success: function (res) {
        var session_key = res.data
        var AppId = 'wx975b8fb14fbbef20'
        var pc = new WXBizDataCrypt(AppId, session_key)
        var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
        console.log(data.purePhoneNumber)
        app.globalData.purePhone = data.purePhoneNumber
        wx.setStorage({
          key: 'phone',
          data: data.purePhoneNumber,
        })
        wx.navigateTo({
          url: '../form/form',
        })
      },fail:function(res){
        wx.showModal({
          title: '提示',
          content: '获取session失败',
        })
      }
    })
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      // wx.getStorage({
      //   key: 'phone',
      //   success: function (res) {

      //   },
      //   fail: function (res) {
      //     wx.showToast({
      //       title: '手机号获取失败',
      //     })
      //   }
      // })
    }
  },
  onShow: function (res) {
    var that = this
    wx.getStorage({
      key: 'userOpenId',
      success: function (res) {
        wx.request({
          url: 'https://antcar.net.cn/sell/weixin/stage',
          data: {
            openid: res.data
          }, success(res) {
            that.setData({
              stage: res.data
            })
          }, fail: function (res) {
            wx.showModal({
              title: "错误",
              content: res.data,
            })
          }
        })
      },
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  goToArticle: function (id) {
    var articleTitle = id.currentTarget.id;
    var that = this;
    var contentPics = id.currentTarget.dataset.pic;
    wx.setStorage({
      key: 'contentPics',
      data: contentPics,
      success: function () {
        wx.navigateTo({
          url: "../article/article?articleTitle=" + articleTitle,
        })
      },
      fail: function (res) {
        console.log("fail to create storage!!!so can not go to the page of article content.")
      }
    })
  },
  onShareAppMessage: function () {

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
