/**
 * 默认程序设置 会被写如localStorage
 */
var SETTING = {
    //	version: '0.1.1',
    //	avatar: {
    //		enabled: true,
    //		hd: false
    //	},
    //	image: {
    //		enabled: true,
    //		hd: false
    //	},
    //	tail: '\n----------\n来自 - CNode.js ionic',
    //	reset: false // 重大版本更新，需要重置客户端设置
};



var API_HOST = "http://ground.kxfresh.com:8188";
//var API_HOST = 'http://wxkxs.deliverfruit.com/';
//var API_HOST = 'http://192.168.233.216:8080';
//var API_HOST = 'http://192.168.233.209:8080';

var API = {



    //登录接口
    LOGIN: API_HOST + "/api/appAccount/login",

    //信息列表接口
    APPLIST: API_HOST + "/api/msg/appList",
    //信息详细页接口
    APPDETAIL: API_HOST + "/api/msg/noticeDetail/",
    //用户未读消息
    UNREADMSG: API_HOST + "/api/msg/uncheckedMsgList",
//修改未读装状态
    UPDATESTATE: API_HOST + "/api/msg/changeNoticeStatus/",

    //获取商品列表
    GETGOOD: API_HOST + "/api/food/foodDetailList",
    //提交订单
    COMMITORDER: API_HOST + "/api/shopOrder/create",
    //订货单订单接口
    ORDERLIST: API_HOST + "/api/shopOrder/list",
    //订货单详情接口
    ORDERDETAIL: API_HOST + "/api/shopOrder/detail/",
    //取消订货单
    ORDERCANCEL: API_HOST + "/api/shopOrder/cancel",
    //订货单收货
    ORDERRECEIVED: API_HOST + "/api/shopOrder/receive",
    //订货单付款前
    PAYSTART: API_HOST + "/api/shopOrder/payment",
    //修改订货单支付状态
    PAYEND: API_HOST + "/api/shopOrder/payment/confirmation",


    //意见反馈接口
    SUGGESTIONCOMMIT: API_HOST + "/api/suggestion/add",
    //意见列表
    SUGGESTIONLIST: API_HOST + "/api/suggestion/frontList",
    //意见详细
    SUGGESTIONDETAIL: API_HOST + "/api/suggestion/frontDetail/",
    //意见取消
    SUGGESTIONCANCEL: API_HOST + "/api/suggestion/cancel",


};




var saveCache = function (key, value) {
    window.localStorage.setItem(key, typeof value == 'object' ? JSON.stringify(value) : value);
};
var getCache = function (key) {
    return window.localStorage.getItem(key) || null;
};



//屏幕宽度
var width_screen=screen.width;
var height_screen=screen.height;
var availWidth_screen=screen.availWidth;
var availHeight_screen=screen.availHeight;
var colorDepth_screen=screen.colorDepth;



////图片数组
//var picArray = [];
