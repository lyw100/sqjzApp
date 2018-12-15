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
     rows:4
  },
  /**单击扫一扫图标 */
  scanTap:function(){
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        // console.log(res)
      }
    })
  },
  /**跳转消息页面 */
  xiaoxiyemian:function(){
    wx.navigateTo({
      url: '../xiaoxi/xiaoxi',
    }); 
  },
  countInfo: function () {
    wx.request({
      url: getApp().globalData.url + '/count/zhuye',
      data: {},
      method: "POST",
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.reLoad();
    this.countInfo();
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
    var that=this;
    setTimeout(function () {
     //that.cmonthSignList();
    }, 200)
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
    // 显示顶部刷新图标
    // wx.showNavigationBarLoading();
    this.data.page=1;
    this.cmonthSignList();
    this.reLoad();
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 显示加载图标
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
    var that=this;
    var page = this.data.page;
    var rows = this.data.rows;
    var jzid = getApp().globalData.jiaozhengid;
    wx.request({
      url: getApp().globalData.url + '/sign/historySignList', //请求历史已选课程地址
      // url: 'http://localhost:8081/SQJZ/sign/historySignList', //请求历史已选课程地址
      data: {jzid:jzid,page:page,rows:rows},
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
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
        }else{
          // wx.showLoading({
          //   title: '没有更多课程',
          // })
        }
        // 隐藏加载框
        // setTimeout(function () {
        //   wx.hideLoading()
        // }, 500)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  /**
   * 修改为单击轮播图跳转到专题页面
   */
  bannerTap:function(e){
    var specialid = e.currentTarget.dataset.specialid;
    wx.navigateTo({
      url: "/pages/zhuanti/zhuanti?specialid=" + specialid
    })
  },
  /**
   * 重新加载数据
   */
  reLoad:function(){
    var that = this;
    var jzid = getApp().globalData.jiaozhengid;
   
    wx.request({
      url: getApp().globalData.url + '/sign/historySignList', //请求历史已选课程地址
      // url: 'http://localhost:8081/SQJZ/sign/historySignList', //请求历史已选课程地址
      data: { jzid: jzid, 'page': that.data.page, 'rows': that.data.rows },
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var list = res.data;
        if(page>1){
          list = that.data.historyList.concat(list);
        }
        if (list.length > 0) {
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
    this.loadBanner();
  },
  /**
   * 加载顶部轮播图
   */
  loadBanner:function(){
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/zhuanti/listBanner',
      //url: 'http://localhost:8080/SQJZ/zhuanti/listBanner',
      data: { 
        jzid: getApp().globalData.jiaozhengid
        },
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        if(res.data.msg=="OK"){
          var list = res.data.list;
          that.setData({
            swiperCurrent: 0,
            imgUrls: list
          })
        }
      }
    })
  },
  /**
   * 当月课程查询
   */
  cmonthSignList:function(){
    var that = this;
    var jzid = getApp().globalData.jiaozhengid;
    // console.log(that.globalData.header.Cookie);
    wx.request({
      url: getApp().globalData.url + '/sign/cmonthSignList', //请求当月已选课程地址
      data: { jzid: jzid },
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var hours = res.data.hours;
        var list = res.data.list;
        that.setData({
          hours: parseFloat(hours).toFixed(1),
          nowList: list
        })
      }
    })
  }

})



