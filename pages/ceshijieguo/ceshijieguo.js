Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var psyrepid = options.psyrepid;
    var jzid = getApp().globalData.jiaozhengid;
    this.setData({
      psyrepid: psyrepid,
      jzid: jzid
    })
    wx.request({
      url: getApp().globalData.url + '/psyass/getPsyReport', //获取90道心理评估试题
      data: {
        psyrepid: psyrepid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = res.data;
         that.setData({
           bianhao: data.bianhao,
           jieguo:data.jieguo,
           jzname: data.jzname,
           time: data.time,
           yinzilist: data.yinzilist,
         })
      }
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