//cordova.define("arko.dzb.biz.app.plugins.JpushPlugin", function (require, exports, module) {
//    var JPushPlugin02 = function () {};
//
//    /*
//     *
//     * Licensed to the Apache Software Foundation (ASF) under one
//     * or more contributor license agreements.  See the NOTICE file
//     * distributed with this work for additional information
//     * regarding copyright ownership.  The ASF licenses this file
//     * to you under the Apache License, Version 2.0 (the
//     * "License"); you may not use this file except in compliance
//     * with the License.  You may obtain a copy of the License at
//     *
//     *   http://www.apache.org/licenses/LICENSE-2.0
//     *
//     * Unless required by applicable law or agreed to in writing,
//     * software distributed under the License is distributed on an
//     * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
//     * KIND, either express or implied.  See the License for the
//     * specific language governing permissions and limitations
//     * under the License.
//     *
//     */
//
//    var exec = require('cordova/exec');
//
//    /**
//     * Provides access to the vibration mechanism on the device.
//     */r
jpushOpenNotification = function (data) {
    console.log("===============================================================");
    console.log(data);

    var obj = eval("(" + data + ")");
//    alert(data);
//    alert(obj["orderId"]);
    var noticeId = obj["msgSendId"];
    var orderId = obj["orderId"];
    var orderStatus = obj["orderStatus"];

    //    window.location.href="index.html#/notice-detail?noticeId="+data;
    window.location.href = "index.html#/order-detail?orderId=" + orderId + "&orderStatus=" + orderStatus;
}