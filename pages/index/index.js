//index.js
//获取应用实例
var network = require("../../utils/network.js")
var imageUtil = require('../../utils/util.js');
const app = getApp()
var px2rpx = 2, windowWidth = 375;
var p = 1;
// var params = new Object;
// params.p=p


// 请求数据
var loadMore = function (that) {
    that.setData({
        hidden: false
    });
    wx.showNavigationBarLoading() //在标题栏中显示加载
    network.POST({
        url: "index/ajax_goods_home",
        header: "application/x-www-form-urlencoded",
        params: { p: p },
        success: (res) => {
            // console.log(res.data.goods)
            if (res.data.state == 'success') {
                var goods = that.data.goods;
                for (var i = 0; i < res.data.goods.length; i++) {
                    goods.push(res.data.goods[i]);
                }
                console.log(goods)
                that.setData({
                    goods: goods
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
    data: {
        banners: [],
        recom: [],
        imageSize: {},
        params: {},
        imagewidth: 0,//缩放后的宽 
        imageheight: 0,//缩放后的高 
        scrollTop: 0,
        scrollHeight: 0,
        hidden: true,
        goods: []
    },
    //事件处理函数

    previewImage(event) {
        var index = event.currentTarget.dataset.id;
        console.log(index);
        //   wx.previewImage({
        //       current: ' ', // 当前显示图片的http链接
        //       urls:this.data.movies[index].url
        //   })
    },
    goSearch() {
        wx.navigateTo({
            url: 'search/search',
        })
    },
    gogoods(event) {
        var id = event.currentTarget.id 
        console.log(id);
        wx.navigateTo({
            url: 'goodsdetail/goodsdetail?id='+id,
        })
    },
    imageLoad: function (e) {
        //单位rpx
        var originWidth = e.detail.width * px2rpx,
            originHeight = e.detail.height * px2rpx,
            ratio = originWidth / originHeight;
        var viewWidth = 710, viewHeight//设定一个初始宽度
        //当它的宽度大于初始宽度时，实际效果跟mode=widthFix一致
        if (originWidth >= viewWidth) {
            //宽度等于viewWidth,只需要求出高度就能实现自适应
            viewHeight = viewWidth / ratio;
        } else {
            //如果宽度小于初始值，这时就不要缩放了
            viewWidth = originWidth;
            viewHeight = originHeight;
        }
        var imageSize = this.data.imageSize;
        imageSize[e.target.dataset.index] = {
            width: viewWidth,
            height: viewHeight
        }
        this.setData({
            imageSize: imageSize
        })
        console.log(this.imageSize);
    },
    onLoad: function () {
        var that = this;
        var openId = (wx.getStorageSync('openId'))
        if (openId) {
            wx.getUserInfo({
                success: function (res) {
                    that.setData({
                        nickName: res.userInfo.nickName,
                        avatarUrl: res.userInfo.avatarUrl,
                    })
                },
                fail: function () {
                    // fail
                    console.log("获取失败！")
                },
                complete: function () {
                    // complete
                    console.log("获取用户信息完成！")
                }
            })
        } else {
            wx.login({
                success: function (res) {
                    console.log(res.code)
                    if (res.code) {
                        wx.getUserInfo({
                            withCredentials: true,
                            success: function (res_user) {
                                console.log(res_user)
                                network.POST({
                                    //后台接口地址
                                    url: 'User/register',
                                    header: "application/x-www-form-urlencoded",
                                    params: {
                                        code: res.code,
                                        nickname: res_user.userInfo.nickName,
                                        headimg: res_user.userInfo.avatarUrl
                                    },
                                    success: (res) => {
                                        console.log(res);
                                        wx.setStorageSync('ouid', res.data.ouid);
                                        wx.setStorage({
                                            key: 'userInfo',
                                            data: res_user.userInfo
                                        })
                                    }
                                })
                            }, fail: function () {
                                wx.showModal({
                                    title: '提示',
                                    content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                                    success: function (res) {
                                        if (res.confirm) {
                                            wx.openSetting({
                                                success: (res) => {
                                                    if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                                                        wx.login({
                                                            success: function (res_login) {
                                                                if (res_login.code) {
                                                                    console.log(res_login.code)
                                                                    wx.getUserInfo({
                                                                        withCredentials: true,
                                                                        success: function (res_user) {
                                                                            network.POST({
                                                                                //后台接口地址
                                                                                url: 'User/register',
                                                                                header: "application/x-www-form-urlencoded",
                                                                                params: {
                                                                                    code: res_login.code,
                                                                                    nickname: res_user.userInfo.nickName,
                                                                                    headimg: res_user.userInfo.avatarUrl
                                                                                },
                                                                                success: (res) => {
                                                                                    wx.setStorageSync('ouid', res.data.ouid);
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                        });
                                                    }
                                                }, fail: function (res) { }
                                            })

                                        }
                                    }
                                })
                            }, complete: function (res) {
                            }
                        })
                    }
                }
            })
        }
        this.getbanner()
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                windowWidth = res.windowWidth;
                px2rpx = 750 / windowWidth;
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        })
        loadMore(that);
    },

    // 获取bannner 和推荐信息
    getbanner() {
        var params = new Object;
        // var that=this;
        network.GET({
            url: "index/index",
            header: "application/x-www-form-urlencoded",
            params: '',
            success: (res) => {
                console.log(res)
                if (res.statusCode == 200) {
                    this.setData({
                        banners: res.data.banners,
                        recom: res.data.recom
                    })
                }
            },
            fail: function () {
                //失败后
            },
        })

    },
    //res就是我们请求接口返回的数据
    imageLoad: function (e) {
        var imageSize = imageUtil.imageUtil(e)
        this.setData({
            imagewidth: imageSize.imageWidth,
            imageheight: imageSize.imageHeight
        })
    },
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        //模拟加载
        setTimeout(function () {
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
    },
    //页面滑动到底部
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
            goods: [],
            scrollTop: 0
        });
        loadMore(this);
        console.log("lower");
    },

})