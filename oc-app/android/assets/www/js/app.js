/**
 * Created by acmen on 16-1-6.
 */
var _model = false;
(function (angular) {
    'use strict';
    _model = angular.module('sc_shop_app', ["ionic"]);
    _model.config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

        $ionicConfigProvider.views.maxCache(0);

        $ionicConfigProvider.tabs.position('bottom');

        $stateProvider
            .state('core', {
                cache: false,
                url: "/core",
                templateUrl: "template/core.html",
            }).state('order', {
                url: "/order",
                templateUrl: "template/order.html",
            }).state('my', {
                url: "/my",
                templateUrl: "template/my.html",
            }).state('goods-list', {
                cache: false,
                url: "/goods-manager",
                templateUrl: "template/goods/list.html",
            }).state("notice-list", {
                cache: false,
                url: "/notice-list",
                templateUrl: "template/notice/list.html",
            }).state("notice-detail", {
                cache: false,
                url: "/notice-detail",
                templateUrl: "template/notice/detail.html",
                params: {
                    "noticeId": -1,
                    "status": 0,
                }
            }).state("update_pwd", {
                cache: false,
                url: "/update_pwd",
                templateUrl: "template/account/update_pwd.html",
            }).state("reserve-shop", {
                cache: false,
                url: "/reserve-shop",
                templateUrl: "template/reserve/shop.html",
                params: {
                    "shop_list": {}
                }
               
            }).state("product-shop", {
                cache: false,
                url: "/product-shop",
                templateUrl: "template/reserve/product.html",
             
                params: {
                    "ShopData": []
                }
            }).state("commit-shop", {
                cache: false,
                url: "/commit-shop",
                templateUrl: "template/reserve/commit.html",
              
            }).state("order-list", {
                cache: false,
                url: "/order-list",
                templateUrl: "template/order/test.html",
              
            }).state("order-detail", {
                cache: false,
                url: "/order-detail",
                templateUrl: "template/order/detail.html",
                params: {
                    orderStatus: "",
                    "id": 0
                }

            }).state("opinion-list", {
                cache: false,
                url: "/opinion/list",
                templateUrl: 'template/opinion/list.html',

            }).state("opinion-detail", {
                cache: false,
                url: "/opinion/detail",
                templateUrl: 'template/opinion/detail.html',
                params: {
                    createTime: "",
                    id: 0,
                }
            }).state("opinion-add", {
                cache: false,
                url: "/opinion/add",
                templateUrl: 'template/opinion/add.html'
            })

        ;
        $urlRouterProvider.otherwise("/core");
    });
})(window.angular);