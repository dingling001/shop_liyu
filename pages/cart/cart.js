// pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [
            { name: '胡桃木质音乐盒', value: '胡桃木质音乐盒', num: 1, checked: false },
            { name: '胡桃木质音乐盒', value: '胡桃木质音乐盒', num: 2, checked: false },
            { name: '胡桃木质音乐盒', value: '胡桃木质音乐盒', num: 3, checked: false },
        ],
        total:'100000.00' ,
        paynum:1
    },
    onLoad: function (options) {
        //   this.checkboxChange()
    },
    //   减法
    minnus(e) {
        const index = e.currentTarget.dataset.index;
        let items = this.data.items;
        let num = items[index].num;
        if (num <= 1) {
            return false;
        }
        num = num - 1;
        items[index].num = num;
        this.setData({
            items: items
        });
    },
    //   加法
    plus(e) {
        const index = e.currentTarget.dataset.index;
        let items = this.data.items;
        let num = items[index].num;
        num = num + 1;
        items[index].num = num;
        this.setData({
            items: items
        })
    },
    // 删除商品
    deleteList(e) {
        const index = e.currentTarget.dataset.index;
        let items = this.data.items;
        console.log(items[index].checked);
        if (items[index].checked == true) {
            wx.showModal({
                title: '提示',
                content: '确定要删除这件商品吗？',
                success: (sm) => {
                    if (sm.confirm) {
                        items.splice(index, 1);              // 删除购物车列表里这个商品
                        this.setData({
                            items: items
                        });
                        // 用户点击了确定 可以调用删除方法了
                    } else if (sm.cancel) {
                        //   console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.showToast({
                title: '没有选择商品哦~',
                icon: 'loading',
                duration: 1200
            })
        }
        if (!items.length) {                  // 如果购物车为空
            this.setData({
                hasList: false              // 修改标识为false，显示购物车为空页面
            });
        } else {                              // 如果不为空

        }
    },

    checkboxChange: function (e) {
        console.log(e.detail.value)
        const index = e.currentTarget.dataset.index;
        let items = this.data.items;
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