// pages/my/completed/completed.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    //   待付款
    payment() {
        wx.redirectTo({
            url: '../payment/payment',
        })
    },
    //   待发货
    delivery() {
        wx.redirectTo({
            url: '../delivery/delivery',
        })
    },
    //   已发货
    shipped() {
        wx.redirectTo({
            url: '../shipped/shipped',
        })
    },
    //   已完成
    completed() {
        wx.redirectTo({
            url: '../completed/completed',
        })
    },
    //   去详情页面
    pay() {
        wx.navigateTo({
            url: '../pay/pay?type=4',
        })
    },
    //   去评论页面
    gocomment() {
        wx.navigateTo({
            url: '../comment/comment',
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