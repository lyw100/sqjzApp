Page({
  tzbfy:function(){
    wx.navigateTo({
      url: '../shouyebofang/shouyebofang',
    })
  },
  onSousuo:function(){
    wx.navigateTo({
      url: '../sousuo/sousuo?subjectType=&courseType=&menu=course&subjectId='+this.data.subid,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    shipinShow: true,
    tuwenShow:false,
    yuyinShow: false,
    page:1,
    moreList:[]
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
    var that=this;
    var subid=options.subid;
    var jzid = getApp().globalData.jiaozhengid;
    this.setData({
      subid:subid,
      jzid:jzid
    })
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
    //获取更多推荐
    this.moreCourseList();



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
    //获取更多推荐
    this.moreCourseList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bofang:function(e){
    var courseid = e.currentTarget.dataset.courseid;
    wx.navigateTo({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/pages/shouyebofang/shouyebofang?record=record&courseid=" + courseid
    })
  },

  moreCourseList:function(){
    var that=this;
    var page=this.data.page;
    var url = getApp().globalData.url + '/course/getMoreCourse';//获取推荐课程列表地址
    var subid=this.data.subid;
    var jzid=this.data.jzid;
    wx.request({
      url: url, //获取推荐课程列表地址
      data: { jzid: jzid, subid: subid, page: page, rows: 6 },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);        
        var list = res.data;
        if(list.length>0){
          var moreList = that.data.moreList.concat(list);
          page+=1;
          that.setData({
            page:page,
            moreList: moreList
          })
        }

      }
    })

  }
})
