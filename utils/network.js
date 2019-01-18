
var API_URL = 'http://jsmall.test.bronet.cn/index.php/Api/'

var requestHandler = {
    url: "",
    header: "",
    params: {},
    success: function (res) {
        // success
    },
    fail: function () {
        // fail
    },
}

//GET请求
function GET(requestHandler) {
    request('GET', requestHandler)
}
//POST请求
function POST(requestHandler) {
    request('POST', requestHandler)
}

function request(method, requestHandler) {
    //注意：可以对params加密等处理
    var params = requestHandler.params;
    var url = requestHandler.url;
    var header = requestHandler.header;
    wx.request({
        url: API_URL + url,
        data: params,
        method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            'content-type': header
        }, // 设置请求的 header
        success: function (res) {
            //注意：可以对参数解密等处理
            requestHandler.success(res)
        },
        fail: function () {
            requestHandler.fail()
        },
        complete: function () {
            // complete
        }
    })
}

module.exports = {
    GET: GET,
    POST: POST
}