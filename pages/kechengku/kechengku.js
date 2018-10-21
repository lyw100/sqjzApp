Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    xuankeShow: true,
    yixuanShow: false,
    shipinShow:true,
    tuwenShow:false,
    yuyinShow:false,
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
   * 视频 图文 语音页面切换
   */
  shipin:function(){
    this.setData({
      shipinShow: true,
      tuwenShow: false,
      yuyinShow: false,
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
   * 搜索页面跳转
   */
  onSousuo:function(){
    wx.navigateTo({
      url: '/pages/sousuo/sousuo?subjectType=&courseType=&subjectId=1&menu=course',
    })
  },
  /**点击更多推荐  查看更多 跳转到gengduotuijian */
  tzgdtj:function(){
    wx.navigateTo({
      url: '../gengduotuijian/gengduotuijian',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/sign/topCourseList', //获取点击量最多的3个课程
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var list = res.data;
        // for(var i=0;i<list.length;i++){
        //   if(i==0){
        //     list[i].width="100%";
        //   }else{
        //     list[i].width = "80%";
        //   }
        // }
        that.setData({
          swiperCurrent: 0,
          imgUrls: list
        })
      }
    })

    //获取科目
    wx.request({
      url: getApp().globalData.url + '/course/listKM', //获取科目列表
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var subList = res.data;
        for (var i = 0; i < subList.length;i++){
          var subid=subList[i].id;

        }
        that.setData({
          swiperCurrent: 0,
          imgUrls: list
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

  },

  
})