// import { template } from "handlebars";

$(function(){
    queryTopCategory();
    addTopCategory();
    function queryTopCategory(){
        $.ajax({
            url:'/category/queryTopCategory',
            success:function(data){
                console.log(data);
                var html=template('firstCategoryTpl',data);
                $('.right tbody').html(html);
                var html= '<li>1</li>';
                $("#page").html(html);
                initPage();
            }
        })
       
    }

     //分页功能
     function initPage(){
        $("#page").bootstrapPaginator({
            bootstrapMajorVersion: 3, //对应的bootstrap版本
            currentPage: 1, //当前页数
            numberOfPages: 5, //每次显示页数
            totalPages: 1, //总页数
            shouldShowPage: true, //是否显示该按钮
            useBootstrapTooltip: true,
  
        });
    }

    //初始化模态框
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').focus();
      })

      //模态框的保存功能
      function addTopCategory(){
          $('.btn-save').on('click',function(){
              var categoryName=$('.modal-body input').val().trim();
              if(!categoryName){
                  alert('请输入分类名称');
                  return false;//阻止按钮的默认行为(关闭)
              }else {
                $.ajax({
                    url:'/category/addTopCategory',
                    type:'post',
                    data:{categoryName:categoryName},
                    success:function(data){
                        console.log(data);
                        if(data.success){
                            queryTopCategory(); 
                            $('.modal-body input').val('');
                        }
                    }
                })
              }
        
          })
         
      }
})