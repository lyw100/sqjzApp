Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    menuflag:true,
    photohidden:false,
    jingxuan: 'xzzhangtai',
    shipin:'xzzhangtai',
    tuwen:'',
    yuyin:'',
    indicatorDots:false,
    bixiuyanse:'yanse',
    xuankeShow: true,
    yixuanShow: false,
    shipinShow:true,
    tuwenShow:false,
    yuyinShow:false,
    page:1,
    subid: 'sub'
  },
  /**遮罩层 */
  // 遮罩层显示
  denghaoanniu:function () {
    this.setData({ menuflag:false})
  },
  // 遮罩层隐藏
  conceal:function () {
    this.setData({ menuflag: true })
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
      shipin: 'xzzhangtai',
      tuwen: '',
      yuyin: '',
    })
  },
  tuwen: function () {
    this.setData({
      shipin: '',
      tuwen: 'xzzhangtai',
      yuyin: '',
    })
  },
  yuyin: function () {
    this.setData({
      shipin: '',
      tuwen: '',
      yuyin: 'xzzhangtai',
    })
  },
  /**
   * 搜索页面跳转
   */
  onSousuo:function(){
    // courseType = 0 视频
    // subjectType = 0 必修
    var subType=this.data.subType;
    wx.navigateTo({
      url: '../sousuo/sousuo?subjectType=&courseType='+subType+'&menu=course&subjectId=',
    })
  },
  countInfo: function () {
    wx.request({
      url: getApp().globalData.url + '/count/kechengku',
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
    
    //轮播图
    this.topCourseList();
    //获取必修科目
    this.getKMList(0);
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
    // let jzid = getApp().globalData.jiaozhengid;
    // var that=this;
    // //获取所有已选课程的ids
    // wx.request({
    //   url: getApp().globalData.url + '/course/getSignIds', //获取所有已选课程的ids
    //   data: {  jzid: jzid },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     var ids=res.data;
    //     var subList=that.data.subList;
    //     console.log(subList);  
    //     for(var i=0;i<subList.length;i++){
    //       var sub=subList[i];
          // console.log(sub.name);
          // console.log(sub);
          // console.log(subList[i].courseList);
          // console.log(sub[courseList]); 
          // var courseList = sub.courseList;
          // for(let j=0;j<courseList;j++){
          //     let course=courseList[j];
          //     let courseid=course.id;
          //   if(j==0){
          //     console.log(ids.indexOf(courseid));
          //     console.log(ids.toLocalString().indexOf(courseid));

          //   }  
          //   if (ids.indexOf(courseid)>-1){
          //     course.isSign=1;
          //   }
          // }
        // }
        // that.setData({
        //   subList:subList
        // })
    //   }
    // })


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
    //轮播图
    this.topCourseList();
    //获取必修科目
    this.getKMList(0);

    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var jingxuan=this.data.jingxuan;
    if(jingxuan==""){//选择的tab不是精选 可以继续加载
      var page=this.data.page+1;
      this.setData({
        page:page,
      });
      this.getCourseBysubid(0, 4, page);
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取点击量最多的5个课程
   */
  topCourseList:function(){
    var that = this;
    var query={};
    if(this.data.jingxuan==""){
      query.subid=this.data.subList[0].id;
    }
    if (this.data.bixiuyanse=="yanse"){
      query.type=0;
    }else{
      query.type=1;
    }
    wx.request({
      url: getApp().globalData.url + '/sign/topCourseList', //获取点击量最多的3个课程
      data: query,
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var list = res.data;
        for(var i=0;i<list.length;i++){
          if(i==0){
            list[i].img = "biaotou";
            list[i].text = "titxinxi";
          } else {
            list[i].img = "gaibianchang";
            list[i].text = "xiaotuzi";
          }
        }
        that.setData({
          swiperCurrent: 0,
          imgUrls: list
        })
      }
    })

  },


  /**
   * 获取所有科目   subType 0  必修   1选修
   */
  getKMList:function(subType){
    if(subType==0){
      this.setData({
        jingxuan:'xzzhangtai',
        bixiuyanse:'yanse',
        xuanxiuyanse:'',
        subType:subType,
        page:1
      })
    }else if(subType==1){
      this.setData({
        jingxuan: 'xzzhangtai',
        bixiuyanse: '',
        xuanxiuyanse: 'yanse',
        subType: subType,
        page: 1
      })
    }
    this.topCourseList();
    var that=this;
    //获取科目
    wx.request({
      url: getApp().globalData.url + '/course/listKM', //获取科目列表
      data: { 'type': subType},
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var subList = res.data;
        that.setData({
          subList: subList,
          subTabList:subList
        })
        for (var i = 0; i < subList.length; i++) {
          that.data.subTabList[i].tabClass ="";
          var subid = subList[i].id;
          if (i == 1) {
            that.getCourseBysubid(i, 3,1);
          } else {
            that.getCourseBysubid(i, 4,1);
          }

        }

      }
    })
  },

  /**
   * 点击课程tab栏
   */
  subTap:function(e){
    this.setData({ menuflag: true })

    var subid = e.currentTarget.dataset.subid;
    var index = e.currentTarget.dataset.index;
    var subTabList = this.data.subTabList;
    this.data.subList = [];
    if(index!=null){//点击非精选科目
      // this.data.jingxuan="";
      this.setData({
        jingxuan:'',
        page:1,
        subid: 'sub' + subid
      });
      this.data.subList[0]=subTabList[index];
      this.getCourseBysubid(0,4,1);
      for (var i = 0; i < subTabList.length;i++){
        if(i==index){
          subTabList[i].tabClass = "xzzhangtai";
        }else{
          subTabList[i].tabClass="";
        }
      }
    }else{//点击精选tab
      // this.data.jingxuan = "jingxuan";
      this.setData({
        jingxuan: 'xzzhangtai',
        page:1,
        subid: 'sub'
      });
      this.data.subList = subTabList;
      for (var i = 0; i < subTabList.length; i++) {
        subTabList[i].tabClass = "";
        if (i == 1) {
          this.getCourseBysubid(i, 3,1);
        } else {
          this.getCourseBysubid(i, 4,1);
        }
      }


    }

    //轮播图
    this.topCourseList();

    this.setData({
      subTabList: subTabList
    });
    //跳转到顶部
    wx.pageScrollTo({
      scrollTop: 0
    })


  },

  /**
   * 根据课程id获取课程
   */
  getCourseBysubid: function (index, rows,page) {
    var jzid = getApp().globalData.jiaozhengid;
    var that=this;
    var subList=that.data.subList;
    var subid=subList[index].id;
    wx.request({
      // url: 'http://localhost:8081/SQJZ' + '/course/getCourseBySubid', //根据课程id获取课程
      url: getApp().globalData.url + '/course/getCourseBySubid', //根据课程id获取课程
      data: {jzid:jzid,subid:subid,page:page,rows:rows},
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var courseList = res.data;
        if(page==1){
          subList[index].courseList = courseList;
        }else{
          courseList= subList[index].courseList.concat(courseList);
          subList[index].courseList = courseList;
        }
        console.log(subList);
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
    var subname = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../gengduotuijian/gengduotuijian?subid=' + subid+'&title='+subname ,
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
          var subList = that.data.subList;
          var courseList = subList[subindex].courseList;
          courseList[index].isSign = 1;
          that.setData({
            subList: subList,
          })
          
        }else if(res.data=="more"){
          wx.showToast({
            title: '选择课时超出',
            icon: 'none',
            duration: 2000
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
  },
  /**
   * 获取必修科目
   */
  bixiuke:function(){
    this.getKMList(0);
  },
  /**
   * 获取选修科目
   */
  xuanxiuke:function(){
    this.getKMList(1);
  },

  /**
   * 取消选课  判断播放进度是否为0  不是0不可以取消
   */
  cancleSign: function (e) {
    var courseid = e.currentTarget.dataset.id;
    var that = this;
    var subindex = e.currentTarget.dataset.subindex;
    var index = e.currentTarget.dataset.index;

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
          var subList = that.data.subList;
          var courseList = subList[subindex].courseList;
          courseList[index].isSign = 0;
          that.setData({
            subList: subList,
          })
          wx.showToast({
            title: '取消课程成功',
            icon: 'none',
            duration: 2000
          })
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
   * 轮播图改变样式
   */
  imgChange:function(e){
    // console.log("轮播图动画change方法");
    var index = e.detail.current;
    var imgUrls = this.data.imgUrls;
    for (var i = 0; i < imgUrls.length; i++) {
      if (i == index) {
        imgUrls[i].img = "biaotou";
        imgUrls[i].text = "titxinxi";
      } else {
        imgUrls[i].img = "gaibianchang";
        imgUrls[i].text = "xiaotuzi";
      }

    }
    this.setData({
      imgUrls: imgUrls
    })
  }
})