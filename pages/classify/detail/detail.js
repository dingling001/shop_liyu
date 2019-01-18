// pages/classify/detail/detail.js
var network = require("../../../utils/network.js");
const app = getApp();
var p = 1;

// 请求数据
var loadMore = function (that) {
    that.setData({
        hidden: false
    });
    wx.showNavigationBarLoading() //在标题栏中显示加载
    network.POST({
        url: "Index/ajax_goods_term",
        header: "application/x-www-form-urlencoded",
        params: {
            p: p,
            termid: that.data.term_id,
            order: that.data.order
        },
        success: (res) => {
            console.log(res)
            if (res.data.state == 'success') {
                var goodsList = that.data.goodsList;
                for (var i = 0; i < res.data.goods.length; i++) {
                    goodsList.push(res.data.goods[i]);
                }
                console.log(goodsList)
                that.setData({
                    goodsList: goodsList
                })
                p++;
                that.setData({
                    hidden: true
                });
                console.log(p)
            }
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        },
        fail: (erro) => {
            //失败后
            console.log(erro)
        },

    })
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rankchecked: true,
        term_id: '',
        scrollTop: 43+'rpx',
        scrollHeight: 0,
        hidden: true,
        goodsList: [],
        order:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.term_id);
        this.setData({
            term_id: options.term_id
        })
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        })
        loadMore(that);
    },
    // 综合
    multiple() {
        var that = this;
        that.setData({
            goodsList: []
        })
        p = 1
        that.setData({
            order: 0,
            goodsList: that.data.goodsList
        })
        loadMore(that);
        console.log(that.data.order)
    },
    // 销量
    sales(){
        var that = this;
        that.setData({
            order: 1,
            goodsList: that.data.goodsList
        })
        loadMore(that);
        console.log(that.data.order)
    },
    lastnew(){
        var that = this;
        that.setData({
            order: 2,
            goodsList: that.data.goodsList
        })
        loadMore(that);
        console.log(that.data.order)
    },
    // 价格
    price() {
        var that = this;
        that.setData({
            order: 3,
            goodsList: that.data.goodsList
        })
        loadMore(that);
        console.log(that.data.order)
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
        wx.showNavigationBarLoading() //在标题栏中显示加载
        //模拟加载
        setTimeout(function () {
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
    },
    bindDownLoad: function () {
        var that = this;
        loadMore(that);
        console.log("lower");
    },
    scroll: function (event) {
        //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
        this.setData({
            scrollTop: event.detail.scrollTop
        });
    },
    topLoad: function (event) {
        //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
        p = 1;
        this.setData({
            goodsList: [],
            scrollTop: 0
        });
        loadMore(this);
        console.log("lower");
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