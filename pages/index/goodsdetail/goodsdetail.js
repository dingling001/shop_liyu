// pages/index/goodsdetail/goodsdetail.js

var network = require("../../../utils/network.js")
var selectIndex;//选择的大规格key
var attrIndex;//选择的小规格的key
var selectIndexArray = [];//选择属性名字的数组
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: [],
        comments: [],
        index: 1,
        ouid: '',
        id: '',
        num: 1,
        // 使用data数据对象设置样式名  
        minusStatus: 'disabled',
        attrValueList: [],
        selectName: "",//已选的属性名字
        selectAttrid: [],//选择的属性id
    },
    onSlideChangeEnd: function (e) {
        var that = this;
        that.setData({
            index: e.detail.current + 1
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        console.log(this.data.id)
        var that = this;
        wx.getStorage({
            key: 'ouid',
            success: function (res) {
                that.setData({
                    ouid: res.data
                })
            },
        })
        this.getdetail()
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
    getdetail() {
        var that = this
        network.POST({
            url: "Index/detail_good",
            header: "application/x-www-form-urlencoded",
            params: {
                ouid: that.data.ouid,
                id: that.data.id
            },
            success: (res) => {
                console.log(res.data);
                if (res.data.state == 'success') {
                    that.setData({
                        comments: res.data.comments,
                        info: res.data.info,
                        attrValueList: res.data.info.standard
                    });
                    var attrValueList = that.data.attrValueList
                    console.log(attrValueList)
                    for (var i = 0; i < attrValueList.length; i++) {
                        for (var j = 0; j < attrValueList[i].stval.length; j++) {
                            if (attrValueList[i].attrValueStatus) {
                                attrValueList[i].attrValueStatus[j] = false;
                            } else {
                                attrValueList[i].attrValueStatus = [];
                                attrValueList[i].attrValueStatus[j] = false;
                            }
                        }
                    }
                    that.setData({
                        attrValueList: attrValueList
                    });
                    console.log(that.data.attrValueList)
                } else {
                    wx: wx.showToast({
                        title: '暂无数据',
                        icon: none,
                        image: '',
                        duration: 2000
                    })
                }

            },
            fail: (erro) => {
                //失败后
                console.log(erro)
            },
        })
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
     * 页面上拉触底 事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // 收藏
    collection() {
        wx.navigateTo({
            url: 'test/test',
        })
    },
    // 购物车
    shopping() {
        wx.navigateTo({
            url: 'test2/test2',
        })
    },
    tagChoose(e) {
        var selectIndex = e.currentTarget.dataset.selectIndex;
        var attrIndex = e.currentTarget.dataset.attrIndex;
        var spec = this.data.attrValueList;
        var count = spec[selectIndex].stval.length;

        for (var i = 0; i < count; i++) {
            spec[selectIndex].attrValueStatus[i] = false;
        }
        spec[selectIndex].attrValueStatus[attrIndex] = true;
        var name = spec[selectIndex].stval[attrIndex];//点击属性的名称
        var selectName = "";
        selectIndexArray[selectIndex] = name;
        var selectIndexArraySize = selectIndexArray.length;
        for (var i = 0; i < selectIndexArraySize; i++) {
            selectName += ' "' + selectIndexArray[i] + '" ';
        }
        this.setData({
            attrValueList: spec,//变换选择框
            selectName: selectName,
        });
        console.log(this.data.selectName);
        //设置当前样式

    },

    /* 点击减号 */
    bindMinus: function () {
        var num = this.data.num;
        // 如果大于1时，才可以减  
        if (num > 1) {
            num--;
        }
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 将数值与状态写回  
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },
    /* 点击加号 */
    bindPlus: function () {
        var num = this.data.num;
        // 不作过多考虑自增1  
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus = num < 1 ? 'disabled' : 'normal';
        // 将数值与状态写回  
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },
    /* 输入框事件 */
    bindManual: function (e) {
        var num = e.detail.value;
        // 将数值与状态写回  
        this.setData({
            num: num
        });
    }

})