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
    reportList: [],//思想汇报列表
    hours:0,//已完成学时
    page:1,
    rows:6,
  },
  lianjie:function(){
    wx.showActionSheet({
      itemList: ['修改密码', '退出当前账号登录'],
      success(res) {
        wx.navigateTo({
          url: '../yanzheng/yanzheng'　
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  // 在线考试方法分页加载
  ksloadList: function () {
    var that = this
    var page = this.data.page
    var kshadLastPage = this.data.kshadLastPage
    var jzid = getApp().globalData.jiaozhengid
    if (kshadLastPage) {
      wx.showToast({
        title: '到底啦',
      })
      return
    }
    if (this.data.zaixks_wxz == false && this.data.zaixks_xz == true) {
      if (page <= 1) {
        wx.request({
          url: getApp().globalData.url + '/minipro/zxks/getXzkslist',
          method: "POST",
          // 请求头部  
          header: {
            'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: { jzid: jzid},
          success: function (res) {
            if (res.data.msg == "success") {
              var xzkslist = res.data.xzkslist
              var xzkslen = xzkslist.length
              // 设置数据  
              that.setData({
                xzkslist: xzkslist,
                xzkslen: xzkslen
              })
            }
          }
        })
      }
      wx.request({
        url: getApp().globalData.url + '/minipro/zxks/getLskslist',
        method: "POST",
        // 请求头部  
        header: {
          'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          rows: this.data.rows,
          page: page,
          jzid: jzid
        },
        success: function (res) {
          if (res.data.msg == "success") {
            var lskslist = res.data.lskslist
            // 设置数据  
            that.setData({
              lskslist: that.data.lskslist.concat(lskslist),
              page: page + 1,
              lskslen: that.data.lskslist.length + lskslist.length
            })
          } else {
            var lskslen = that.data.lskslist.length
            that.setData({
              kshadLastPage: true,
              lskslen: lskslen
            })
            wx.showToast({
              title: '到底啦',
            })
          }
        }
      })
    }
  },

  /**点击在线考试跳转考试详情页 */
  tzzkhsxqym: function (e) {
    var tpid = e.currentTarget.dataset.tpid
    var type = e.currentTarget.dataset.type
    // 0 未考 1已考
    if (type == '0') {
      wx.showModal({
        content: '考试开始后不能停止，确定开始考试吗？',
        success: function (res) {
          if (res.confirm) {
            // 生成试卷
            wx.request({
              url: getApp().globalData.url + '/minipro/zxks/createTestpaper',
              method: "POST",
              // 请求头部  
              header: {
                'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                jzid: getApp().globalData.jiaozhengid,
                tpid: tpid
              },
              success: function (res) {
                if (res.data.msg == "success") {
                  var ppid = res.data.ppid
                  var timeStr = res.data.timeStr
                  var title = res.data.title
                  // 跳转到考试页面
                  wx.navigateTo({
                    url: '../kaoshixiangqing/kaoshixiangqing?ppid=' + ppid + '&timeStr=' + timeStr + '&type=' + type +'&title=' + title
                  })
                } else if (res.data.msg == "notstart"){
                  wx.showToast({
                    title: '考试尚未开放！',
                    icon: 'none'
                  })
                }else {
                  wx.showToast({
                    title: '生成试卷失败！',
                    icon: 'none'
                  })
                }
              }
            })
          }
        }
      })
    }else {
      // 查询试卷
      wx.request({
        url: getApp().globalData.url + '/minipro/zxks/getHisPPaper',
        method: "POST",
        // 请求头部  
        header: {
          'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          jzid: getApp().globalData.jiaozhengid,
          tpid: tpid
        },
        success: function (res) {
          if (res.data.msg == "success") {
            var ppid = res.data.ppid
            var timeStr = res.data.timeStr
            var title = res.data.title
            if(ppid != ""){
              // 跳转到考试页面
              wx.navigateTo({
                url: '../kaoshixiangqing/kaoshixiangqing?ppid=' + ppid + '&timeStr=' + timeStr + '&type=' + type + '&title=' + title
              })
            }else{
              wx.showToast({
                title: '您没有参加此次考试！',
                icon: 'none'
              })
            }
          } else {
            wx.showToast({
              title: '查询试卷失败！',
              icon: 'none'
            })
          }
        }
      })
    }
  },

  /**
   * 获取矫正人员信息
   */
  rectifyPeople:function(){
    var that = this;
    var jzid = getApp().globalData.jiaozhengid;
    // console.log(that.globalData.header.Cookie);
    wx.request({
      url: getApp().globalData.url + '/sign/getRectifyPeopleById', //请求当月已选课程地址
      // url: 'http://localhost:8081/SQJZ/sign/cmonthSignList', //请求当月已选课程地址
      data: { jzid: jzid },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var jzry = res.data;
        
        that.setData({
          jzry: jzry
        })
      }
    })
  },
  /**
   * 获取当月课程列表
   */
  currentCourse:function(){
    var that = this;
    var jzid = getApp().globalData.jiaozhengid;
    // console.log(that.globalData.header.Cookie);
    wx.request({
      url: getApp().globalData.url + '/sign/cmonthSignList', //请求当月已选课程地址
      // url: 'http://localhost:8081/SQJZ/sign/cmonthSignList', //请求当月已选课程地址
      data: { jzid: jzid },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var hours = res.data.hours;
        var list = res.data.list;
        that.setData({
          hours: hours,
          nowList: list
        })
      }
    })
  },
  /**
   * 历史课程
   */
  historyCourse:function(){
    var that = this;
    var jzid = getApp().globalData.jiaozhengid;
    wx.request({
      url: getApp().globalData.url + '/sign/historySignList', //请求历史已选课程地址
      // url: 'http://localhost:8081/SQJZ/sign/historySignList', //请求历史已选课程地址
      data: { jzid: jzid, 'page': that.data.page, 'rows': that.data.rows },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        var list = res.data;
        if (list.length > 0) {
          var page = that.data.page + 1;
          that.setData({
            page: page
          });
        }
        if(that.data.historyList!=null){
          list = that.data.historyList.concat(list);
        }
        that.setData({
          historyList: list
        })
      }
    })
  },
  /**
   * 视频播放触发事件
   */
  coursePlay:function(e){
    var id = e.currentTarget.dataset.id;
    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
    wx.navigateTo({ 
      url: "/pages/shouyebofang/shouyebofang?record=sign&id=" + id
    })
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
      page: 1,
      xzkslist: [],
      lskslist: [],
      kshadLastPage: false
    })
    this.ksloadList()
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
        jzid: getApp().globalData.jiaozhengid,
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
        jzid: getApp().globalData.jiaozhengid,
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
      xlhadLastPage: false,
      psyReportList:[],
      xinlipage: 1,
    })
    this.loadPsyReportList();
  },
  //加载心理评估页面的历史考试
  loadPsyReportList: function () {
    var that = this;
    var page = this.data.xinlipage
    var xlhadLastPage = this.data.xlhadLastPage
    if (xlhadLastPage) {
      wx.showToast({
        title: '到底啦',
      })
      return
    }
    if (this.data.xinlpg_wxz == false && this.data.xinlpg_xz == true) {
      wx.request({
        url: getApp().globalData.url + '/psyass/getPsyReportList', //获取历史考试
        method: "POST",
        // 请求头部  
        header: {
          //'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          rows: this.data.rows,
          page: page,
          jzid: getApp().globalData.jiaozhengid
        },
        success: function (res) {
          if (res.data.msg == "success") {
            var list = res.data.maplist
            // 设置数据  
            that.setData({
              psyReportList: that.data.psyReportList.concat(list),
              xinlipage: page + 1
            })
          } else {
            that.setData({
              xlhadLastPage: true
            })
            wx.showToast({
              title: '到底啦',
            })
          }
        }
      })
    }
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
  tzceshijieguo: function (e) {
    var psyreportid = e.currentTarget.dataset.psyreportid;
    wx.navigateTo({
      url: '../ceshijieguo/ceshijieguo?psyrepid=' + psyreportid,
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

    this.rectifyPeople();//矫正人员信息
    this.currentCourse();//当月课程
    this.historyCourse();//历史课程
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
    // this.onLoad();

    // 在线考试刷新
    if (this.data.zaixks_wxz == false && this.data.zaixks_xz == true) {
      this.zaixiankaoshi()
    }
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
    if (this.data.kechxz_xz){//是否选择是课程学习
      this.historyCourse();//历史课程
    }

    // 在线考试上拉触底
    if (this.data.zaixks_wxz == false && this.data.zaixks_xz == true) {
      this.ksloadList();
    }
      // 心理评估上拉触底 
    if (this.data.xinlpg_wxz == false && this.data.xinlpg_xz == true) {
      this.loadPsyReportList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})