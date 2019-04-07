// import { template } from "handlebars";

$(function(){
    queryHistory();
    $(".btn-search").on("tap",function(){
       var search= $(".search-txt").val().trim();
       if(search==""){
           return;
       }
      
        var history=localStorage.getItem("searchHistory");
        // var history=JSON.parse(localStorage.getItem("searchHistory"));
        console.log(history);
        if(history==null){
            var arr=[];
        }else{
            var arr=JSON.parse(history);
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
    })

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
        localStorage.getItem("searchHistory");
        var history=JSON.parse(localStorage.getItem("searchHistory"));
        if(history==null){
            var arr=[];
        }else{
            var arr=history;
        }

        var html=template("searchTpl",{ list:arr });
        $(".mui-table-view").html(html);
    }
})