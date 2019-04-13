$(function () {
    var search = getQueryString(search);
    queryProduct({proName:search});
    // var page = 1;
    // var pageSize = 2;
   

    // $.ajax({
    //     url: "/product/queryProduct",
    //     data: { proName: search, page: page || 1, pageSize: pageSize || 2 },
    //     success: function (data) {
    //         console.log(data);
    //         var html = template('productListTpl', data);
    //         $(".product-box").html(html);
    //     }
    // })

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


    $(".btn-search").on('tap', function () {
       search = $(".search-txt").val().trim();
       queryProduct({proName:search});
        // $.ajax({
        //     url: "/product/queryProduct",
        //     data: { proName: search, page: page || 1, pageSize: pageSize || 2 },
        //     success: function (data) {
        //         var html = template('productListTpl', data);
        //         $(".product-box").html(html);
        //     }

        // })
    })


    $(".title a").on('tap', function () {
        $(this).addClass("active").siblings().removeClass("active");
        var type = $(this).data("type");
        var sort = $(this).data("sort");
        if (sort == 1) {
            $(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-up");
            sort = 2;
        } else {
            $(this).find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
            sort = 1;
        }
        $(this).data("sort", sort);
        var params={
            proName:search,
            page:1,
            pageSize:4
        }
        params[type]=sort;
        $.ajax({
            url: "/product/queryProduct",
            data: params,
            success: function (data) {
                console.log(data);
                var html = template('productListTpl', data);
                $(".product-box").html(html);
                mui('#pullrefresh').pullRefresh().refresh(true);
                page++;
            }
        })

    })

    function queryProduct(params) {
       params.page=params.page||1;
       params.pageSize=params.pageSize||2;

        $.ajax({
            url: "/product/queryProduct",
            data: params,
            success: function (data) {
                var html = template('productListTpl', data);
                $(".product-box").html(html);
                mui('#pullrefresh').pullRefresh().refresh(true);
                page=1;
            }
        })
    }


    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: {
                contentdown: "你正在下拉", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "可以松手了", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "哥正在拼命刷新中...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    // 下拉刷新的回调函数 触发了下拉刷新就执行回调
                callback: pulldownRefresh
            },
            up: {
                contentrefresh: '骑手正在火速前往...',
                callback: pullupRefresh
            }
        }
    });
    // 下拉加载具体实现
    function pulldownRefresh() {
        setTimeout(function() {
            queryProduct({
                proName: search,
                page: 1,
                pageSize: 2
            });
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
        }, 1500);
    }
    var count = 0;
    /**
     * 上拉加载具体业务实现
     */
    var page=1;

    function pullupRefresh() {
       
        setTimeout(function() {
            page++;
            $.ajax({
                url: "/product/queryProduct",
                data: {
                    proName: search,
                    page:page,
                    pageSize: 2
                },
                success: function(res) {
                    if(res.data.length>0){
                        var html = template('productListTpl', res);
                        $(".product-box").append(html);
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(); 
                    }else{
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); 
                        
                    }
                    
                }
            })
           
        }, 1500);
    }

    $('.product-box').on('tap','.product-btn',function(){
        var id=$(this).data("id");
        location="detail.html?id="+id;
    })

})
