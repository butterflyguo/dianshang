// import { template } from "handlebars";
var page = 1;
var totalPages = 0;
$(function(){
    queryUser();
   
    updateUser();
    employeeLogout();
   
    //请求用户信息功能
function queryUser(){
    $.ajax({
        url:'/user/queryUser',
        data:{
            page:page,
            pageSize:4
        },
        success:function(data){
            console.log(data);
            var html=template('userTpl',data);
            $(".user tbody").html(html);
            totalPages= Math.ceil(data.total/data.size);
            console.log(totalPages);
            var html='';
            for(var i=0;i<totalPages.length;i++){
                
                html+= '<li>'+ i +'</li>';
            }
            $("#page").html(html);
            initPage();
        }
    })
}
//更改用户状态功能(启用/禁用)
  function  updateUser(){
      $(".user tbody").on('click','.userstatus',function () { 
        var id=$(this).data('id');
        var isDelete=$(this).data('delete');
        isDelete= isDelete?0:1;
        $.ajax({
            url:'/user/updateUser',
            type:'post',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(data){
                console.log(data);
                if(data.success){
                    queryUser();
                }
            }
        })
       })
    
  }
  //退出登录功能
  


       //分页功能
       function initPage(){
        $("#page").bootstrapPaginator({
            bootstrapMajorVersion: 3, //对应的bootstrap版本
            currentPage: page, //当前页数
            numberOfPages: 5, //每次显示页数
            totalPages: totalPages, //总页数
            shouldShowPage: true, //是否显示该按钮
            useBootstrapTooltip: true,
            //点击事件
            onPageClicked: function(event, originalEvent, type, page) {
                $.ajax({
                    url:'/user/queryUser',
                    data:{
                        page:page,
                        pageSize:4
                    },
                    success:function(data){
                        var html=template('userTpl',data);
                        $(".user tbody").html(html);
                        
                    }
                })
                return false;
            }
        });
    }

$('.lists>.btn').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active');
})


})