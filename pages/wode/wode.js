Page({
  /**
   * 页面的初始数据
   */
  data: {
    kechxz_wxz:false,
    kechxz_xz:true,
    zaixks_wxz:true,
    zaixks_xz: false,
    sixhb_wxz: true,
    sixhb_xz: false,
    xinlpg_wxz: true,
    xinlpg_xz: false,
    kechengxuexixs:true,
    zaixiankaoshixs:false,
    sixianghbxianshi:false,
    xinlipgxianshi:false,
  },
  /** 课程学习*/
  kechengxuexi:function(){
    this.setData({
      kechxz_wxz: false,
      kechxz_xz:true,
      zaixks_wxz: true,
      zaixks_xz: false,
      sixhb_wxz: true,
      sixhb_xz: false,
      xinlpg_wxz: true,
      xinlpg_xz: false,
      kechengxuexixs: true,
      zaixiankaoshixs: false,
      sixianghbxianshi: false,
      xinlipgxianshi: false,
    })
  },
  /** 在线考试*/
  zaixiankaoshi: function () {
    this.setData({
      zaixks_wxz:false,
      zaixks_xz: true,
      kechxz_wxz: true,
      kechxz_xz: false,
      sixhb_wxz: true,
      sixhb_xz: false,
      xinlpg_wxz: true,
      xinlpg_xz: false,
      kechengxuexixs: false,
      zaixiankaoshixs: true,
      sixianghbxianshi: false,
      xinlipgxianshi: false,
    })
  },
  /** 思想汇报*/
  sixianghuibao: function () {
    this.setData({
      sixhb_wxz: false,
      sixhb_xz: true,
      kechxz_wxz: true,
      kechxz_xz: false,
      zaixks_wxz: true,
      zaixks_xz: false,
      xinlpg_wxz: true,
      xinlpg_xz: false,
      kechengxuexixs: false,
      zaixiankaoshixs: false,
      sixianghbxianshi: true,
      xinlipgxianshi: false,
    })
  },

  /** 心理评估*/
  xinlipiggu: function () {
    this.setData({
      xinlpg_wxz: false,
      xinlpg_xz: true,
      kechxz_wxz: true,
      kechxz_xz: false,
      zaixks_wxz: true,
      zaixks_xz: false,
      sixhb_wxz: true,
      sixhb_xz: false,
      kechengxuexixs: false,
      zaixiankaoshixs: false,
      sixianghbxianshi: false,
      xinlipgxianshi: true,
    })
  },
 
  /**
   * 跳转播放页面
   */
  tzbofangym:function(){
    wx.navigateTo({
      url: '../shouyebofang/shouyebofang',
    })
  },
  /**
   * 心理评估 开始测试页面
   * 点击查看 跳转结果页面
   */
  tzxinlipinggu:function(){
    wx.navigateTo({
      url: '../xinlipinggu/xinlipinggu',
    })
  },
  tzceshijieguo:function(){
    wx.navigateTo({
      url: '../ceshijieguo/ceshijieguo',
    })
  },

  /**点击拍照确定 跳转拍照页面 现在把链接做到拍照汇报标题上
   */
  tzpaizhaoyemian:function(){
    wx.navigateTo({
      url: '../paizhaoshangchuan/paizhaoshangchuan',
    })
  },
  /**点击在线考试编辑跳转详情页 */
  tzzkhsxqym:function(){
    wx.navigateTo({
      url: '../kaoshixiangqing/kaoshixiangqing',
    })
  },
  /**
   * 点击选择图片
   */
  dianji:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
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