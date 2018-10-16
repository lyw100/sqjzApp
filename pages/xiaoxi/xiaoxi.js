Page({

  /**
   * 页面的初始数据
   */
  data: {
 
  },
  /** 跳转系统消息页面 */
  tzxtxx:function(){
    wx.navigateTo({
      url: '../xitongxiaoxi/xitongxiaoxi',
    });
  },
  /** 跳转新闻消息页面 */
  tzxwxx: function () {
    wx.navigateTo({
      url: '../xinwenxiaoxi/xinwenxiaoxi',
    });
  },
})