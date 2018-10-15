Page({
   /**
   * 页面的初始数据
   */
  data: {
    qkch:false,
    zhuyesousuo:false,
    ssnrjieguo:false,
    djjg: true,
  },
  shouyebof: function () {
    wx.navigateTo({
      url: '../shouyebofang/shouyebofang',
    });
  },
  iptchufa:function(e){
    var vale=e.value
    if(vale ==""){
      qkch: false
    }
    this.setData({
      qkch: true,
      zhuyesousuo: false,
      ssnrjieguo:true,
      djjg: false,
    })
  },
  ssjieguo:function(){
    this.setData({
      qkch: false,
      zhuyesousuo: false,
      ssnrjieguo:false,
      djjg:true,
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