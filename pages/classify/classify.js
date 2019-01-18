// pages/classify/classify.js
var network = require("../../utils/network.js")
Page({
    /**
     * 页面的初始数据
     */
    data: {
        terms: [],
    },
    godetail(event){    
        var term_id = event.currentTarget.dataset.id;
        console.log(term_id);
wx.navigateTo({
    url: 'detail/detail?term_id=' + term_id
})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getterms()
    },
    getterms() {
        var params = new Object;
        // var that=this;
        network.POST({
            url: "Index/terms",
            header: "application/x-www-form-urlencoded",
            params: '',
            success: (res) => {
                console.log(res)
                if (res.data.state == 'success') {
                    this.setData({
                        terms: res.data.terms
                    })
                }
            },
            fail: function () {
                //失败后
            },
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