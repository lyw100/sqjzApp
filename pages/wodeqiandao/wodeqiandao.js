Page({

  /**
   * 页面的初始数据
   */
  data: {
    jrqdjc:false,
    qdy_hui:true,
    qdy_lan:false,
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