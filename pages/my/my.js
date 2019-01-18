// pages/my/my.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:[]
  },
  //   待付款
    payment (){
        wx.navigateTo({
            url: '../my/payment/payment',
        })
    },
    //   待发货
    delivery() {
        wx.navigateTo({
            url: '../my/delivery/delivery',
        })
    },
//   已发货
 shipped() {
        wx.navigateTo({
            url: '../my/shipped/shipped',
        })
    },
//   已完成
 completed() {
        wx.navigateTo({
            url: '../my/completed/completed',
        })
    },
    // 我的订单
 gomyoder(){
wx.navigateTo({
    url: 'myoder/myoder',
})
 },
  onLoad:function (options) {
      var that=this
      wx.getStorage({
          key: 'userInfo',
          success: function (res) {
              console.log(res.data)
              that.setData({
                  userInfo: res.data
              })
          }
      })
      wx.getStorage({
          key: 'ouid',
          success: function (res) {
              console.log(res.data)
            //   that.setData({
            //       ouid: res.data
            //   })
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
  
  }
})