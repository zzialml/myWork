getImageUrl = function (data) {
    console.log("=========================");
    console.log(data);

//    alert(data);
    //    picArray.push(data);

    var ele = document.querySelector("[ng-controller=SuggestionCtrl]");
    angular.element(ele).scope().setImageUrl(data);

}