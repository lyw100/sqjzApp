Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    qkch:false,
    zhuyesousuo:true,
    ssnrjieguo:false,
    djjg: false,
    xuankeShow:true,
    yixuanShow:false,
    zcfgym:true,
    ddjy:false,
    sxjkjyym:false
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
  xzkc:function(){
    this.setData({
      xuankeShow: false,
      yixuanShow: true
    })
  },
  yiyuankecheng: function () {
    this.setData({
      xuankeShow: true,
      yixuanShow: false
    })
  },

   /**
   * 政策法规 tab 页切换
   */
  zcfganniu:function(){
    this.setData({
      zcfgym: true,
      ddjy: false,
      sxjkjyym: false,
    })
  },
  ddwhanniu: function () {
    this.setData({
      zcfgym: false,
      ddjy: true,
      sxjkjyym: false,
    })
  },

  sxjkjyanniu: function () {
    this.setData({
      zcfgym: false,
      ddjy: false,
      sxjkjyym: true,
    })
  },
  /**
   * 跳转到播放页面
   */
  tzbfyemain:function(){
    wx.navigateTo({
      url: '../shouyebofang/shouyebofang',
    });
  },

  /**
   * 点击搜索主页面内容跳转结果页面
   */
  tzsouzuojieguoym: function () {
    this.setData({
      qkch: true,
      zhuyesousuo: false,
      ssnrjieguo: false,
      djjg: true,
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