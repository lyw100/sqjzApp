var pageReport=2;//思想汇报页码
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
    reportList:[]//思想汇报列表
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
  loadReport:function(){
    var path=getApp().globalData.url;
    //var path = 'http://localhost:8080/SQJZ';
    var self = this;
    wx.request({
      url: path + '/report/list',
      data: {
        page: 1,
        rows: 5
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data.msg == 'OK') {
          var list = res.data.list;
          for (var i = 0; i < list.length; i++) {
            var images = list[i].content.split(',')
            list[i].images = images
          }
          self.setData({
            reportList: list
          })
        }
      }
    })
  },
  /**
   * 思想汇报，加载更多
   */
  loadMoreReport:function(){
    var path=getApp().globalData.url;
    //var path = 'http://localhost:8080/SQJZ';
    var reportList=this.data.reportList
    var self=this;
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: path+'/report/list',
      data:{
        page: pageReport,
        rows:5
      },
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        if(res.data.msg=='OK'){
          var list = res.data.list;
          if(list.length>0){
            for (var i = 0; i < list.length; i++) {
              var images = list[i].content.split(',')
              list[i].images = images
              reportList.push(list[i])
            }
            self.setData({
              reportList: reportList
            })
            pageReport++;
          }
        }
      },
      complete: function () {
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      }
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
    var imgList=[];
    wx.navigateTo({
      url: '../paizhaoshangchuan/paizhaoshangchuan?imgList='+JSON.stringify(imgList),
    })
  },
  /**点击在线考试编辑跳转详情页 */
  tzzkhsxqym:function(){
    wx.navigateTo({
      url: '../kaoshixiangqing/kaoshixiangqing',
    })
  },
  /**
   * 思想汇报，点击选择图片
   */
  dianji:function(){
    var images=[];
    var path = getApp().globalData.url;
    //var path = 'http://localhost:8080/SQJZ'
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.navigateTo({
          url: '../paizhaoshangchuan/paizhaoshangchuan?imgList='+JSON.stringify(tempFilePaths),
        })
      }
    })
  },
  /**
   * 思想汇报列表，单击图片预览
   */
  imgPreview:function(event){
    var src=event.currentTarget.dataset.src
    var list=event.currentTarget.dataset.list
    wx.previewImage({
      urls: list,
      current: src
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadReport();
    pageReport = 2;
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
    this.onLoad();
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
    var sxhb=this.data.sixhb_xz;
    if (sxhb){
      this.loadMoreReport()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})