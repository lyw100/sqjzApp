Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    ksxq_timu:true,
    ksxq_datk:false,
  },

  datika_dj:function(){
    this.setData({
      ksxq_timu: false,
      ksxq_datk: true,
    })
  },
  /**点击未选的答案返回主页面 */
  fhdtk_dt:function(){
    this.setData({
      ksxq_timu: true,
      ksxq_datk: false,
    })
  },
  jiaojjieguo:function(){
      wx.showModal({
        content: '确定要交卷吗',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../kaoshijieguo/kaoshijieguo',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
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