Page({
  onSousuo:function(){
    wx.navigateTo({
      url: '../sousuo/sousuo?subjectType=""&courseType=""&menu=index&subjectId=""',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
     page:1,
     rows:1
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
    // console.log(that.globalData.header.Cookie);
    wx.request({
      url: getApp().globalData.url + '/sign/cmonthSignList', //请求当月已选课程地址
      // url: 'http://localhost:8081/SQJZ/sign/cmonthSignList', //请求当月已选课程地址
      data: { },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var hours=res.data.hours;
        var list=res.data.list;
        that.setData({
          hours:hours,
          nowList: list
        })
      }
    })
   
    wx.request({
      url: getApp().globalData.url + '/sign/historySignList', //请求历史已选课程地址
      // url: 'http://localhost:8081/SQJZ/sign/historySignList', //请求历史已选课程地址
      data: { 'page': that.data.page, 'rows': that.data.rows},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var list = res.data;
        if(list.length>0){
          var page = that.data.page + 1;
          that.setData({
            page: page
          });
        }
        that.setData({
          historyList: list
        })
      }
    })

    wx.request({
      url: getApp().globalData.url + '/sign/topCourseList', //获取点击量最多的3个课程
      // url: 'http://localhost:8081/SQJZ/sign/topCourseList', //获取点击量最多的3个课程
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
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
    var that=this;
    var page = this.data.page;
    var rows = this.data.rows;
    wx.request({
      url: getApp().globalData.url + '/sign/historySignList', //请求历史已选课程地址
      // url: 'http://localhost:8081/SQJZ/sign/historySignList', //请求历史已选课程地址
      data: {page:page,rows:rows},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var list = res.data;
        if(list.length>0){
          page+=1;
          var content=that.data.historyList.concat(list);
          that.setData({
            page:page,
            historyList: content
          });
        }
      }
    })
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

  },
  /**
   * 点击已选课程图片跳转
   */
    signRecord:function(e){
    // console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/pages/shouyebofang/shouyebofang?record=sign&id="+id
    })
  },
  

  /**
   * 点击轮播图播放视频
   */
  swipclick:function(e){
    // console.log(e);
    var courseid = e.currentTarget.dataset.courseid;
    wx.navigateTo({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/pages/shouyebofang/shouyebofang?record=record&courseid=" + courseid
    })
  },
})



