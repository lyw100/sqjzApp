Page({

  /**
   * 页面的初始数据
   */
  data: {
    yincangqdmk:true,
    shualiandl:false,
    jrqdjc:false,
    qdy_hui:false,
    qdy_lan: true,
    tjym_hui: true,
    tjym_lan:false,
    qd_yemian:true,
    th_yemian:false,
  },
  /**
   * 签到
   */
  djqd_ym:function(){
    this.setData({
      qdy_hui: false,
      qdy_lan: true,
      tjym_hui: true,
      tjym_lan: false,
      qd_yemian: true,
      th_yemian: false,
    })
  },
  /**
   * 统计
   */
  djtj_ym:function(){
    this.setData({
      qdy_hui: true,
      qdy_lan: false,
      tjym_hui: false,
      tjym_lan: true,
      qd_yemian: false,
      th_yemian: true,
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  myCatchTouch: function () {
    // console.log('stop user scroll it!');
    return;
  },
  /**
  * 点击刷脸签到
  */
  shualianqiandao:function(){
    this.setData({
      yincangqdmk: false,
      shualiandl: true,
    })
  },
  /**
  * 刷脸登录
  */
  takePhoto: function () {
    var that = this;
    clearTimeout(timer);//取消定时器
    clearInterval(interval);//取消计时器
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.showLoading({
          title: '正在核验身份.....',
        })
        // this.setData({ logindisabled: true });
        var header = getApp().globalData.header; //获取app.js中的请求头
        wx.uploadFile({
          url: getApp().globalData.url + '/course/face',
          filePath: res.tempImagePath,
          header: header,
          formData: {
            telephone: wx.getStorageSync("username")
          },
          name: 'file',
          success: (res) => {
            wx.hideLoading();
            var data = JSON.parse(res.data);
            if (data.msg == "OK") {
              this.setData({
                shualiandl: false,//是否展示刷脸窗口
                xianshi: false,
                face: true//验证通过
              });
              this.videoContext.play();//视频播放暂停

            } else {
              wx.showModal({
                title: '提示',
                content: data.msg,
                showCancel: false,
                success: function () {
                  that.clearProgress();//重新加载定时器
                }
              })
            }

          }
        })
      }
    })

    this.setData({
      yincangqdmk: true,
      shualiandl: false,
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