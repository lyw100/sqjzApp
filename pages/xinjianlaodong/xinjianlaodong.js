Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    multiArray: [['12月22日', '12月23日', '12月24日'], ['01', '02', '03', '04', '05'], ['00', '05']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '12月22日'
        },
        {
          id: 1,
          name: '12月23日'
        },
        {
          id: 2,
          name: '12月24日'
        }
      ], [
        {
          id: 0,
          name: '01'
        },
        {
          id: 1,
          name: '02'
        },
        {
          id: 2,
          name: '03'
        },
        {
          id: 3,
          name: '04'
        },
        {
          id: 3,
          name: '05'
        }
      ], [
        {
          id: 0,
          name: '00'
        },
        {
          id: 1,
          name: '05'
        }
      ]
    ],

    index: 0,
    multiArrayy: [['12月26日', '12月27日', '12月28日'], ['01', '02', '03', '04', '05'], ['00', '05']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '12月26日'
        },
        {
          id: 1,
          name: '12月27日'
        },
        {
          id: 2,
          name: '12月28日'
        }
      ], [
        {
          id: 0,
          name: '01'
        },
        {
          id: 1,
          name: '02'
        },
        {
          id: 2,
          name: '03'
        },
        {
          id: 3,
          name: '04'
        },
        {
          id: 3,
          name: '05'
        }
      ], [
        {
          id: 0,
          name: '00'
        },
        {
          id: 1,
          name: '05'
        }
      ]
    ],
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndexx: e.detail.value
    })
  },
  bindTextAreaBlur(e) {
    console.log(e.detail.value)
  },
  // 点击劳动地点跳转chakan页面
  shurulaodongdid: function () {
    wx.navigateTo({
      url: '../chaxun/chaxun',
    })
  },
  // 点击提交跳转义务劳动页面
  tz_ywld: function () {
    wx.navigateBack({
      url: '../yiwulaodong/yiwulaodong',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  }
})