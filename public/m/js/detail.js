// import { template } from "handlebars";
$(function () {
    var id = getQueryString("id");
    console.log(id);
    $.ajax({
        url: '/product/queryProductDetail',
        data: { id: id },
        success: function (data) {
            console.log(data);
            var arr1 = [];
            var arr = data.size.split("-");
            //将取出的字符串转成数字
            var min = Number(arr[0]);
            var max = Number(arr[1]);
            for (var i = min; i <= max; i++) {
                arr1.push(i);
            }
            data.size = arr1;
            console.log(arr1);
            var html = template("detailTpl", data);
            $("#main").html(html);
            //初始化轮播图
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            //初始化数字框
            mui(".mui-numbox").numbox();
            $(".btn-size").on('tap', function () {
                $(this).addClass("mui-btn-warning").siblings().removeClass("mui-btn-warning");
            })
        }
    })
    addCart();
    function addCart() {
        $(".cart-btn").on('tap', function () {
            var size = $(".mui-btn.btn-size.mui-btn-warning").data("value");
            console.log(size);
            var num = mui(".mui-numbox").numbox().getValue();
            if (!size) {
                mui.toast('请选择尺码');
            } else {

                $.ajax({
                    url: "/cart/addCart",
                    type: "post",
                    data: {
                        productId: id,
                        size: size,
                        num: num
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.error) {
                            location = "./login.html?returnURL=" + location.href;
                        }else {
                            // location="cart.html?id="+id;
                            mui.confirm("温馨提示","是否要去查看购物车?", ["yes","no"],function(e){
                                console.log(e);
                                if(e.index==0){
                                   location="./cart.html?id="+id+"&size="+size+"&num="+num;
                                }
                            } );
                           
                        }
                    }
                })

            }


        })

    }


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