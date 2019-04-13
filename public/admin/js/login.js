$(function(){
    $('.login-btn').on('click',function(){
        var check=true;
        $('.form-group input').each(function(){
            if($(this).val().trim()==''){
                var label=$(this).parent().prev().html();
                alert("请输入"+label);   
                check=false; 
            }
        })
        if(check){
            var username=$('#inputEmail3').val().trim();
            var password=$('#inputPassword3').val().trim();
            console.log(username);
            $.ajax({
                url:'/employee/employeeLogin',
                type:'post',
                data:{
                    username:username,
                    password:password
                },
                success:function(data){
                    console.log(data);
                    if(data.error){
                        alert(data.message);
                    }else{
                        location="index.html";
                    }
                }
            })
        }
    })
})

