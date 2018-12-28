var autoTakePhone;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shualiandl:false,
    facemsg:'',
  },
  tzldz:function(){
    this.setData({
      shualiandl: true,//是否展示刷脸窗口
    });
    var that=this;
    autoTakePhone=setInterval(function(){
      that.setData({
        facemsg: '',
      })
      that.takePhoto();
    },3000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let itemid = options.itemid;
    var that=this;
    wx.request({
      url: getApp().globalData.url + '/labor/getLaborItemById', //获取义务劳动内容
      data: {id:itemid},
      header: {
        'Cookie': getApp().globalData.header.Cookie, //获取app.js中的请求头
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          laborItem: res.data,
        });
        let title='';
        if (res.data.status == 0){
          title='审核中';
        } else if (res.data.status == 1) {
          title = '审核未通过';
        } else if (res.data.status == 2) {
          title = '审核通过';
        }
        console.log(title);
        wx.setNavigationBarTitle({
          title: title,
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  /**
   * 刷脸登录
   */
  takePhoto: function () {
    let that=this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        // this.setData({ logindisabled: true });
        var header = getApp().globalData.header; //获取app.js中的请求头
        wx.uploadFile({
          url: getApp().globalData.url + '/course/face',
          filePath: res.tempImagePath,
          header: header,
          formData: {
            telephone: wx.getStorageSync("username")
          },
          name: 'file',
          success: (res) => {
            wx.hideLoading();
            var data = JSON.parse(res.data);
            if (data.msg == "OK") {
              wx.redirectTo({
                url: '../kaishilaodong/kaishilaodong?itemid='+this.data.laborItem.id,
              })
              clearInterval(autoTakePhone);
            } else {
             that.setData({
               facemsg:data.msg
             })
            }

          }
        })
      }
    })
  },
})