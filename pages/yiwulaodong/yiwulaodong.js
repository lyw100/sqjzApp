Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiala_dwyc:false,
    wode_xsyc:true,
    wode_xsychui:false,
    wode_jzyc:false,
    wode_jzychui:true,
  },
  // 点击全部
  quanbudj:function(){
    this.setData({
      xiala_dwyc: true,
    });
  },
  laodongdj: function () {
    this.setData({
      xiala_dwyc: false,
    });
  },
  // 点击内容
  jz_dj:function(){
    this.setData({
      wode_xsyc: false,
      wode_xsychui: true,
      wode_jzyc: true,
      wode_jzychui: false,
    });
  },
  wode_hui: function () {
    this.setData({
      wode_xsyc: true,
      wode_xsychui: false,
      wode_jzyc: false,
      wode_jzychui: true,
    });
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