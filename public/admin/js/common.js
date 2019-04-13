
    function employeeLogout(){
        $('.exit').on('click',function(){
          $.ajax({
              url:'/employee/employeeLogout',
              success:function(data){
                  console.log(data);
                  if(data.success){
                      location='login.html';
                  }
              }
          })
        })
       
    }
