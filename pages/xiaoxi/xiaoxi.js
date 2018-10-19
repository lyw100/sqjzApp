Page({

  /**
   * 页面的初始数据
   */
  data: {
    style:{
      xtshuzishow: "none",
      xwshuzishow: "none",
    },
    xtshuzi:"",
    xwshuzi: "",
    xwtitle:""
  },
  /** 跳转系统消息页面 */
  tzxtxx:function(){
    wx.request({
      url: getApp().globalData.url + '/weChat/msg/goXTXX',
      header: getApp().globalData.header, //获取app.js中的请求头
      success(res) {
        if(res.data.msg==""){
          wx.navigateTo({
            url: '../xitongxiaoxi/xitongxiaoxi',
          });
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
          
      }
    })
  },
  /** 跳转新闻消息页面 */
  tzxwxx: function () {
    wx.navigateTo({
      url: '../xinwenxiaoxi/xinwenxiaoxi',
    });
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: getApp().globalData.url + '/weChat/msg/getMsg',
      header: getApp().globalData.header, //获取app.js中的请求头
      success(res) {
        
        var data =res.data;
        //系统消息
        var xtshuzishow="";
        if (data.xtcount=="0"){
          data.xtcount="";
          xtshuzishow= "none";
        }
        
        //新闻消息
        var xwshuzishow = "";
        if (data.xwcount == "0") {
          var xwshuzishow='none';
          data.xwcount="";
        } 
        //赋值
        that.setData({
          xtshuzi: data.xtcount,
          xwshuzi: data.xwcount,
          xwtitle: data.xwtitle,
          style: {
            xtshuzishow: xtshuzishow,
            xwshuzishow: xwshuzishow,
          }
        })
      
      }
    })
  },
})
