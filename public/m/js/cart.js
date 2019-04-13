// import { template } from "handlebars";

$(function () {
    // queryCart();

    pullRefresh();
    // mui('.mui-scroll-wrapper').scroll({
    //     deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    // });
    function queryCart() {
        $.ajax({
            url: "/cart/queryCart",
            success: function (data) {
                var html = template("cartTpl", { list: data });
                $(".mui-table-view").html(html);
            }
        })

    }
    // 带有分页查询购物车列表
    function queryCartPaging() {
        $.ajax({
            url: '/cart/queryCartPaging',
            data: { page: 1, pageSize: 4 },
            success: function (data) {
                if (data.error) {
                    location = "login.html?returnURL=" + location.href;
                } else {
                    var html = template("cartTpl", data);
                    $(".cart-products").html(html);
                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                    page = 1;
                    editCart();
                    deleteCart();
                }
            }
        })

    }
    function editCart() {
       
        $('.mui-table-view').on('tap', '.editCart', function () {
            var value = $(this).data("value");
            console.log(value);
            var html = template('editCartTpl', value);
            var str = value.productSize;
            var arr1 = [];
            var arr = str.split("-");
            //将取出的字符串转成数字
            var min = Number(arr[0]);
            var max = Number(arr[1]);
            for (var i = min; i <= max; i++) {
                arr1.push(i);
            }
            value.productSize = arr1;
            console.log(arr1);
            var html = template("editCartTpl", value);
             html=html.replace(/[\r\n]/g,'');
            var li = $(this).parent().parent();
            
            mui.confirm(html, '编辑商品标题', btnArray, function (e) {
                if (e.index == 0) {
                    li.parentNode.removeChild(li);

                } else {
                    setTimeout(function () {
                        mui.swipeoutClose(li);
                    }, 0);
                }
            });
        });
        var btnArray = ['确认', '取消'];
    }
    function deleteCart() {
        $('.mui-table-view').on('tap', '.deleteCart', function () {
            var li = $(this).parent().parent();
            var id = $(this).data("id");
            mui.confirm('确认删除该商品？', '温馨提示', btnArray, function (e) {
                if (e.index == 0) {
                    li.remove(li);
                    $.ajax({
                        url: '/cart/deleteCart',
                        data: { id: id },
                        success: function (data) {
                            if (data.success) {
                                queryCartPaging();
                            }
                        }
                    })
                } else {
                    setTimeout(function () {
                        mui.swipeoutClose(li);
                    }, 0);
                }
            });
        });
        var btnArray = ['确认', '取消'];
    }


    var page = 1;
    function pullRefresh(params) {
        mui.init({
            pullRefresh: {
                container: '.mui-scroll-wrapper',
                down: {
                    auto: true,
                    callback: pulldownRefresh
                },
                up: {

                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });
        /**
         * 下拉刷新具体业务实现
         */
        function pulldownRefresh() {
            setTimeout(function () {
                queryCartPaging();
                // $.ajax({
                //     url: "/cart/queryCartPaging",
                //     data: {
                //         page: 1,
                //         pageSize: 4
                //     },
                //     success: function (data) {

                //         if(data.data.length>0){
                //             var html = template("cartTpl",data);
                //             $(".mui-table-view").html(html);
                //             mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                //             mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                //             page=1;
                //         }
                //     }
                // })


            }, 1500);
        }

        /**
         * 上拉加载具体业务实现
         */
        function pullupRefresh() {

            setTimeout(function () {
                page++;
                $.ajax({
                    url: "/cart/queryCartPaging",
                    data: {
                        page: page,
                        pageSize: 4
                    },
                    success: function (data) {

                        if (data.data) {
                            var html = template("cartTpl", data);
                            $(".cart-products").append(html);
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                            // mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                        } else {
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true); //refresh completed  
                        }
                    }
                })

            }, 1500);
        }
    }

})