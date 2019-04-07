$(function () {
    leftSlide();
    rightSlide();
    queryTopCategory();
    querySecondCategory(1);
    function leftSlide() {
        mui('.left .mui-scroll-wrapper').scroll({
            indicators: false, //是否显示滚动条
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }

    function rightSlide() {
        // 初始化右侧 需要滚动条
        mui('.right .mui-scroll-wrapper').scroll({
            indicators: true, //是否显示滚动条
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }

    function queryTopCategory(){
        $.ajax({
            url: "/category/queryTopCategory",
            success: function (data) {
                var html = template('categoryLeft', data);//data如果不是对象需要{{list:data}}
                // console.log(data);
                $(".left ul").html(html);
                $(".left ul li").on('tap',function(){//给左侧分类的所有li添加点击事件,推荐使用tap事件
                    // this.dataset['id'];//原生方式获取的是字符串
                   var id= $(this).data('id');//zepto的函数方式封装了函数会获取数据并做类型转换(推荐使用)
                   querySecondCategory(id);
                })
            }
        })
    }
    function querySecondCategory(id){
        $.ajax({
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            success:function(data){
                var html=template("categoryRightTpl",data);
                console.log(data);
                $('.right .mui-row').html(html);
            }
        })
    }



    

})
