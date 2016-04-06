/**
 * Created by acmen on 16-1-7.
 */
(function (angular) {
  _model.controller("common_controller", function ($scope, $rootScope, $ionicSideMenuDelegate, $ionicHistory, $ionicTabsDelegate, $http, $state, $ionicPopup, $location, $ionicLoading, $ionicPlatform, fileReader) {
    $rootScope.priceNum = 0;

    //返回键
    $ionicPlatform.registerBackButtonAction(function (e) {

      e.preventDefault();

      function showConfirm() {
        var confirmPopup = $ionicPopup.confirm({
          title: '<strong>退出应用?</strong>',
          template: '你确定要退出应用吗?',
          okText: '退出',
          cancelText: '取消'
        });

        confirmPopup.then(function (res) {
          if (res) {
            ionic.Platform.exitApp();
          } else {
            // Don't closecore  
          }
        });
      }
      // Is there a page to go back to?
      if ($location.path() == '/core') {
        showConfirm();
      } else if ($rootScope.$viewHistory.backView) {
        console.log('currentView:', $rootScope.$viewHistory.currentView);
        // Go back in history
        //                $rootScope.$viewHistory.backView.go();
        $rootScope.go_back();
      } else {
        // This is the last page: Show confirmation popup
        showConfirm();
      }

      return false;
    }, 101);

    //订单详细页返回订单列表
    $rootScope.indexOrder = 0;
    $rootScope.orderStatusId = 2;


    $rootScope.hasMsg = false;


    $rootScope.shop_list = [];
    $rootScope.suggestion = "";
    $rootScope.imageList_Root = [];

    var token = getCache("token");
    if (!token) {
      window.location.href = "./login.html";
      return;
    }

    $http.defaults.headers.common['X-Security-Token'] = token;

    $rootScope.show_tab = false;
    $scope.back_status = false;
    $scope.add_status = false;
    $scope.cancel_status = false;
    $scope.commit_status = false;
    $scope.index_status = false;
    $scope.title = "首页";

    //切换账号
    $scope.change_account = function () {
        window.location.href = "./login.html";
      }
      //更多功能
    $scope.more_function = function () {
      $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
          title: '温馨提示',
          template: '更多功能在开发中',
          okText:'好的'
        });
      };
      $scope.showAlert();
    }

    //        $scope.common_controller = 100;

    $rootScope.initStatus = function (iconStatusLeft, iconStatusRight, iconStatusTab, title) {
      $rootScope.show_tab = false;
      $scope.back_status = false;
      $scope.add_status = false;
      $scope.cancel_status = false;
      $scope.commit_status = false;
      $scope.index_status = false;

      if (iconStatusLeft == 0) { // 默认
        $scope.back_status = false;
      } else if (iconStatusLeft == 1) {
        $scope.back_status = true;
      } else if (iconStatusLeft == 2) {
        $scope.cancel_status = true;
      } else if (iconStatusLeft == 3) {
        $scope.index_status = true;
      }


      if (iconStatusRight == 0) { //默认
        $scope.add_status = false;
      } else if (iconStatusRight == 1) {
        $scope.add_status = true;
      } else if (iconStatusRight == 2) {
        $scope.commit_status = true;
      }


      if (iconStatusTab == 0) { //默认
        $ionicTabsDelegate.showBar(true);
        $rootScope.show_tab = false;
      } else if (iconStatusTab == 1) {
        $ionicTabsDelegate.showBar(false);
        $rootScope.show_tab = true;
      }


      if (title == null) {
        $scope.title = "首  页";
      } else {
        $scope.title = title;
      }


      //            if ($location.url() == "/product-shop") {
      //
      //                while ($("body #flyimg").length > 1) { //清除 购物车 fly img 
      //                    $("#flyimg").remove();
      //                }
      //                $("#flyimg").hide();
      //            } else if ($location.url() == "/reserve-shop") {
      //
      //            } else {
      //                while ($("body #flyimg").length > 0) { //清除 购物车 fly img 
      //                    $("#flyimg").remove();
      //                }
      //            }

    };

    $rootScope.go_back = function () {
      $scope.back_status = false;
      //            $ionicHistory.goBack();
      //            if ($rootScope.show_tab) {
      //                $ionicTabsDelegate.showBar(true);
      //                $rootScope.show_tab = false;
      //            }
      if ($location.url() == "/notice-list" || $location.url() == "/reserve-shop" || $location.url() == "/order-list" || $location.url() == "/opinion/list") {
        $state.go("core", {});
      } else if ($location.url() == "/notice-detail") {
        //                $state.go("notice-list", {});
        $ionicHistory.goBack();
      } else if ($location.url() == "/order-detail") {
        $ionicHistory.goBack();
        //                setTimeout("wait()", 5000)
        //
        //                wait = function () {
        //                    if ($location.url() == "/order-list") {
        //                        console.log($rootScope.indexOrder + "===---===" + $rootScope.orderStatusId);
        //                        $rootScope.changeOrderStatus($rootScope.indexOrder, $rootScope.orderStatusId);
        //                    }
        //                }


      } else if ($location.url() == "/opinion/detail") {
        //                $state.go("opinion-list", {});
        $ionicHistory.goBack();
      } else {
        //                 console.log("--------------2");
        $state.go("core", {});
      }

    };
    $rootScope.go_add = function () {
      if ($location.url() == "/product-shop") {
        console.log("添加前数据  ：");
        console.log($rootScope.shop_list);
        //                $("#flyimg").show();
        //                $("#flyimg").text($rootScope.priceNum);
        $state.go("reserve-shop", {
          "shop_list": $rootScope.shop_list
        });

      } else {
        $state.go("opinion-add", []);
        $scope.add_status = false;
      }

    }
    $rootScope.go_cancel = function () {
      if ($location.url() == "/product-shop") {
        $scope.showConfirm = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: '提  示',
            template: '是否取消该订货单?',
            cancelText: '取消',
            okText: '确定'
          });
          confirmPopup.then(function (res) {
            if (res) {
              console.log('You are sure');

              $state.go("core", []);
              $scope.cancel_status = false;
            } else {
              console.log('You are not sure');
            }
          });
        };
        $scope.showConfirm();

      } else if ($location.url() == "/opinion/add") {
        $scope.showConfirm = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: '提  示',
            template: '是否取消该意见?',
            cancelText: '取消',
            okText: '确定'
          });
          confirmPopup.then(function (res) {
            if (res) {
              console.log('You are sure');

              $state.go("core", []);
              $scope.cancel_status = false;
            } else {
              console.log('You are not sure');
            }
          });
        };
        $scope.showConfirm();
      }
    }
    $rootScope.go_commit = function () {
      if ($location.url() == "/opinion/add") {

        if ($rootScope.suggestion == "") {
          $ionicLoading.show({
            template: '提交数据，不能为空 ！',
            noBackdrop: true,
            duration: 3000
          });
          return;
        }

        console.log("提交意见信息（文字） :" + $rootScope.suggestion);

        $scope.showConfirm = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: '提  示',
            template: '是否提交该意见 ?',
            cancelText: '取消',
            okText: '确定'
          });
          confirmPopup.then(function (res) {
            if (res) {
              console.log('You are sure');
              $.ajax({
                type: "POST",
                url: API.SUGGESTIONCOMMIT + "?_t=" + (new Date().getTime()),
                dataType: "json",
                data: {
                  //                                store_id: getCache("storeId"),
                  //                                account_id: getCache("accountId"),
                  //                                company_id: getCache("companyId"),
                  content: $rootScope.suggestion,
                },
                headers: {
                  "X-Security-Token": getCache("token"),
                },
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (data) {
                  console.log("意见反馈接口：");
                  console.log(data);

                  if (data.code == 0) {
                    $ionicLoading.show({
                      template: '提交成功 ！',
                      noBackdrop: true,
                      duration: 3000
                    });
                    $state.go("core", {});

                  } else if (data.code == 1015 || data.code == 1016 || data.code == 1017) {
                    console.log("--------------------------重新登录");
                    window.location.href = "./login.html";

                  } else {
                    $ionicLoading.show({
                      template: '提交失败 ！',
                      noBackdrop: true,
                      duration: 3000
                    });
                  }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {}
              });
              //                            var commitData=getCache("token")+"<token>"+$rootScope.suggestion+"<->";
              //                            for(var i in $rootScope.imageList_Root){
              //                                commitData +=$rootScope.imageList_Root[i]+"<->";
              //                            }
              //                            navigator.suggestion.commit(commitData);


            } else {
              console.log('You are not sure');
            }
          });
        };
        $scope.showConfirm();


      }
    }
    $rootScope.go_index = function () {
      $state.go("core", {});
    }


    $rootScope.left_menu_ctrl = function () {
      $ionicSideMenuDelegate.toggleLeft();
    };
    $rootScope.right_menu_ctrl = function () {
      $ionicSideMenuDelegate.toggleRight();
      $rootScope.init();
      //            console.log("------------------------------------------------------");
    };
    $scope.rightTabClick = function () {
      $state.go("order-list", {});
    };
  }).controller("left_menu", function ($scope, $state, $ionicSideMenuDelegate) {
    $scope.store_name = getCache("storeName");

    $scope.left_menu = [
      {
        "icon": "./img/project/phone.png",
        "value": "400-4567-345",
        //                "sref": "reserve-shop"
            },
      {
        "icon": "./img/project/message.png",
        "value": "phil_zhang@4chen.cn",
        //                "sref": "order-list"
            },

        ];
    $scope.forward_fun = function (forward_state) {
      if (forward_state == "exitLogin") {
        window.location.href = "./login.html";
        return;
      }

      $ionicSideMenuDelegate.toggleLeft();
      $state.go(forward_state);
    };
  }).controller("right_menu", function ($scope, $http, $state, $ionicSideMenuDelegate, $rootScope) {


    $rootScope.init = function () {
      $scope.right_menu = [];
      $http({
        url: API.UNREADMSG + "?_t=" + (new Date().getTime()),
        params: {
          //                    token: getCache("token")
        },
        scope: $scope,
        method: 'GET'
      }).success(function (data) {

        console.log("获取未读信息返回：-------------------------------------------------------------------");
        console.log(data);

        if (data.status == "success" && data.code == 0) {
          //判断是否有信息
          if (data.datas.length == 0) {
            $rootScope.hasMsg = false;
          } else {
            $rootScope.hasMsg = true;
          }

          for (var i in data.datas) {
            var item = data.datas[i];
            $scope.right_menu[i] = {
              id: item.id,
              title: item.title,
              content: item.discribe,
              orderId: item.orderId,
              orderStatus: item.orderStatus,
            }
          }
        } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

          console.log("--------------------------重新登录");
          window.location.href = "./login.html";

        }
      });
    }
    $rootScope.init();




    $scope.unread_notice_detail = function (id, orderId, orderStatus) {
      console.log(id + "  " + orderId + "  " + orderStatus);

      $http({ //修改未读状态
        url: API.UPDATESTATE + id + "?_t=" + (new Date().getTime()),
        params: {
          //                sendId:id,
          //                token: getCache("token")
        },
        scope: $scope,
        method: 'GET'
      }).success(function (data) {
        console.log("修改未读状态返回：");
        console.log(data);


        $ionicSideMenuDelegate.toggleRight();
        $scope.init();
        $state.go("order-detail", {
          "id": orderId,
          "orderStatus": orderStatus,
        });
        if (data.code == 0) {

        } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

          console.log("--------------------------重新登录");
          window.location.href = "./login.html";
        }
      });

    }

    console.log(getCache("token"));
    console.log(getCache("userId"));
    console.log(getCache("accountId"));
    console.log(getCache("storeName"));
    //        console.log(getCache("username"));
    //        console.log(getCache("userpassword"));
    //        console.log(getCache("storeId"));
    //        console.log(getCache("companyId"));
  }).controller("notice_list", function ($scope, $http, $state, $timeout, $rootScope) {
    $rootScope.initStatus(3, 0, 1, "信息");

    $scope.notice_list = [];
    $scope.pageNum = 0;
    $scope.hasMore = true;
    $scope.page_size = 10;

    $scope.loadData = function () {

      $scope.pageNum = $scope.pageNum + 1;

      $http({
        url: API.APPLIST + "?_t=" + (new Date().getTime()),
        params: {
          //                    token: getCache("token"),
          pageNow: $scope.pageNum,
          pageSize: $scope.page_size,
          //                    appAccountId: getCache("accountId")
        },
        scope: $scope,
        method: 'POST'
      }).success(function (data) {
        console.log("消息列表返回：" + $scope.pageNum);
        console.log(data);

        if (data.code == 0) {
          if (data.datas.length < $scope.page_size) {
            $scope.hasMore = false;
          }
          Array.prototype.push.apply($scope.notice_list, data.datas);
        } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

          window.location.href = "./login.html";
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }

    $scope.notice_detail = function (id, status, notice_id) {
      $http({ //修改未读状态
        url: API.UPDATESTATE + notice_id + "?_t=" + (new Date().getTime()),
        params: {
          //                sendId:id,
          //                token: getCache("token")
        },
        scope: $scope,
        method: 'GET'
      }).success(function (data) {
        console.log("修改未读状态返回：");
        console.log(data);


        $state.go("order-detail", {
          orderStatus: status,
          "id": id
            //                "noticeId": id,
            //                "status": status,
        });

        if (data.code == 0) {

        } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

          console.log("--------------------------重新登录");
          window.location.href = "./login.html";
        }
      });

      //            $state.go("order-detail", {
      //                orderStatus: status,
      //                "id": id
      //                    //                "noticeId": id,
      //                    //                "status": status,
      //            });

    };

    $scope.doRefresh = function () {

      $timeout(function () {
        $scope.pageNum = 0;
        $scope.notice_list = [];
        $scope.hasMore = true;
        $scope.loadData();

        //Stop the ion-refresher from spinning  
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);
    };


  }).controller("notice_detail", function ($scope, $rootScope, $stateParams, $http, $ionicNavBarDelegate, $ionicTabsDelegate, $rootScope) {
    $rootScope.initStatus(1, 0, 1, "信息");

    console.log("跳转传递数据：");
    console.log($stateParams);

    $scope.html = "<html><body>未获取到数据</body></html>";

    var noticeStatus = 1;
    noticeStatus = $stateParams.status;
    var id = $stateParams.noticeId;

    if (id == -1) {
      var id = window.location.href.split("=")[1];
      noticeStatus = 1;
    }

    $http({
      url: API.APPDETAIL + id + "?_t=" + (new Date().getTime()),
      params: {
        //                token: getCache("token")
      },
      scope: $scope,
      method: 'GET'
    }).success(function (data) {
      console.log("消息详细页返回：");
      console.log(data);

      if (data.status == "success" && data.code == 0) {
        $scope.html = data.msg;
      } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

        console.log("--------------------------重新登录");
        window.location.href = "./login.html";
      }
    });

    console.log("--------------------" + noticeStatus);
    if (noticeStatus == 1) {
      $http({ //修改未读状态
        url: API.UPDATESTATE + id + "?_t=" + (new Date().getTime()),
        params: {
          //                sendId:id,
          //                token: getCache("token")
        },
        scope: $scope,
        method: 'GET'
      }).success(function (data) {
        console.log("修改未读状态返回：");
        console.log(data);

        if (data.code == 0) {

        } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

          console.log("--------------------------重新登录");
          window.location.href = "./login.html";
        }
      });
    }

  }).controller("asd", function () {
    alert(23);

  }).controller("ProductCtrl", function ($scope, $stateParams, $http, $state, $ionicTabsDelegate, $rootScope, $ionicLoading, $ionicPopup) {
    $rootScope.initStatus(2, 1, 1, "订单");
    $rootScope.priceNum = 0;

    console.log("跳转传递数据：");
    console.log($stateParams);
    $scope.IMAGE_IP = API_HOST;

    $scope.add_goods = $stateParams.ShopData;
    $rootScope.shop_list = $scope.add_goods; //设置全局，用于跳转添加

    $scope.goods_sum = 0;
    $scope.goods_num = 0;
    $scope.flash_price = function () {
      $scope.goods_sum = 0;
      $scope.goods_num = 0;
      for (var key in $scope.add_goods) {
        $scope.goods_sum += (parseFloat($scope.add_goods[key]["goodsPrice"]) * $scope.add_goods[key]["add_num"]);
        $scope.goods_sum = parseFloat($scope.goods_sum.toFixed(2));
        $scope.goods_num += parseFloat($scope.add_goods[key]["add_num"]);
      }

      $scope.goods_sum = parseFloat($scope.goods_sum);
      $scope.goods_num = parseFloat($scope.goods_num);

      $rootScope.priceNum = $scope.goods_num;
    };
    $scope.flash_price();

    $scope.minus_goods_fun = function (index) {
      if ($scope.add_goods[index]["add_num"] <= 1) {
        $scope.showConfirm = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: '提  示',
            template: '是否删除 该货物?',
            cancelText: '取消',
            okText: '确定'
          });
          confirmPopup.then(function (res) {
            if (res) {
              console.log('You are sure');

              console.log($scope.add_goods);
              delete $scope.add_goods[index];
              if (Object.keys($scope.add_goods).length == 0) {
                $ionicLoading.show({
                  template: '购物车无产品，点击 添加 增加商品！',
                  noBackdrop: true,
                  duration: 3000
                });
              }

              $scope.flash_price();
            } else {
              console.log('You are not sure');
            }
          });
        };
        $scope.showConfirm();


        return;
      }
      $scope.add_goods[index]["add_num"] -= 1;
      $scope.flash_price();

    };
    $scope.add_goods_fun = function (index) {
      $scope.add_goods[index]["add_num"] += 1;
      $scope.flash_price();
    };
    $scope.blur_num = 0;
    $scope.blur = function (index) {
      $scope.blur_num = $scope.add_goods[index]['add_num'];
      if (isNaN($scope.blur_num)) {
        $scope.blur_num = 1;
        //                $("#blur_input" + goods_id).text("0");
      }
      if ($scope.blur_num == "" || parseInt($scope.blur_num) < 0) {
        $scope.blur_num = 1;
      }
      if (parseInt($scope.blur_num) > 999999) {
        $scope.blur_num = 999999;
        $ionicLoading.show({
          template: '该商品的最大采购量为 999999 ！',
          noBackdrop: true,
          duration: 3000
        });
      }
      $scope.blur_num = parseInt($scope.blur_num);


      if ($scope.blur_num <= 0 || $scope.blur_num == "0") {
        $scope.showConfirm = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: '提  示',
            template: '是否删除 该货物?',
            cancelText: '取消',
            okText: '确定'
          });
          confirmPopup.then(function (res) {
            if (res) {
              console.log('You are sure');

              console.log($scope.add_goods);
              delete $scope.add_goods[index];
              if (Object.keys($scope.add_goods).length == 0) {
                $ionicLoading.show({
                  template: '购物车无产品，点击 添加 增加商品！',
                  noBackdrop: true,
                  duration: 3000
                });
              }

              $scope.flash_price();
            } else {
              console.log('You are not sure');
            }
          });
        };
        $scope.showConfirm();
      }
      console.log($scope.blur_num);

      $scope.add_goods[index]["add_num"] = $scope.blur_num;
      $scope.flash_price();
    }





    $scope.commitData = function () {

      $scope.showConfirm = function () {
        var confirmPopup = $ionicPopup.confirm({
          title: '提  示',
          template: '是否 确认下单?',
          cancelText: '取消',
          okText: '确定'
        });
        confirmPopup.then(function (res) {
          if (res) {
            console.log('You are sure');
            var post_data = [];
            for (var i in $scope.add_goods) {
              var item = $scope.add_goods[i];

              if (item.add_num != 0) {
                post_data.push({
                  "id": item.id,
                  "num": item.add_num,
                });
              }


            }
            console.log(post_data);

            if (post_data.length == 0) {
              console.log("数据为空不能提交 ！");

              $ionicLoading.show({
                template: '没有商品，不能提交 ！',
                noBackdrop: true,
                duration: 3000
              });
              return;
            } else {
              $http({
                url: API.COMMITORDER + "?_t=" + (new Date().getTime()),
                params: {
                  //                    token: getCache("token"),
                  data: JSON.stringify(post_data)
                },
                scope: $scope,
                method: 'POST',
              }).success(function (data) {
                console.log("获取提交订单返回结果：");
                console.log(data);

                if (data.code == 0) {
                  $ionicLoading.show({
                    template: '提交成功 ！',
                    noBackdrop: true,
                    duration: 3000
                  });
                  //                        $ionicTabsDelegate.showBar(true);
                  $state.go("order-list", {});

                } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

                  window.location.href = "./login.html";

                } else {
                  $ionicLoading.show({
                    template: '提交失败 ！',
                    noBackdrop: true,
                    duration: 3000
                  });
                  $state.go("core", {});
                }

              });
            };

          } else {
            console.log('You are not sure');

          }
        });
      };
      $scope.showConfirm();



    };

  }).controller("ReserveShopCtrl", function ($scope, $http, $state, $ionicTabsDelegate, $rootScope, $stateParams, $ionicLoading) {
    $rootScope.initStatus(1, 0, 1, "订购");

    var shop_list = $stateParams.shop_list;
    //        console.log(shop_list);

    $scope.chooseLeftStyle = [];

    $scope.IMAGE_IP = API_HOST;

    //        $ionicTabsDelegate.showBar(false);
    //        $rootScope.change_to_back();
    //        $rootScope.show_tab = true;

    $scope.init = function () {
      $scope.menu_list = [];
      $scope.numSum = 0;
      $scope.priceSum = 0;

      $http({
        url: API.GETGOOD + "?_t=" + (new Date().getTime()),
        params: {
          //                    token: getCache("token"),
          //                    company_id: getCache("companyId"),
        },
        scope: $scope,
        method: 'GET'
      }).success(function (data) {
        console.log("获取商品列表返回：");
        console.log(data);

        if (data.code == 0) {
          $scope.goods_list = data.data;

          for (var item01 in $scope.goods_list) {
            for (var item02 in $scope.goods_list[item01].foodList) {
              var item = $scope.goods_list[item01].foodList[item02];
              //                            console.log(item.id);
              if (!$scope.add_goods[item.id]) {
                $scope.add_goods[item.id] = item;
                $scope.add_goods[item.id]["add_num"] = 0;
              }
            }
          }
          //                    console.log($scope.add_goods);

          $scope.flash_price();

          for (var i in $scope.goods_list) {
            $scope.chooseLeftStyle[i] = "background-color:#F5F5F5;color:#7A7A7A;"
          }
          $scope.chooseLeftStyle[0] = "background-color:#ffffff;color:#29b8f6;"


          $scope.start_menu = data.data[0]["id"];
        } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

          console.log("--------------------------重新登录");
          window.location.href = "./login.html";

        }
      });
    };
    $scope.init();




    $scope.choose_menu = function (id, index) {
      $scope.start_menu = id;


      for (var i in $scope.goods_list) {
        $scope.chooseLeftStyle[i] = "background-color:#F5F5F5;color:#7A7A7A;"
      }

      $scope.chooseLeftStyle[index] = "background-color:#ffffff;color:#29b8f6;"

      //            console.log($scope.chooseLeftStyle);
    };
    $scope.add_goods = {};
    $scope.add_goods = shop_list;
    console.log($scope.add_goods);
    $scope.minus_goods_fun = function (goods_id, goods) {
      if (!$scope.add_goods[goods_id]) {
        $scope.add_goods[goods_id] = goods;
        $scope.add_goods[goods_id]["add_num"] = 0;
      }
      if ($scope.add_goods[goods_id]["add_num"] > 0) {
        $scope.add_goods[goods_id]["add_num"] = parseInt($scope.add_goods[goods_id]["add_num"]) - 1;
      }
      if ($scope.add_goods[goods_id]["add_num"] == 0) {
        // delete $scope.add_goods[goods_id];
      }
      $scope.flash_price();

      //            while ($("body #flyimg").length > 1) {
      //                $("#flyimg").remove();
      //            }
      //
      //            $("#flyimg").text($scope.goods_num);
    };
    $scope.add_goods_fun = function (goods_id, goods, event) {
      //            var offset = $('#end').offset(),
      //                flyer = $('<a id="flyimg" class="u-flyer" style="text-align: center;font-size: 15px !important;line-height: 30px;" >' + ($scope.goods_num + 1) + '</a>');
      //            flyer.fly({
      //                start: {
      //                    left: event.x,
      //                    top: event.y - 60
      //                },
      //                end: {
      //                    left: offset.left + 60,
      //                    top: offset.top - 25,
      //                    width: 30,
      //                    height: 30
      //                }
      //            });



      if (!$scope.add_goods[goods_id]) {
        $scope.add_goods[goods_id] = goods;
        $scope.add_goods[goods_id]["add_num"] = 0;
      }
      if ($scope.add_goods[goods_id]["add_num"] >= 0) {
        $scope.add_goods[goods_id]["add_num"] = parseInt($scope.add_goods[goods_id]["add_num"]) + 1;
      }
      if ($scope.add_goods[goods_id]["add_num"] == 0) {
        delete $scope.add_goods[goods_id];
      }
      $scope.flash_price();
    };


    $scope.blur_num = 0;
    $scope.defaultNum = 0;
    $scope.blur = function (goods_id, goods, event) {
      if (!$scope.add_goods[goods_id]) {
        $scope.add_goods[goods_id] = goods;
        $scope.add_goods[goods_id]["add_num"] = $scope.defaultNum;
        $scope.defaultNum = 0;
      }
      $scope.blur_num = $scope.add_goods[goods_id]['add_num'];



      if (isNaN($scope.blur_num) || $scope.blur_num == "") {
        $scope.blur_num = 0;
        $("#blur_input" + goods_id).text("0");
      }
      if (parseInt($scope.blur_num) < 0) {
        $scope.blur_num = 0;
      }
      if (parseInt($scope.blur_num) > 999999) {
        $scope.blur_num = 999999;
        $ionicLoading.show({
          template: '该商品的最大采购量为 999999 ！',
          noBackdrop: true,
          duration: 3000
        });
      }
      $scope.blur_num = parseInt($scope.blur_num);


      if (!$scope.add_goods[goods_id]) {
        $scope.add_goods[goods_id] = goods;
        $scope.add_goods[goods_id]["add_num"] = 0;
      }
      $scope.add_goods[goods_id]["add_num"] = $scope.blur_num;

      var ifCanFirstFly = false;
      if ($scope.goods_num == 0) {
        ifCanFirstFly = true;
      }
      $scope.flash_price();
      if ($scope.goods_num == 0) {
        ifCanFirstFly = false;
      }

      //            $("#flyimg").text($scope.goods_num);
      //
      //            if (ifCanFirstFly) {
      //                //                var offset = $('#end').offset(),
      //                //                    flyer = $('<a id="flyimg" class="u-flyer" style="text-align: center;font-size: 15px !important;line-height: 30px;" >' + $scope.goods_num + '</a>');
      //                //                flyer.fly({
      //                //                    start: {
      //                //                        left: 30,
      //                //                        top: 50 - 60
      //                //                    },
      //                //                    end: {
      //                //                        left: offset.left + 60,
      //                //                        top: offset.top - 25,
      //                //                        width: 30,
      //                //                        height: 30
      //                //                    }
      //                //                });
      //            } else {
      //                $("#flyimg").text($scope.goods_num);
      //            }

    }


    $scope.goods_sum = 0;
    $scope.goods_num = 0;
    $scope.flash_price = function () {
      $scope.goods_sum = 0;
      $scope.goods_num = 0;
      for (var key in $scope.add_goods) {
        $scope.goods_sum += (parseFloat($scope.add_goods[key]["goodsPrice"]) * $scope.add_goods[key]["add_num"]);
        $scope.goods_sum = parseFloat($scope.goods_sum.toFixed(2));
        $scope.goods_num += parseFloat($scope.add_goods[key]["add_num"]);
      }

      $scope.goods_sum = parseFloat($scope.goods_sum);
      $scope.goods_num = parseFloat($scope.goods_num);
    };



    $scope.sub_goods = function () {
      if ($scope.goods_num == 0) {
        return;
      } else {
        for (var i in $scope.add_goods) {
          var item = $scope.add_goods[i];
          if (item.add_num == "0" || item.add_num == 0) {
            delete $scope.add_goods[i];
          }
        }

        $state.go("product-shop", {
          "ShopData": $scope.add_goods
        });
      }
    };


  }).controller("OrderListCtrl", function ($scope, $http, $state, $rootScope) {
    $rootScope.initStatus(3, 0, 0, "订单");

    $scope.OrderListData = [];
    $scope.pageNum = 0;
    $scope.hasMore = true;

    $scope.loadData = function (statusId) {

      if (typeof (statusId) == "undefined") {
        statusId = -2;
      }
      console.log(statusId);

      $scope.pageNum = $scope.pageNum + 1;

      $http({
        url: API.ORDERLIST + "?_t=" + (new Date().getTime()),
        params: {
          page_num: $scope.pageNum,
          page_size: 10,
          status: parseInt(statusId)
        },
        scope: $scope,
        method: "GET"
      }).success(function (data) {
        console.log("订货单列表接口返回：" + $scope.pageNum);
        console.log(data);

        if (data.status == "success" || data.code == 0) {
          if (data.data.length < 10) {
            $scope.hasMore = false;
            //                        console.log("-----------------------no");
          }
          for (var i in data.data) {
            var item = data.data[i];


            var classStatus = "";
            var status_str = "";
            if (item.orderStatus == -1) {
              classStatus = "gray";
              status_str = "已取消";
            } else if (item.orderStatus == 1) {
              classStatus = "orange";
              status_str = "未审核";
            } else if (item.orderStatus == 2) { /****************nopay****/
              classStatus = "orange";
              status_str = "未付款";
            } else if (item.orderStatus == 3) { /****************failexamine****/
              classStatus = "gray";
              status_str = "审核失败";
            } else if (item.orderStatus == 4) {
              classStatus = "gray";
              status_str = "待发货";
            } else if (item.orderStatus == 5) { /****************failpay****/
              classStatus = "orange";
              status_str = "付款失败";
            } else if (item.orderStatus == 6) {
              classStatus = "orange";
              status_str = "待收货";
            } else if (item.orderStatus == 7) {
              classStatus = "gray";
              status_str = "已完成";
            } else if (item.orderStatus == 8) {
              classStatus = "gray";
              status_str = "付款中";
            }

            $scope.OrderListData[parseInt(($scope.pageNum - 1) * 10) + parseInt(i)] = {
              id: parseInt(parseInt(i) + parseInt(10 * ($scope.pageNum - 1))),
              commitId: item.id,
              orderNum: item.orderNum,
              createTime: item.createTime,
              orderStatus: item.orderStatus,
              classStatus: classStatus,
              status_str: status_str,
              shopOrderGoods: item.shopOrderGoods,
            }

          }

          //                    console.log($scope.OrderListData);
        } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {
          console.log("--------------------------重新登录");
          window.location.href = "./login.html";

        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
        //                console.log($scope.OrderListData);
      });
    }

    $scope.x = "0";
    $scope.cacheSataus = -2
    $scope.list_change = function (x) {
      console.log("选择订单状态 ：" + x);

      $scope.OrderListData = [];
      $scope.pageNum = 0;
      $scope.hasMore = true;

      if (x == "0") {
        $scope.cacheSataus = -2;
        //                $scope.loadData();
      } else {
        $scope.cacheSataus = x;
        //                $scope.loadData(x);
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');


    }


    $scope.openDetail = function (id) {

      console.log("===================" + id);
      $state.go("order-detail", {
        "orderStatus": $scope.OrderListData[id].orderStatus,
        "id": $scope.OrderListData[id].commitId
      });
    }

  }).controller("OrderDetailCtrl", function ($scope, $stateParams, $ionicPopup, $http, $state, $ionicTabsDelegate, $rootScope) {
    $rootScope.initStatus(1, 0, 0, "订单");

    console.log("跳转传递数据：");
    console.log($stateParams);
    $scope.IMAGE_IP = API_HOST;


    $scope.id = $stateParams.id;
    $scope.orderStatus = $stateParams.orderStatus;

    if ($scope.id == 0 || $scope.orderStatus == "") {
      $scope.id = (window.location.href.split("=")[1]).split("&")[0];
      $scope.orderStatus = window.location.href.split("=")[2];
      //            alert($scope.id+" "+$scope.orderStatus);
    }

    $scope.data = [];
    $scope.numSum = 0;
    $scope.priceSum = 0;

    $http({
      url: API.ORDERDETAIL + $scope.id + "?_t=" + (new Date().getTime()),
      params: {
        //                token: getCache("token"),
      },
      scope: $scope,
      method: "GET"
    }).success(function (data) {
      console.log("订货单详情接口返回：");
      console.log(data);

      if (data.code == 0) {
        $scope.orderStatus = data.orderStatus;

        $scope.getStatus($scope.orderStatus);

        if ($scope.orderStatus == 3) {
          $scope.textStatus = data.msg;
        }



        for (var i in data.data) {
          var item = data.data[i];

          $scope.data[i] = {
            name: item.goodsName,
            price: item.goodsPrice,
            //                        description: item.food.description,
            num: item.num,
            picture2: item.picture,
          }
        }

        for (var i in $scope.data) {
          var item = $scope.data[i];

          //                    console.log(item);
          //                    console.log($scope.numSum + "    " + i);

          $scope.numSum = $scope.numSum + item.num;
          $scope.priceSum = $scope.priceSum + item.num * item.price;
          $scope.priceSum = parseFloat($scope.priceSum.toFixed(2));
        }
      } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

        console.log("--------------------------重新登录");
        window.location.href = "./login.html";

      }
    });


    $scope.show_btn = 1;
    $scope.getStatus = function (orderStatus) {


      if (orderStatus == -1) {
        $scope.textStatus = "订单已取消！";
        $scope.show_btn = 0;
        $scope.buttonStatus = "- - -";
      } else if (orderStatus == 1) {
        $scope.textStatus = "未审核，请耐心等待！";
        $scope.buttonStatus = "撤  销";
      } else if (orderStatus == 2) {
        $scope.textStatus = "审核通过，待付款后发货！";
        if (getCache("DeviceInfo") == "wangpos") {
          $scope.buttonStatus = "付  款";
        } else {
          $scope.show_btn = 0;
          $scope.buttonStatus = "- - -";
        }
        $scope.show_btn = 1;
        $scope.buttonStatus = "付  款";

      } else if (orderStatus == 3) {
        $scope.textStatus = "审核未通过！";
        $scope.show_btn = 0;
        $scope.buttonStatus = "- - -";
      } else if (orderStatus == 4) {
        $scope.textStatus = "付款成功，待发货！";
        $scope.show_btn = 0;
        $scope.buttonStatus = "- - -";
      } else if (orderStatus == 5) {
        $scope.textStatus = "付款失败，需重新付款！";

        if (getCache("DeviceInfo") == "wangpos") {
          $scope.buttonStatus = "付  款";
        } else {
          $scope.show_btn = 0;
          $scope.buttonStatus = "- - -";
        }

        //                $scope.buttonStatus = "付  款";
        //                $scope.show_btn = 0;
        //                $scope.buttonStatus = "- - -";
      } else if (orderStatus == 6) {
        $scope.textStatus = "已发货，收到后点击收货！";
        $scope.buttonStatus = "收  货";
      } else if (orderStatus == 7) {
        $scope.textStatus = "订单已完成！";
        $scope.show_btn = 0;
        $scope.buttonStatus = "- - -";
      } else if (orderStatus == 7) {
        $scope.textStatus = "订单已完成！";
        $scope.show_btn = 0;
        $scope.buttonStatus = "- - -";
      } else if (orderStatus == 8) {
        $scope.textStatus = "订单支付确认中！";
        $scope.show_btn = 0;
        $scope.buttonStatus = "- - -";
      }
    }



    $scope.buttonOrder = function (orderStatus) {

      if (orderStatus == -1 || orderStatus == 3 || orderStatus == 4 || orderStatus == 7) {
        return;
      } else if (orderStatus == 1) {
        //撤销
        $scope.showConfirm = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: '提  示',
            template: '是否确认撤销该订单?',
            cancelText: '取消',
            okText: '确定'
          });
          confirmPopup.then(function (res) {
            if (res) {
              console.log('You are sure');
              $http({
                url: API.ORDERCANCEL + "?_t=" + (new Date().getTime()),
                params: {
                  //                                    token: getCache("token"),
                  id: $scope.id,
                },
                scope: $scope,
                method: 'POST'
              }).success(function (data) {
                console.log("取消订货单接口返回：");
                console.log(data);

                if (data.status == "success" && data.code == 0) {
                  $state.go("order-list", []);
                } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

                  console.log("--------------------------重新登录");
                  window.location.href = "./login.html";

                }
              });
            } else {
              console.log('You are not sure');
            }
          });
        };
        $scope.showConfirm();
      } else if (orderStatus == 2 || orderStatus == 5) {
        //付款

        $scope.showConfirm = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: '提  示',
            template: '是否确认付款该订单?',
            cancelText: '取消',
            okText: '确定'
          });
          confirmPopup.then(function (res) {
            if (res) {
              console.log('You are sure');

              $http({
                url: API.PAYSTART + "?_t=" + (new Date().getTime()),
                params: {
                  //                                    token: getCache("token"),
                  id: $scope.id,
                },
                scope: $scope,
                method: "POST"
              }).success(function (data) {
                console.log("支付前准备，获取信息接口：");
                console.log(data);

                if (data.code == 0) {

                  var payData = {
                    id: $scope.id,
                    attach: data.data.attach,
                    body: data.data.body,
                    channel: data.data.channel,
                    notify_url: data.data.notify_url,
                    out_trade_no: data.data.out_trade_no,
                    total_fee: data.data.total_fee,
                  };

                  $state.go("core", []);
                  navigator.pay.pay(JSON.stringify(payData));

                } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

                  console.log("--------------------------重新登录");
                  window.location.href = "./login.html";

                } else {
                  $ionicLoading.show({
                    template: '该订单暂不能付款 ！',
                    noBackdrop: true,
                    duration: 3000
                  });
                }


              });



            } else {
              console.log("You are not sure !");
            }
          });
        };
        $scope.showConfirm();

      } else
      if (orderStatus == 6) {
        //收货
        $scope.showConfirm = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: '提  示',
            template: '是否确认收到该订单?',
            cancelText: '取消',
            okText: '确定'
          });
          confirmPopup.then(function (res) {
            if (res) {
              console.log('You are sure');
              $http({
                url: API.ORDERRECEIVED + "?_t=" + (new Date().getTime()),
                params: {
                  //                                    token: getCache("token"),
                  id: $scope.id,
                },
                scope: $scope,
                method: 'POST'
              }).success(function (data) {
                console.log("订货单收货接口返回：");
                console.log(data);

                if (data.status == "success" && data.code == 0) {
                  $state.go("order-list", []);
                } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

                  console.log("--------------------------重新登录");
                  window.location.href = "./login.html";

                }
              });


            } else {
              console.log('You are not sure');
            }
          });
        };
        $scope.showConfirm();
      }

    }


  }).controller("SuggestionCtrl", function ($scope, $state, $http, $ionicLoading, $ionicPopup, $rootScope) {
    $rootScope.initStatus(2, 2, 1, "反馈");
    $rootScope.suggestion = "";
    $rootScope.imageList_Root = [];

    $scope.value = "";
    $scope.change = function (data) {
      $scope.value = data;
      $rootScope.suggestion = data;
    }

    $scope.handleFiles = function (ddd) {
      console.log(ddd);

    }


    $scope.imageList = [];
    $scope.add_image = function () {
      navigator.image.image("dddd");
    }
    $scope.setImageUrl = function (url) {
        //            alert(url);

        $scope.imageList.push(url);
        $scope.imageList_Root.push(url);



        $scope.$apply();
      }
      //        $scope.imageList = [];
      //        $scope.add_image = function () {
      //            //            $scope.imageList.push("./img/shop/01.png");
      //            //            console.log($scope.imageList);
      //            $("#file").click();
      //        }

  }).controller("SuggestionListCtrl", function ($scope, $http, $state, $rootScope, $ionicTabsDelegate, $ionicHistory) {
    $rootScope.initStatus(3, 1, 0, "反馈");

    //        $rootScope.change_to_add();

    $scope.suggestion_list = [];
    $ionicHistory.clearCache().then(function () {
      $http({
        //                url: API.SUGGESTIONLIST + "/" + getCache("accountId") + "?_t=" + (new Date().getTime()),
        url: API.SUGGESTIONLIST + "?_t=" + (new Date().getTime()),
        params: {
          //                    token: getCache("token"),
        },
        scope: $scope,
        method: "GET",
        cache: false
      }).success(function (data) {
        console.log("意见反馈列表接口返回： ");
        console.log(data);



        if (data.code == 0) {

          $scope.suggestion_list = data.datas;
          for (var i in $scope.suggestion_list) {
            var item = $scope.suggestion_list[i];
            item["createTime"] = (item["createTime"].substring(0, 10));
          }


        } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

          console.log("--------------------------重新登录");
          window.location.href = "./login.html";
        }
      });

    });



    $scope.openDetail = function (id, createTime) {
      console.log(id + "------------------");
      $state.go("opinion-detail", {
        //                detail_data: $scope.suggestion_list,
        id: id,
        createTime: createTime,
      });
    }

  }).controller("SuggestionDetailCtrl", function ($scope, $http, $stateParams, $state, $ionicLoading, $rootScope, $ionicPopup) {
    $rootScope.initStatus(1, 0, 1, "反馈");


    console.log("详细页跳转传递数据：");
    console.log($stateParams);

    $scope.id = $stateParams.id;
    var createTime = $stateParams.createTime;
    //        var data = $stateParams.detail_data;



    $scope.suggestion_detail = {};
    $scope.images = [];
    $http({
      url: API.SUGGESTIONDETAIL + $scope.id + "?_t=" + (new Date().getTime()),
      params: {},
      scope: $scope,
      method: "GET",
      cache: false
    }).success(function (data) {
      console.log("意见反馈详情接口返回： ");
      console.log(data);

      if (data.code == 0) {

        $scope.suggestion_detail = data.data;
        $scope.suggestion_detail['createTime'] = createTime;

        if ($scope.suggestion_detail.images == null) {

        } else if ($scope.suggestion_detail.images.indexOf(",") == 0) {
          $scope.images = [$scope.suggestion_detail.images];
        } else {
          $scope.images = $scope.suggestion_detail.images.split(",");
        }

        for (var i in $scope.images) {
          $scope.images[i] = API_HOST + "/api" + $scope.images[i];
        }
        console.log("加载的图片地址：");
        console.log($scope.images);


      } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

        console.log("--------------------------重新登录");
        window.location.href = "./login.html";
      }
    });






    $scope.cancelSuggestion = function (id) {
      console.log(id);
      $scope.showConfirm = function () {
        var confirmPopup = $ionicPopup.confirm({
          title: '提  示',
          template: '是否确认撤销该意见?',
          cancelText: '取消',
          okText: '确定'
        });
        confirmPopup.then(function (res) {
          if (res) {
            console.log('You are sure');
            $state.go("core", []);

            $http({
              url: API.SUGGESTIONCANCEL + "/" + id + "?_t=" + (new Date().getTime()),
              params: {
                //                                token: getCache("token"),
              },
              scope: $scope,
              method: "GET",
            }).success(function (data) {
              console.log("撤销消息反馈返回： ");
              console.log(data);

              if (data.code == 0) {
                $ionicLoading.show({
                  template: '撤销成功 ！',
                  noBackdrop: true,
                  duration: 3000
                });
              } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

                console.log("--------------------------重新登录");
                window.location.href = "./login.html";
              } else {
                $ionicLoading.show({
                  template: '撤销失败 ！',
                  noBackdrop: true,
                  duration: 3000
                });
              }

            });



          } else {
            console.log('You are not sure');
          }
        });
      };
      $scope.showConfirm();
    }

  }).controller("CoreCtrl", function ($scope, $rootScope, $ionicPopup) {
    $rootScope.initStatus(0, 0, 0, "首页");
    //
    //        alert(width_screen);
    //        alert(height_screen);
    //        console.log(width_screen);
    //        console.log(height_screen);

  }).controller("TestCtrl", function ($http, $scope, $rootScope, $state, $ionicPopup) {
    $rootScope.initStatus(3, 0, 0, "订单");
    $scope.pageNumEvent = 10;


    $scope.orderData = [];
    $scope.pageNum = 0;
    $scope.hasMore = true;
    $scope.cacheStatus = $rootScope.orderStatusId;

    $scope.order_type = [];
    for (var i = 0; i < 4; i++) {
      $scope.order_type[i] = "background-color:#fff;color:#29b6f6;";
    }
    $scope.order_type[$rootScope.indexOrder] = "background-color:#29b6f6;color:#fff;";

    $rootScope.indexOrder = 0;
    $rootScope.orderStatusId = 2;
    //***************  加载页面
    $scope.loadData = function (orderStatus) {
      if (typeof (orderStatus) == "undefined") {
        orderStatus = 2;
      }

      $scope.pageNum = $scope.pageNum + 1;
      //            console.log($scope.pageNum);

      $http({
        url: API.ORDERLIST + "?_t=" + (new Date().getTime()),
        params: {
          page_num: $scope.pageNum,
          page_size: $scope.pageNumEvent,
          status: orderStatus,
        },
        scope: $scope,
        method: "GET"
      }).success(function (data) {
        console.log("订货单列表接口返回：" + $scope.pageNum + "  " + orderStatus);
        console.log(data);

        if (data.status == "success" && data.code == 0) {
          if (data.data.length != $scope.pageNumEvent) {
            $scope.hasMore = false;
          } else {
            $scope.hasMore = true;
          }
          for (var i in data.data) {
            var item = data.data[i];
            var classStatus = "";
            var status_str = "";
            var button_status = "- - -";
            if (item.orderStatus == -1) {
              classStatus = "gray";
              status_str = "已取消";
              button_status = "- - -";
            } else if (item.orderStatus == 1) {
              classStatus = "orange";
              status_str = "未审核";
              button_status = "撤 销";
            } else if (item.orderStatus == 2) { /****************nopay****/
              classStatus = "orange";
              status_str = "未付款";
              if (getCache("DeviceInfo") == "wangpos") {
                button_status = "付 款";
              } else {
                button_status = "- - -";
                classStatus = "gray";
              }
            } else if (item.orderStatus == 3) { /****************failexamine****/
              classStatus = "gray";
              status_str = "审核失败";
              button_status = "- - -";
            } else if (item.orderStatus == 4) {
              classStatus = "gray";
              status_str = "待发货";
              button_status = "- - -";
            } else if (item.orderStatus == 5) { /****************failpay****/
              classStatus = "orange";
              status_str = "付款失败";
              if (getCache("DeviceInfo") == "wangpos") {
                button_status = "付 款";
              } else {
                button_status = "- - -";
                classStatus = "gray";
              }
            } else if (item.orderStatus == 6) {
              classStatus = "orange";
              status_str = "待收货";
              button_status = "收 货";
            } else if (item.orderStatus == 7) {
              classStatus = "gray";
              status_str = "已完成";
              button_status = "- - -";
            } else if (item.orderStatus == 8) {
              classStatus = "gray";
              status_str = "付款中";
              button_status = "- - -";
            }

            var pictures = [];
            if (item.shopOrderGoods.length >= 3) {
              for (var k = 0; k < 3; k++) {
                pictures[k] = API_HOST + "/api/" + item.shopOrderGoods[k].picture;
              }
            } else {
              for (var k in item.shopOrderGoods) {
                pictures[k] = API_HOST + "/api/" + item.shopOrderGoods[k].picture;
              }
            }


            $scope.orderData[parseInt(($scope.pageNum - 1) * $scope.pageNumEvent) + parseInt(i)] = {
              id: parseInt(parseInt(i) + parseInt($scope.pageNumEvent * ($scope.pageNum - 1))),
              commitId: item.id,
              orderNum: item.orderNum,
              createTime: item.createTime,
              orderStatus: item.orderStatus,
              goodsNum: item.goodsNum,
              goodsSum: item.goodsAmount,
              pictures: pictures,
              classStatus: classStatus,
              status_str: status_str,
              button_status: button_status,
            }
          }
        } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

          console.log("--------------------------重新登录");
          window.location.href = "./login.html";

        }



      });
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    //*******************  tab切换
    $scope.indexOrder = 0;
    $scope.orderStatusId = 2;


    $rootScope.changeOrderStatus = function (index, orderStatus) {
      $scope.indexOrder = index;
      $scope.orderStatusId = orderStatus;

      console.log(index + "        " + orderStatus);
      for (var i = 0; i < 4; i++) {
        $scope.order_type[i] = "background-color:#fff;color:#29b6f6;";
      }
      $scope.order_type[index] = "background-color:#29b6f6;color:#fff;";

      $scope.orderData = [];
      $scope.pageNum = 0;
      $scope.hasMore = true;
      $scope.cacheStatus = orderStatus;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    //*************** 进入详细页
    $scope.openDetail = function (id) {
      //            $rootScope();
      $rootScope.indexOrder = $scope.indexOrder;
      $rootScope.orderStatusId = $scope.orderStatusId;
      //            console.log($scope.indexOrder+" ---===---  "+$scope.orderStatusId);

      $state.go("order-detail", {
        "orderStatus": $scope.orderData[id].orderStatus,
        "id": $scope.orderData[id].commitId
      });
    }

    //*************** buttonClick
    $scope.commitButton = function (id) {
      var orderStatus = $scope.orderData[id].orderStatus;
      var tabStatus;
      var tabIndex;
      if (orderStatus == -1 || orderStatus == 3 || orderStatus == 7) {
        tabIndex = 3;
        tabStatus = 1;
      } else if (orderStatus == 1) {
        tabIndex = 0;
        tabStatus = 2;
      }
      if (orderStatus == 2 || orderStatus == 8 || orderStatus == 5) {
        tabIndex = 1;
        tabStatus = 3;
      }
      if (orderStatus == 4 || orderStatus == 6) {
        tabIndex = 2;
        tabStatus = 4;
      }

      var orderId = $scope.orderData[id].commitId;

      if (orderStatus == -1 || orderStatus == 3 || orderStatus == 4 || orderStatus == 7 || orderStatus == 8) {
        return;
      } else if (orderStatus == 1) {
        //撤销
        $scope.showConfirm = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: '提  示',
            template: '是否确认撤销该订单?',
            cancelText: '取消',
            okText: '确定'
          });
          confirmPopup.then(function (res) {
            if (res) {
              console.log('You are sure');
              $http({
                url: API.ORDERCANCEL + "?_t=" + (new Date().getTime()),
                params: {
                  //                                    token: getCache("token"),
                  id: orderId,
                },
                scope: $scope,
                method: 'POST'
              }).success(function (data) {
                console.log("取消订货单接口返回：");
                console.log(data);

                if (data.status == "success" && data.code == 0) {
                  //                                    $state.go("order-list", []);

                  $rootScope.changeOrderStatus(tabIndex, tabStatus);
                } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

                  console.log("--------------------------重新登录");
                  window.location.href = "./login.html";

                }
              });
            } else {
              console.log('You are not sure');
            }
          });
        };
        $scope.showConfirm();
      } else if (orderStatus == 2 || orderStatus == 5) {
        //付款

        $scope.showConfirm = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: '提  示',
            template: '是否确认付款该订单?',
            cancelText: '取消',
            okText: '确定'
          });
          confirmPopup.then(function (res) {
            if (res) {
              console.log('You are sure');

              $http({
                url: API.PAYSTART + "?_t=" + (new Date().getTime()),
                params: {
                  //                                    token: getCache("token"),
                  id: orderId,
                },
                scope: $scope,
                method: "POST"
              }).success(function (data) {
                console.log("支付前准备，获取信息接口：");
                console.log(data);

                if (data.code == 0) {

                  var payData = {
                    id: orderId,
                    attach: data.data.attach,
                    body: data.data.body,
                    channel: data.data.channel,
                    notify_url: data.data.notify_url,
                    out_trade_no: data.data.out_trade_no,
                    total_fee: data.data.total_fee,
                  };

                  $rootScope.changeOrderStatus(tabIndex, tabStatus);
                  navigator.pay.pay(JSON.stringify(payData));

                } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

                  console.log("--------------------------重新登录");
                  window.location.href = "./login.html";

                } else {
                  $ionicLoading.show({
                    template: '该订单暂不能付款 ！',
                    noBackdrop: true,
                    duration: 3000
                  });
                }


              });



            } else {
              console.log("You are not sure !");
            }
          });
        };
        $scope.showConfirm();

      } else
      if (orderStatus == 6) {
        //收货
        $scope.showConfirm = function () {
          var confirmPopup = $ionicPopup.confirm({
            title: '提  示',
            template: '是否确认收到该订单?',
            cancelText: '取消',
            okText: '确定'
          });
          confirmPopup.then(function (res) {
            if (res) {
              console.log('You are sure');
              $http({
                url: API.ORDERRECEIVED + "?_t=" + (new Date().getTime()),
                params: {
                  //                                    token: getCache("token"),
                  id: orderId,
                },
                scope: $scope,
                method: 'POST'
              }).success(function (data) {
                console.log("订货单收货接口返回：");
                console.log(data);

                if (data.status == "success" && data.code == 0) {
                  $rootScope.changeOrderStatus(tabIndex, tabStatus);
                } else if (data.code == 100 || data.code == 1015 || data.code == 1016 || data.code == 1017) {

                  console.log("--------------------------重新登录");
                  window.location.href = "./login.html";

                }
              });


            } else {
              console.log('You are not sure');
            }
          });
        };
        $scope.showConfirm();
      }

    }

  });


})(window.angular);