 const signIn = $("#signInForm");
//  const Cookies = require( "js-cookie") ;//
// window.Cookies = require('js-cookie');



function loginUser(){
    // locals.user = JSON.parse( document.cookie);
    
    signIn.submit(function(e){
       console.log("check");
       e.preventDefault();
        $.ajax({
            url: "/api/users/session-create", // Replace with the actual server endpoint URL
            type: "POST",
            data: signIn.serialize(),
            dataType: "json", // Assuming you expect JSON data as the response
            success: function(response) {
              // Handle successful response
            //   Cookies.set('user', response.data, { expires: 7 })
            document.cookie = 
              console.log(response);
           //    $("#response").html("Response: " + JSON.stringify(response));
                document.cookie = JSON.stringify(response.data);
            },
            error: function(xhr, status, error) {
              // Handle error
              console.log("Error status: " + status);
              console.log("Error message: " + error);
            }
        })
    
    })
}

loginUser();
function loginUser(){
    // locals.user = JSON.parse( document.cookie);
    
    signIn.submit(function(e){
       console.log("check");
       e.preventDefault();
        $.ajax({
            url: "/api/users/", // Replace with the actual server endpoint URL
            type: "POST",
            data: signIn.serialize(),
            dataType: "json", // Assuming you expect JSON data as the response
            success: function(response) {
              // Handle successful response
            //   Cookies.set('user', response.data, { expires: 7 })
            document.cookie = 
              console.log(response);
           //    $("#response").html("Response: " + JSON.stringify(response));
                document.cookie = JSON.stringify(response.data);
            },
            error: function(xhr, status, error) {
              // Handle error
              console.log("Error status: " + status);
              console.log("Error message: " + error);
            }
        })
    
    })
}

loginUser();

