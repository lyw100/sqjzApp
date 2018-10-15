Page({
  tzbfy:function(){
    wx.navigateTo({
      url: '../shouyebofang/shouyebofang',
    })
  },
  onSousuo:function(){
    wx.navigateTo({
      url: '../sousuo/sousuo',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    shipinShow: true,
    tuwenShow:false,
    yuyinShow: false,
  },

  shipin:function(){
   this.setData({
      shipinShow: true,
      tuwenShow : false,
      yuyinShow : false,
   })
  },
  tuwen: function () {
    this.setData({
      shipinShow: false,
      tuwenShow: true,
      yuyinShow: false,
    })
  },
  yuyin: function () {
    this.setData({
      shipinShow: false,
      tuwenShow: false,
      yuyinShow: true,
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