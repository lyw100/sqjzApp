Page({
  gengduotj: function () {
    wx.navigateTo({
      url: '../gengduotuijian/gengduotuijian',
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
      duigouxz:false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var data={};
    var url='';
    if(options.record=='sign'){//选课播放记录
      data.id=options.id;
      url = getApp().globalData.url+'/course/getSignRecord';
      // url = 'http://localhost:8081/SQJZ/course/getSignRecord';
    }else if(options.record=='scan'){//浏览播放记录
      data.id = options.id;
      url = getApp().globalData.url +'/course/getScanRecord';
      // url = 'http://localhost:8081/SQJZ/course/getScanRecord';
    }else if(options.record=='record'){//播放记录
      data.courseid=options.courseid;
      url = getApp().globalData.url +'/course/getRecord';
      // url = 'http://localhost:8081/SQJZ/course/getRecord';
    }

    wx.request({
      url: url, //获取视频播放信息
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          record: res.data,
          progress:res.data.progress
        })
        that.moreCourse();
       
      }
    })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
    wx.setStorageSync('lastTime', this.data.progress) //小程序全局同步存储  key   object
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
    this.saveProgress();//保存视频进度
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.saveProgress();//保存视频进度
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
 * 开始播放时执行的方法
 */
  bindPlay: function () {
    this.videoContext.requestFullScreen();//执行全屏方法
  },
  /**
   * 暂停的方法
   */
  bindPause: function () {
    this.videoContext.pause()
  },
  /**
   * 全屏的方法
   */
  bindFullscreenchange: function (e) {
    var isfull = e.detail.fullScreen;
    if (!isfull) {
      this.videoContext.pause();//视频暂停
    }
  },
  //视频播放出错的方法
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  //防拖拽方法
  bindTimeupdate: function (e) {
    //console.log(e.detail)
    var currentTime =  e.detail.currentTime;//当前时间
    var lastTime = wx.getStorageSync('lastTime');//上一个节点的时间
    var progress=this.data.progress;//播放进度  最大的播放时间
    

    // console.log("progress:" + progress);
    // console.log("currentTime:" + currentTime);
    // console.log("lastTime:" + lastTime);

      //当前播放时间与上次播放节点时间差大于2秒
    if (lastTime - currentTime > 3 || currentTime - lastTime > 3 ) {
      if(currentTime<progress){//当前播放时间小于播放进度
        this.videoContext.seek(currentTime);
        wx.setStorageSync('lastTime', currentTime)
        return;
      } else {
        this.videoContext.seek(lastTime);
        return;
      }  
    }

    wx.setStorageSync('lastTime', currentTime);
    //正常播放
    if (currentTime > progress) {
      this.setData({
        progress: currentTime
      });
    }
    //console.log(currentTime+'==='+lastTime);
  },

  /**
   * 获取推荐课程列表
   */
  moreCourse:function( ){
    var that=this;
    // console.log(this.data.record);
    var courseid=this.data.record.course.id;
    if(courseid!=null&&courseid>0){
      var url = getApp().globalData.url + '/course/getMoreCourse';
      // var url = 'http://localhost:8081/SQJZ/course/getMoreCourse'; //获取推荐课程列表地址
      var jzid=this.data.record.jzid;
      // console.log(jzid);
      wx.request({
        url: url, //获取推荐课程列表地址
        data: {id:courseid,page:1,rows:4,jzid:jzid},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log(res.data);
          var list = res.data;
          that.setData({
            moreList: list
          })
        }
      })

    }
  },

  /**
   * 保存视频进度
   */
  saveProgress:function(){
    var that = this;
    // console.log(this.data.record);
    var courseid = this.data.record.course.id;//课程id
    var progress=parseInt(this.data.progress);//进度
    if (courseid != null && courseid > 0) {
      var url = getApp().globalData.url + '/course/saveProgress';
      // var url = 'http://localhost:8081/SQJZ/course/saveProgress'; 
      var jzid = this.data.record.jzid;
      // console.log(jzid);
      wx.request({
        url: url, 
        data: { id: courseid, progress: progress, jzid: jzid },
        dataType :'text',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log(res.data);
          
        }
      })

    }
  },

  /**
   * 点击更多视频进行播放
   */
  moreCourseTap:function(e){
    var courseid = e.currentTarget.dataset.id;
    var url = getApp().globalData.url + '/course/getRecord';
    var that=this;
    wx.request({
      url: url, //获取视频播放信息
      data: { courseid, courseid},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          record: res.data,
          progress: res.data.progress
        })
        
      }
    })

  },
  /**
   * 添加选课记录
   */
  chooseCourse:function(e){
    var that=this;
    var index = e.currentTarget.dataset.index;
    var courseid = e.currentTarget.dataset.id;
    var jzid = this.data.record.jzid;
  
    var url = getApp().globalData.url + '/course/saveSign';
    wx.request({
      url: url, //获取视频播放信息
      data: { courseid: courseid,jzid:jzid },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: 'text',
      success(res) {
        if(res.data=="ok"){//选课成功
          var moreList=that.data.moreList;
          moreList[index].isSign=1;
          that.setData({
            moreList: moreList,
          })
          that.moreCourseTap(e);
        }
      }
    })


  }

})