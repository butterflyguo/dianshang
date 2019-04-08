// import { template } from "handlebars";

$(function(){
    addHistory();
    queryHistory();
    
    function addHistory(){
        $(".btn-search").on("tap",function(){
            var search= $(".search-txt").val().trim();
            if(search==""){
                return;
            }
           
             var arr=localStorage.getItem("searchHistory");
             console.log(arr);
             if(arr==null){
                  arr=[];
             }else{
                  arr=JSON.parse(arr);
             }
            console.log(arr);
            arr= uniq(arr);
     
             for(var i=0;i<arr.length;i++){
                 if(arr[i]==search){
                     arr.splice(i,1);
                     i--;
                 }
             }
             arr.unshift(search);
             console.log(arr);
             localStorage.setItem("searchHistory",JSON.stringify(arr));
             $(".search-txt").val("");
             queryHistory();
             location="productList.html?search="+search;
         })
    }
   

    function uniq(array) {
        var temp = []; //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
            if (temp.indexOf(array[i]) == -1) {
                temp.push(array[i]);
            }
        }
        return temp;
    }


    function queryHistory(){
        var arr=localStorage.getItem("searchHistory");
        if(arr==null){
             arr=[];
        }else{
             arr=JSON.parse(arr);
        }

        var html=template("searchTpl",{ list:arr });
        $(".mui-table-view").html(html);
    }

    $('.mui-table-view').on('tap','.fa-times',function(){
        var index=$(this).data('index');
        var arr=localStorage.getItem('searchHistory');
        arr=JSON.parse(arr);
        console.log(arr);
        arr.splice(index,1);
        arr=JSON.stringify(arr);
        localStorage.setItem('searchHistory',arr);
        queryHistory();
    })

    $(".clearAll").on('tap',function(){
        localStorage.removeItem('searchHistory');
        queryHistory();
    })

})