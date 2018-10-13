var RSAUtil = require("../../utils/RSA.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"15555555551",
    password:"555551"
  },
  userNameInput:function(e){
    this.setData({
      username: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  scanQRCode: function () {
   // var header = getApp().globalData.header; //获取app.js中的请求头
<<<<<<< HEAD
    let pw = RSAUtil.encryptedString(RSAUtil.getRasKey(), password)
=======
>>>>>>> master
    wx.request({
      url: getApp().globalData.url + '/weChat/user/login', //仅为示例，并非真实的接口地址
      data: {
        telephone: this.data.username,
        password: this.data.password
      },
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data)
        if(res.data.msg=="OK"){
            getApp().globalData.header.Cookie = 'JSESSIONID=' + res.data.sessionId;
          wx.navigateTo({
            url: '../shualiandenglu/shualiandenglu',
          })
        }
      }
    })
   
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