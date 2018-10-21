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
      url: '../sousuo/sousuo',
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
      // url: 'http://localhost:8081/SQJZ' + '/sign/topCourseList', //获取点击量最多的3个课程
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

    //获取必修科目
    this.getKMList(0);
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
   * 获取所有科目   subType 0  必修   1选修
   */
  getKMList:function(subType){
    var that=this;
    //获取科目
    wx.request({
      url: getApp().globalData.url + '/course/listKM', //获取科目列表
      data: { 'type': subType},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var subList = res.data;
        that.setData({
          subList: subList
        })
        for (var i = 0; i < subList.length; i++) {
          var subid = subList[i].id;
          if (i == 1) {
            that.getCourseBysubid(i, 3);
          } else {
            that.getCourseBysubid(i, 4);
          }

        }

      }
    })
  },

  /**
   * 根据课程id获取课程
   */
  getCourseBysubid:function(index,rows){
    var that=this;
    var subList=that.data.subList;
    var subid=subList[index].id;
    wx.request({
      // url: 'http://localhost:8081/SQJZ' + '/course/getCourseBySubid', //根据课程id获取课程
      url: getApp().globalData.url + '/course/getCourseBySubid', //根据课程id获取课程
      data: {subid:subid,page:1,rows:rows},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var courseList = res.data;

        subList[index].courseList = courseList;
        
        that.setData({
          subList: subList
        })
        // console.log(that.data);
      }
    })

  },

  /**
   * 跳转到更多课程页面
   */
  moreSubCourse:function(e){
    var subid = e.currentTarget.dataset.subid;
    wx.navigateTo({
      url: '../gengduotuijian/gengduotuijian?subid=' + subid ,
    });
  },
  /**
   * 选课
   */
  chooseCourse:function(e){

    var courseid = e.currentTarget.dataset.id;
    var that = this;
    var subindex = e.currentTarget.dataset.subindex;
    var index = e.currentTarget.dataset.index;

    var jzid = this.data.jzid;
    jzid=7;
    var url = getApp().globalData.url + '/course/saveSign';
    wx.request({
      url: url, //获取视频播放信息
      data: { courseid: courseid, jzid: jzid },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'text',
      success(res) {
        if (res.data == "ok") {//选课成功
          var subList = that.data.subList;
          var courseList = subList[subindex].courseList;
          courseList[index].isSign = 1;
          that.setData({
            subList: subList,
          })
          
        }
      }
    })
  },

  //视频播放
  bofang:function(e){
    var courseid = e.currentTarget.dataset.id;
    wx.navigateTo({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/pages/shouyebofang/shouyebofang?record=record&courseid=" + courseid
    })
  }




})