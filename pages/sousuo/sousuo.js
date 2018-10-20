
var page = 2;
Page({
   /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    path:'https://www.tksqjz.com/SQJZ',
    //path: 'http://localhost:8080/SQJZ',
    qkch:false,//清空
    zhuyesousuo:true,
    ssnrjieguo:false,
    djjg: false,
    xuankeShow:true,
    yixuanShow:false,
    zcfgym:true,
    ddjy:false,
    sxjkjyym:false,
    inputText:"",
    hotList:[],//热点搜索
    topList:[],//搜索框查询list
    relateList:[],//相关资料
    listAll:[],//查询返回的所有数据
    sercherStorage: [],//搜索历史列表
    sercherList:[],//用于倒序展示搜索历史
    StorageFlag: false, //显示搜索记录标志位
    height:64,
    choiceId:0//查询结果顶部标签选中id
  },
  shouyebof: function () {
    wx.navigateTo({
      url: '../shouyebofang/shouyebofang',
    });
  },
  //顶部搜索框输入
  iptchufa:function(e){
    var self=this;
    var text=e.detail.value
    if (text ==""){
      this.setData({
        qkch : false,
        ssnrjieguo: false,
        zhuyesousuo:true,
        djjg:false
      })
      
    }else{
      this.setData({
        qkch: true,
        zhuyesousuo: false,
        ssnrjieguo: true,
        djjg: false,
        inputText: e.detail.value
      })
    }
    
    wx.request({
      url: this.data.path + '/search/searchByName',
      data: { name: e.detail.value },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success(res) {
        var list=res.data;
        self.setData({
          searchList:list
         
        })
        
      }
    })
  },
  ssjieguo:function(){
    this.setData({
      qkch: false,
      zhuyesousuo: false,
      ssnrjieguo:false,
      djjg:true,
    })
  },
  xzkc:function(){
    // this.setData({
    //   xuankeShow: false,
    //   yixuanShow: true
    // })
  },
  yiyuankecheng: function () {
    // this.setData({
    //   xuankeShow: true,
    //   yixuanShow: false
    // })
  },

   /**
   * 政策法规 tab 页切换
   */
  zcfganniu:function(e){
    var id=e.currentTarget.id;
    var list=this.data.listAll;
    var top=[];
    var relate=[];
    var subjectId;
    for(var i=0;i<list.length;i++){
      if(id==list[i].subjectId){
        top=list[i].top;
        relate=list[i].relate;
        subjectId=list[i].subjectId;
      }
    }
    this.setData({
      zcfgym: true,
      ddjy: false,
      sxjkjyym: false,
      topList: top,//搜索框查询list
      relateList: relate,//相关资料
      choiceId:subjectId
    })
  },
  ddwhanniu: function () {
    this.setData({
      zcfgym: false,
      ddjy: true,
      sxjkjyym: false,
    })
  },

  sxjkjyanniu: function () {
    this.setData({
      zcfgym: false,
      ddjy: false,
      sxjkjyym: true,
    })
  },
  /**
   * 跳转到播放页面
   */
  tzbfyemain:function(e){
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/shouyebofang/shouyebofang?record=record&courseid='+id,
    });
  },

  /**
   * 点击搜索主页面内容跳转结果页面
   */
  tzsouzuojieguoym: function () {
    this.setData({
      qkch: true,
      zhuyesousuo: false,
      ssnrjieguo: false,
      djjg: true,
    })
  },
  //搜索框回车
  inputConfirm:function(e){
    var text = e.detail.value;
    this.setData({
      inputText:text,
      ssnrjieguo:false
    })
    //判断是否加入搜索历史
    var searchData = this.data.sercherStorage;
    var flag=true;
    for(var i=0;i<searchData.length;i++){
      if(text==searchData[i].name){
        flag=false
      }
    }
    if(flag){
      searchData.push({name:text})
      wx.setStorageSync('searchData', searchData)
    }
    this.search();
  },
  //搜索功能
  search:function(){
      var path=this.data.path;
      var self=this;
      page=2;
    wx.showNavigationBarLoading() //在标题栏中显示加载
      wx.request({
        url: path+'/search/list',
        data:{
          name:this.data.inputText,
          page:1,
          rows:5
          },
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded'},
        success(res){
          if(res.data.msg=="OK"){
            if(res.data.listAll.length>0){
              var choiceId = self.data.choiceId;
              if (choiceId == 0) {
                self.setData({
                  djjg: true,
                  topList: res.data.top,
                  relateList: res.data.relate,
                  listAll: res.data.listAll,
                  choiceId: res.data.listAll[0].subjectId
                })
              } else {
                var listAll = res.data.listAll;
                for (var i = 0; i < listAll.length; i++) {
                  if (choiceId == listAll[i].subjectId) {
                    self.setData({
                      djjg: true,
                      topList: listAll[i].top,
                      relateList: listAll[i].relate,
                      listAll: res.data.listAll,
                      choiceId: listAll[i].subjectId
                    })
                  }
                }
              }
            }else{
              self.setData({
                djjg: true,
                topList: [],
                relateList: [],
                listAll: [],
                choiceId: 0
              })
            }
          }
        },
        complete:function(){
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
  },
  //清除搜索框
  clearInput:function(){
    this.setData({
      inputText:"",
      qkch:false,
      ssnrjieguo: false,
      zhuyesousuo: true,
      djjg:false
      })
  },
  //清除缓存历史
  clearSearchStorage: function () {
    wx.removeStorageSync('searchData')
    this.setData({
      sercherStorage: [],
      StorageFlag: false,
      //zhuyesousuo:false
    })
  },
  //搜索历史下拉箭头
  changeHeight:function(e){
    this.setData({
      height: 'auto'
    })
  },
  //打开搜索历史
  openLocationsercher: function () {
    var list=wx.getStorageSync('searchData')||[];
    var history=[];
    if(list.length>0){
        for(var i=list.length-1;i>=0;i--){
          history.push(list[i]);
        }
    }
    this.setData({
      sercherStorage: wx.getStorageSync('searchData') || [],
      StorageFlag: true,
      sercherList:history
      //listFlag: true,
    })
  },
  //点击缓存搜索列表
  tapSercherStorage: function (e) {
    var name = e.currentTarget.dataset.name;
        //将所选的搜索历史加到搜素框
        this.setData({
          inputText: name,
          StorageFlag: false,
          zhuyesousuo:false,
          qkch:true
        })
    this.search();
  },  
  //添加搜索历史
  setSercherStorage:function(e){
    this.setData({
      qkch: false,
      zhuyesousuo: false,
      ssnrjieguo: false,
      djjg: true,
    })

    var self = this;
    if (self.data.inputText.length == 0) {
      return;
    }
    //控制搜索历史
      var text = e.currentTarget.dataset.name;
      var searchData=this.data.sercherStorage;
      var flag=true;
    //将所选的搜索历史加到搜素框
    this.setData({
      inputText: text,
      StorageFlag: false,
    })
    for (var i = 0; i < searchData.length; i++) {
        if (text==searchData[i].name ) {
          flag=false;
        }
      }
      //将搜索记录更新到缓存
      if(flag){
       // var searchData = self.data.sercherStorage;
        searchData.push({
          //id: searchData.length,
          name: this.data.inputText
        })
        wx.setStorageSync('searchData', searchData);
        self.setData({ StorageFlag: false, })
      }
    var path = this.data.path;
    wx.request({
      url: path + '/search/editClicks',
      data: { courseId: e.currentTarget.id },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success(res) {
      }
    })
    this.search();
    
  },
  /**
   * 上拉加载更多
   */
  loadMore:function(){
      var name=this.data.inputText;//搜索框内容
      var subjectId=this.data.choiceId;//科目id
      var path=this.data.path;
      var self=this;
    wx.showLoading({
      title: '加载中'
    })
      wx.request({
        url: path+'/search/loadMore',
        data:{
          name:name,
          subjectId:subjectId,
          page:page,
          rows:5
        },
        method:'POST',
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success(res){
          var relateList=self.data.relateList;
          if(res.data.msg=="OK"){
            var list=res.data.list;
            if(list.length>0){
              for (var i = 0; i < list.length; i++) {
                relateList.push(list[i])
              }
              self.setData({
                relateList: relateList
              })
              page++;
              
            }
          }
        },
        complete:function(){
          setTimeout(function(){
            wx.hideLoading()
          },1000)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //搜索历史
    this.openLocationsercher();
    //热点搜索list
    var self = this;
    var path=this.data.path;
    wx.request({
      url: path+'/search/hotList',
      data:{},
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        self.setData({
          hotList:res.data.list
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
      this.search();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})