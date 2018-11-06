Page({
  gengduotj: function () {
    var subid = this.data.record.course.subject.id;
    wx.redirectTo({
      url: '../gengduotuijian/gengduotuijian?subid=' + subid,
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    xianshi:false,
    shualiandl:false,
    duigouxz: false,
    lastTime:0,
    page:1
  },
  countInfo: function () {
    wx.request({
      url: getApp().globalData.url + '/count/shouyebofang',
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
    var that = this;
    var data = {};
    var url = '';
    var jzid = getApp().globalData.jiaozhengid;
    data.jzid = jzid;
    if (options.record == 'sign') {//选课播放记录
      data.id = options.id;
      url = getApp().globalData.url + '/course/getSignRecord';
    } else if (options.record == 'scan') {//浏览播放记录
      data.id = options.id;
      url = getApp().globalData.url + '/course/getScanRecord';
    } else if (options.record == 'record') {//播放记录
      data.courseid = options.courseid;
      url = getApp().globalData.url + '/course/getRecord';
    }

    // data.courseid = 42;
    // url = 'http://localhost:8081/SQJZ/course/getRecord';
    wx.request({
      url: url, //获取视频播放信息
      data: data,
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        var isSign = 0//标识是选课 0为浏览
        if (res.data.operator != null) {
          isSign = 1;//播放课程为选课课程
        }
       
        var sections = res.data.course.sections;
        var flag=true;
        for (var i = 0; i < sections.length; i++) {
          if(sections[i].state==1){//判断章节是否播放完
            sections[i].yanse = "zhangjieend";
          }else{
            if (flag){//未播放的第一个视频进行播放
              sections[i].yanse = "zhangjie"; 
              that.getVideoSection(res.data.course.id, res.data.course.sections[i].id);
              flag=false;
            }else{
              sections[i].yanse = ""; 
            }
          }
        }
        // console.log(sections);
        if(flag){//所有章节都播放完成
          sections[0].yanse ="zhangjieend zhangjie";
          that.getVideoSection(res.data.course.id, res.data.course.sections[0].id);
        }
        that.setData({
          record: res.data,
          isSign: isSign,
          subType: res.data.course.subject.type,
          sections: sections
        })
        wx.setNavigationBarTitle({
          title: res.data.course.name,
        })

        
        that.moreCourse();

      }
    })
    this.countInfo();


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
    
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
    this.moreCourse();
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
    // this.videoContext.play();
    // console.log("点击播放");
    // this.videoContext.requestFullScreen();//执行全屏方法
    
    var courseid = this.data.record.course.id;//课程id
    var jzid = this.data.record.jzid;
    var url = getApp().globalData.url + '/course/addPlayNum';
    wx.request({
      url: url,
      data: { courseid: courseid,jzid: jzid },
      dataType: 'text',
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);

      }
    })

    
  },
  /**
   * 暂停的方法
   */
  bindPause: function () {
    this.videoContext.pause()
  },
  
  /**
   * 视频播放结束退出全屏
   */
  bindended:function(){
    this.saveProgress();//保存视频进度
    this.videoContext.exitFullScreen();//执行全屏方法

    var sections = this.data.sections;
    
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].id == this.data.sectionRecord.section.id) {//该章节正在播放的章节
        sections[i].yanse = "zhangjieend";
        if((i+1)<sections.length){//有下一个章节
          this.getVideoSection(this.data.record.course.id, this.data.record.course.sections[i+1].id);
          if (sections[i + 1].yanse != "zhangjieend"){
            sections[i + 1].yanse = "zhangjie";
          }else{
            sections[i + 1].yanse = "zhangjieend zhangjie";
          }
        }

        this.setData({
          sections:sections
        })
      }
    }
  },
  /**
   * 全屏的方法
   */
  bindFullscreenchange: function (e) {
    // var isfull = e.detail.fullScreen;
    // if (!isfull) {
    //   // console.log("非全屏暂停");
    //   this.videoContext.pause();//视频暂停
    // }
  },
  //视频播放出错的方法
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  //防拖拽方法
  bindTimeupdate: function (e) {
    //console.log(e.detail)
    var currentTime = e.detail.currentTime;//当前时间
    var lastTime = this.data.lastTime;//上一个节点的时间
    var progress = this.data.progress;//播放进度  最大的播放时间


    // console.log("progress:" + progress);
    // console.log("currentTime:" + currentTime);
    // console.log("lastTime:" + lastTime);

    if (this.data.isSign==1){//课程为选课课程
      //当前播放时间与上次播放节点时间差大于2秒
      if (lastTime - currentTime > 10 || currentTime - lastTime > 10) {
        if (currentTime < progress) {//当前播放时间小于播放进度
          this.videoContext.seek(currentTime);
          this.setData({
            lastTime: currentTime
          })
          return;
        } else {
          this.videoContext.seek(lastTime);
          return;
        }
      }
      
      //已选课程第一次播放该视频 播放到一半的时候弹出刷脸登录
      //弹出刷脸登录
      var totalTime = this.data.sectionRecord.section.duration;
      var halfTime = parseInt(totalTime / 2);
      //一半时间弹出刷脸登录 
      if (parseInt(currentTime) == halfTime && progress < halfTime) {
        this.videoContext.pause();//视频播放暂停
        this.setData({
          shualiandl: true,
        });
      }

      //正常播放
      if (currentTime > progress) {
        this.setData({
          progress: currentTime
        });
      }



    }else{//课程为非选课课程
      //非选课正常播放
      this.setData({
        progress: currentTime
      });
    }
    this.setData({
      lastTime:currentTime
    })
    
    //console.log(currentTime+'==='+lastTime);
  },

  /**
   * 获取推荐课程列表
   */
  moreCourse: function () {
    var that = this;
    // console.log(this.data.record);
    var courseid = this.data.record.course.id;
    var subid = this.data.record.course.subject.id;
    if (courseid != null && courseid > 0) {
      var url = getApp().globalData.url + '/course/getMoreCourse';
      // var url = 'http://localhost:8081/SQJZ/course/getMoreCourse'; //获取推荐课程列表地址
      var jzid = this.data.record.jzid;
      var page=this.data.page;
      wx.request({
        url: url, //获取推荐课程列表地址
        data: { subid: subid, courseid: courseid, page: page, rows: 4, jzid: jzid },
        header: {
          'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log(res.data);
          var list = res.data;
          if(page>1){
            list=that.data.moreList.concat(list);
          }
          page=page+1;
          that.setData({
            moreList: list,
            page:page
          })
        }
      })

    }
  },

  /**
   * 保存视频进度
   */
  saveProgress: function () {
    var that = this;
    // console.log(this.data.record);
    var courseid = this.data.record.course.id;//课程id
    var sectionid = this.data.sectionRecord.section.id;//课程章节id
    var progress = parseInt(this.data.progress);//进度

    if (this.data.sectionRecord.section.duration - this.data.progress<3){
      progress = this.data.sectionRecord.section.duration;
    }
    if (courseid != null && courseid > 0) {
      var url = getApp().globalData.url + '/course/saveProgress';
      // var url = 'http://localhost:8081/SQJZ/course/saveProgress'; 
      var jzid = this.data.record.jzid;
      // console.log(jzid);
      wx.request({
        url: url,
        data: { id: courseid, progress: progress, jzid: jzid ,sectionid:sectionid},
        dataType: 'text',
        header: {
          'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
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
  moreCourseTap: function (e) {
    var courseid = e.currentTarget.dataset.id;
    var url = getApp().globalData.url + '/course/getRecord';
    var that = this;
    var jzid = getApp().globalData.jiaozhengid;
    wx.request({
      url: url, //获取视频播放信息
      data: { jzid: jzid, courseid: courseid },
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var isSign = 0//标识是选课 0为浏览
        if (res.data.operator != null) {
          isSign = 1;//播放课程为选课课程
        }
       
        var sections = res.data.course.sections;
        var flag = true;
        for (var i = 0; i < sections.length; i++) {
          if (sections[i].state == 1) {//判断章节是否播放完
            sections[i].yanse = "zhangjieend";
          } else {
            if (flag) {//未播放的第一个视频进行播放
              sections[i].yanse = "zhangjie";
              that.getVideoSection(res.data.course.id, res.data.course.sections[i].id);
              flag = false;
            } else {
              sections[i].yanse = "";
            }
          }
        }
        if (flag) {//所有章节都播放完成
          sections[0].yanse = "zhangjieend zhangjie";
          that.getVideoSection(res.data.course.id, res.data.course.sections[0].id);
        }
        that.setData({
          record: res.data,
          isSign: isSign,
          sections: sections,
          page:1
        })
        wx.setNavigationBarTitle({
          title: res.data.course.name,
        })

        that.moreCourse();    
      }
    })

  },
  /**
   * 添加选课记录
   */
  chooseCourse: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var courseid = e.currentTarget.dataset.id;
    var jzid = this.data.record.jzid;

    var url = getApp().globalData.url + '/course/saveSign';
    wx.request({
      url: url, //获取视频播放信息
      data: { courseid: courseid, jzid: jzid },
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      dataType: 'text',
      success(res) {
        if (res.data == "ok") {//选课成功
          var moreList = that.data.moreList;
          moreList[index].isSign = 1;
          that.setData({
            moreList: moreList,
          })
          // that.moreCourseTap(e);
        } else if (res.data == "more") {
          wx.showToast({
            title: '选择课时超出',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })


  },
  /**
   * 正在播放的视频添加选课
   */
  tianjiaxuanke: function (e) {
    var that = this;
    var courseid = e.currentTarget.dataset.id;
    var jzid = getApp().globalData.jiaozhengid;

    var url = getApp().globalData.url + '/course/saveSign';
    wx.request({
      url: url, //获取视频播放信息
      data: { courseid: courseid, jzid: jzid },
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      dataType: 'text',
      success(res) {
        if (res.data == "ok") {//选课成功
          that.setData({
            isSign: 1,
            progress:0,
            lastTime:0
          })

          var sections = that.data.sections;
          for (var i = 0; i < sections.length; i++) {
            if (sections[i].yanse == "zhangjie") {//判断正在播放的章节
              that.getVideoSection(that.data.record.course.id, sections[i].id);
            }
          }
          this.videoContext.seek(0);
          // that.moreCourseTap(e);
        } else if (res.data == "more") {
          wx.showToast({
            title: '选择课时超出',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 取消选课  判断播放进度是否为0  不是0不可以取消
   */
  cancleSign:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var courseid = e.currentTarget.dataset.id;
    var jzid = this.data.record.jzid;

    var url = getApp().globalData.url + '/course/cancleSign';
    wx.request({
      url: url, //获取视频播放信息
      data: { courseid: courseid, jzid: jzid },
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      dataType: 'text',
      success(res) {
        if (res.data == "ok") {//取消选课成功
          var moreList = that.data.moreList;
          moreList[index].isSign = 0;
          that.setData({
            moreList: moreList,
          })
          wx.showToast({
            title: '取消课程成功',
            icon: 'none',
            duration: 2000
          })
          // that.moreCourseTap(e);
        } else if (res.data == "progress") {//进度不为空
          wx.showToast({
            title: '该课程已学习不可取消',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data == "assign") {
          wx.showToast({
            title: '指定课程不可取消',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },


  /**
   * 取消正在播放的视频添加选课
   */
  quxiaoxuanke: function (e) {
    var that = this;
    var courseid = e.currentTarget.dataset.id;
    var jzid = getApp().globalData.jiaozhengid;

    var url = getApp().globalData.url + '/course/cancleSign';
    wx.request({
      url: url, //获取视频播放信息
      data: { courseid: courseid, jzid: jzid },
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      dataType: 'text',
      success(res) {
        if (res.data == "ok") {//取消选课成功
          that.setData({
            isSign: 0,
          })
          // that.moreCourseTap(e);
        } else if (res.data == "progress") {
          wx.showToast({
            title: '该课程已学习不可取消',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data == "assign") {
          wx.showToast({
            title: '指定课程不可取消',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 获取正在播放的章节信息
   */
  getVideoSection:function(courseid,sectionid){
    var jzid = getApp().globalData.jiaozhengid;
    var that=this;
    wx.request({
      // url:'http://localhost:8081/SQJZ/course/getVideoSection', //获取正在播放的章节信息
      url: getApp().globalData.url + '/course/getVideoSection', //获取正在播放的章节信息
      data: { courseid: courseid, jzid: jzid, sectionid: sectionid},
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          sectionRecord:res.data,
          progress: res.data.progress,
          lastTime: res.data.progress
        });
        
      }
    })

  },

  /**
   * 点击章节播放事件
   */
  sectionTap:function(e){
    this.saveProgress();
    var courseid = e.currentTarget.dataset.courseid;
    var sectionid = e.currentTarget.dataset.sectionid;
    var index = e.currentTarget.dataset.index;
    var sections=this.data.sections;
    for(var i=0;i<sections.length;i++){
      if(sections[i].state!=1){
        sections[i].yanse="";
      }else{
        sections[i].yanse = "zhangjieend";
      }
    }
    if (sections[index].state != 1){
      sections[index].yanse ="zhangjie";
    }else{
      sections[index].yanse = "zhangjieend zhangjie";
    }
    this.setData({
      sections:sections
    });
    this.getVideoSection(courseid, sectionid);

  },

  /**
   * 刷脸登录
   */
  takePhoto: function () {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.showLoading({
          title: '正在核验身份.....',
        })
        // this.setData({ logindisabled: true });
        var header = getApp().globalData.header; //获取app.js中的请求头
        wx.uploadFile({
          url: getApp().globalData.url + '/weChat/user/face',
          filePath: res.tempImagePath,
          header: header,
          formData: {
            telephone: wx.getStorageSync("username"),
            password: wx.getStorageSync("password")
          },
          name: 'file',
          success: (res) => {
            wx.hideLoading();
            var data = JSON.parse(res.data);
            if (data.msg == "OK") {
              this.setData({
                shualiandl: false,
              });
              this.videoContext.play();//视频播放暂停
              
            } else {
              wx.showModal({
                title: '提示',
                content: data.msg,
                showCancel: false
              })
            }

          }
        })
      }
    })
  }
})