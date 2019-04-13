// import { template } from "handlebars";
var page=1;
var pageSize=5;
var totalPages=0;
$(function(){
    querySecondCategory();

    brandSave();
    //获取品牌数据
    function querySecondCategory(){
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(data){
                console.log(data); 
                var html=template('secondCategoryTpl',data);
                $('tbody').html(html);
                totalPages=Math.ceil(data.total/data.size);
                page=data.page;
                var html='';
                for(var i=0;i<totalPages;i++){
                    html+= '<li>'+i +'</li>'
                }
                $("#page").html(html);
                initPage();
            }
        })
    }
   //模态框保存功能
   function brandSave(){
    $('.btn-save').on('click',function(){
        var brandName=$('.brandName').val().trim();
        var categoryId=$('.categoryName').val().trim();
        if(!brandName){
            alert("请输入品牌名")
        }
        var brandLoge=$('.modal-body img').attr('src');

        if(!brandLoge){
            alert('请选择图片');
        }

        $.ajax({
            url:'/category/addSecondCategory',
            type:'post',
            data:{
                brandName:brandName,
                cartegoryId:categoryId,
                brandLoge:brandLoge,
                hot:1
            },
            success:function (data) {
                console.log(data);
                if(data.success){
                    querySecondCategory();
                   
                }
              }
        })
    })
   }


   $('.addBrand').on('click',function () {
       // 获取并渲染分类列表的功能
        $.ajax({
            url:'/category/queryTopCategory',
            success:function(data){
                console.log(data);
               var html='';
               for( var i=0;i<data.rows.length;i++){
                html +='<option value="'+ data.rows[i].categoryId +'">'+data.rows[i].categoryName +'</option>'
               }
               $('.input-group select').html(html);
            }
        })
    })

    //获取图片路径的功能
    $('.brandPic').on('change',function(){
        console.dir(this);
        var file=this.files[0];
        if(!file){
            alert('请选择图片');
        }else{
            var formData=new FormData();
            formData.append('pic1',file);
            $.ajax({
                url:'/category/addSecondCategoryPic',
                type:'post',
                data:formData,
                processData: false, //防止浏览器将其转化成字符串 
                contentType: false ,//防止浏览器将其加密
                success:function(data){
                   if(data){
                       $('.modal-body img').attr('src',data.picAddr);
                   }
                }
            })
        }
        
    })

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
                    console.log(page);
                    $.ajax({
                        url:'/category/querySecondCategoryPaging',
                        data:{
                            page:page,
                            pageSize:pageSize
                        },
                        success:function(data){
                            console.log(data); 
                            var html=template('secondCategoryTpl',data);
                            $('tbody').html(html);
                        }
                        })
                    return false;
                }
            });
        }
})