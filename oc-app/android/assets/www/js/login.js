angular.module('app', ['ionic']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: "template/login.html"
    });
    $urlRouterProvider.otherwise('/login');
}).controller("LoginCtrl", function ($scope, $window, $http, $ionicLoading) {
//    var name = getCache("username");
//    var password = getCache("userpassword");
//    console.log(name+" ---  "+password);
//    if (name == null || password == null) {
//        $scope.userName = "";
//        $scope.userPassword = "";
//    } else {
//        $scope.userName = name;
//        $scope.userPassword = password;
//    }

    $scope.userName= getCache("username");
    $scope.userPassword = getCache("userpassword");

    $scope.commitLogin = function (name, password) {
        console.log("---" + name + "  " + password + "  " + API.LOGIN);

        if ((name + "").length != 11 || (password + "").length < 3 || typeof (password) == "undefined") {
            $ionicLoading.show({
                template: '账号或密码格式不对！',
                noBackdrop: true,
                duration: 3000
            });
            return;
        }


        $http({
            url: API.LOGIN,
            params: {
                userId: name,
                password: password,
            },
            scope: $scope,
            method: 'POST'
        }).success(function (data) {
            console.log("登录返回结果：");
            console.log(data);



            if (data.status == "success" && data.code == 0) {
                saveCache("token", data.accountInfo.token);
                saveCache("userId", data.accountInfo.userId);
                saveCache("accountId", data.accountInfo.id);
                saveCache("storeName", data.accountInfo.storeName);
                //                saveCache("storeId", data.storeInfo.id);
                //                saveCache("companyId",data.storeInfo.companyId);
//
                saveCache("username", name);
                saveCache("userpassword", password);

                var alias = data.accountInfo.id + name;

                //                console.log("----------------------------------------------");

                navigator.intent.JpushPlugin(alias); //--------------------提交jpush数据
                window.location.href = "./index.html";


            } else {
                $ionicLoading.show({
                    template: '登录失败！',
                    noBackdrop: true,
                    duration: 3000
                });
                console.log("登录失败！");
            }
        });

    };
  
  //测试打印接口
  $scope.print = function(){
    navigator.print.print('',function(errorInfo){
      alert(errorInfo);
    });
  };

});