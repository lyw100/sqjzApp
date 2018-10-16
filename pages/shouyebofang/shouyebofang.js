Page({
  gengduotj: function () {
    wx.navigateTo({
      url: '../gengduotuijian/gengduotuijian',
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    xuankeShow:true,
    yixuanShow:false

  },
  xzkc: function (event) {
    this.setData({
      xuankeShow: false,
      yixuanShow: true
    })
  },
  yiyuankecheng: function (event) {
    this.setData({
      xuankeShow: true,
      yixuanShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.setData({
      courseid:options.courseid,
      type:options.type
    })

    wx.request({
      url: 'http://47.92.224.59:8080/SQJZ/course/getRecord', //请求当月已选课程地址
      data: {
        courseid: options.courseid,
        type: options.type},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          record: res.data
        })
      }
    })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
    wx.setStorageSync('lastTime', '3600')
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

  },



 /**
 * 开始播放时执行的方法
 */
  bindPlay: function () {
    this.videoContext.requestFullScreen();//执行全屏方法
  },
  /**
   * 暂停的方法
   */
  bindPause: function () {
    this.videoContext.pause()
  },
  /**
   * 全屏的方法
   */
  bindFullscreenchange: function (e) {
    var isfull = e.detail.fullScreen;
    if (!isfull) {
      this.videoContext.pause()
    }
  },
  //视频播放出错的方法
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  //防拖拽方法
  bindTimeupdate: function (e) {
    //console.log(e.detail)
    var currentTime = parseInt(wx.getStorageSync('lastTime'));
    var lastTime = e.detail.currentTime
    if (lastTime - currentTime > 3) {
      this.videoContext.seek(currentTime)
      wx.setStorageSync('lastTime', currentTime)
    } else {
      wx.setStorageSync('lastTime', lastTime)
    }
    //console.log(currentTime+'==='+lastTime);
  }
})