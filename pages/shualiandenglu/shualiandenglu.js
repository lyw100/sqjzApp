Page({
  scanQRCode: function () {
    wx.switchTab({
      url: '../zhuye/zhuye',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  takePhoto: function () {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
        wx.showLoading({
          title: '正在核验身份.....',
        })
        this.setData({ logindisabled: true });
        var header = getApp().globalData.header; //获取app.js中的请求头
        wx.uploadFile({
          url: getApp().globalData.url + '/weChat/user/face',
          filePath: res.tempImagePath,
          header: header,
          formData: {
            telephone: wx.getStorageSync("username"),
            password: wx.getStorageSync("password")
          },
          name: 'file',
          success: (res) => {
            wx.hideLoading();
            var data = JSON.parse(res.data);
            if (data.msg == "OK") {
              getApp().globalData.jiaozhengid =  data.jzid;
              wx.switchTab({
                url: '../zhuye/zhuye',
              })
            } else {
              wx.showModal({
                title: '提示',
                content: data.msg,
                showCancel: false
              })
            }

          }
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  // switch1change: function (e) {
  //   console.log(e)
  //   if (e.detail.value) {
  //     this.setData({ value: 'back' })
  //   } else {
  //     this.setData({ value: 'front' })
  //   }
  // },
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