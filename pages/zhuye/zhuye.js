Page({
  onSousuo:function(){
    wx.navigateTo({
      url: '../sousuo/sousuo',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
     
  },
  shouyebof:function(){
    wx.navigateTo({
      url: '../shouyebofang/shouyebofang',
    }); 
  },
  /**跳转消息页面 */
  xiaoxiyemian:function(){
    wx.navigateTo({
      url: '../xiaoxi/xiaoxi',
    }); 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://localhost:8081/SQJZ/sign/cmonthSignList', //请求当月已选课程地址
      data: { },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        var hours=res.data.hours;
        var list=res.data.list;
        that.setData({
          hours:hours,
          nowList: list
        })
      }
    })

    wx.request({
      url: 'http://localhost:8081/SQJZ/sign/historySignList', //请求历史已选课程地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        var list = res.data;
        that.setData({
          historyList: list
        })
      }
    })

    wx.request({
      url: 'http://localhost:8081/SQJZ/sign/topCourseList', //获取点击量最多的3个课程
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        var list = res.data;
        that.setData({
          swiperCurrent:0,
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

  /**
   * 点击滑动的图片
   */
  swipclick: function (e) {

  }
})



