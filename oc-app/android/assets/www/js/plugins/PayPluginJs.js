payPluginJsResult = function (data) {

    var errcode = data.substring(0, 1);
    var id = data.substring(1, data.length);
    console.log(errcode + "=================" + id);

    if (errcode != 0) {
        console.log("付款失败 ！");
        new Toast({
            message: '支付失败'
        }).show();
        return;
    } else {
        console.log("付款成功 ！");


        var optss = {
            success: function (data) {
                console.log("更改支付状态改变接口返回：");
                console.log(data);

                if (data.code == 0) {
                    console.log("更改支付状态成功 ！");

                    new Toast({
                        message: '支付成功 确认中 ！'
                    }).show();
                } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {
                    console.log("--------------------------重新登录");
                    window.location.href = "./login.html";
                }

            },
            data: {
                token: getCache("token"),
                id: data,
            },
            dataType: 'json',
            type: "POST"
        }
        optss.url = API.PAYEND;
        $.ajax(optss);
    }


};



//    console.log(getCache("token"));
//
//    var optss = {
//        success: function (data) {
//            console.log("更改支付状态改变接口返回：");
//            console.log(data);
//
//            if (data.code == 0) {
//                
//            } else if (data.code == 1015 || data.code == 1016 || data.code == 1017) {
//                console.log("--------------------------重新登录");
//                window.location.href = "./index-new.html";
//            }
//
//        },
//        data: {
//            token: getCache("token"),
//            id: data,
//        },
//        dataType: 'json',
//        type: "POST"
//    }
//    optss.url = API.PAYEND;
//    $.ajax(optss);