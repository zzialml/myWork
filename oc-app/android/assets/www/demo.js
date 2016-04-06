/**
 * Created by acmen on 16-1-22.
 */
function get_store_list(page_num){
    var url = "https://api.weixin.qq.com/bizwifi/shop/list?access_token=zv1lylaPfqP7l-ItzgajTwVk3EjdgnxuxoapVXnhrOmUobUH79RJWrW8jfLwyZQ38_KlbY9eZT-yGD0jCBm0PPae4skO9TTRhLgk0IZqYccLSHcAHAZGV";
    var post_data = {
        "pageindex": page_num,
        "pagesize": 20
    };
    $.ajax({
        url : url,
        type : 'POST',
        data : JSON.stringify(post_data),
        dataType : 'json',
        contentType : 'application/json',
        success : function(data, status, xhr) {
            alert(data);
        },
        Error : function(xhr, error, exception) {
            // handle the error.
            alert(exception.toString());
        }
    });
}

get_store_list(1);

//testt