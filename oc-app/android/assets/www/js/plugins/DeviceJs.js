getDeviceInfo = function (data) {

//    if(getCache("DeviceInfo") == null){
//        alert("设备为空");
//    }
    if (data == "true") {
        //旺pos设备
        saveCache("DeviceInfo","wangpos");
    } else {
        //普通android设备
        saveCache("DeviceInfo","android");
    }

    
 
//    alert("设备为："+getCache("DeviceInfo"));
}