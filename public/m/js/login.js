$(function(){
    $(".login-btn").on('tap',function(){
       var username= $(".login-name").val();
       var password=$('.login-pwd').val();
       $.ajax({
           url:'/user/login',
           type:'post',
           data:{
               username:username,
               password:password
           },
           success:function(data){
            console.log(data);
            if(data.error){
                mui.toast(data.message);
            }else{
               location= getQueryString("returnURL");
               
            }
           }
       })
    })


    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 用了另一种转码方式 我们是默认转码方式 使用decodeURI
            // return unescape(r[2]);
            return decodeURI(r[2]);
        }
        return null;
    }
})