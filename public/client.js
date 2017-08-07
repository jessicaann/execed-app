var BASE_URL = "http://localhost:8080"

//Page Reveals - Handles Clicks
$(function () {
    $(".jsPaxBttn").click(function() {
        $(".userSignIn").removeClass("hidden");
        $(".site-wrapper").addClass("hidden");
    });
    $(".jsAdminBttn").click(function() {
        $(".adminSignIn").removeClass("hidden");
        $(".site-wrapper").addClass("hidden");
    });
    $(".signUpInvite").click(function() {
        $(".adminSignIn").addClass("hidden");
        $(".newAdminSignUp").removeClass("hidden");
    })
});
//User Sign In Submit
$(".userSignInForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const email = $(".userSignInForm #inputEmail").val();
    const password = $(".userSignInForm #inputPassword").val();
    var getLoginSettings = {
      url: BASE_URL + "/users/session",
      data: JSON.stringify({
        email: email,
        password: password
      }),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "POST",
      success: function(res){
          console.log(res);
          location.href="/dashboard.html";
      }
    }
    $.ajax(getLoginSettings);
})
//Admin Sign In Submit
$(".adminSignInForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const email = $(".adminSignInForm #inputEmail").val();
    const password = $(".adminSignInForm #inputPassword").val();
    var getLoginSettings = {
      url: BASE_URL + "/admins/session",
      data: JSON.stringify({
        email: email,
        password: password
      }),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "POST",
      success: function(res){
          location.href="/dashboard.html";
        
      
    }
    $.ajax(getLoginSettings);
})


//New Admin Registration


//Get Schedules for Admin
function getSchedules(accessToken, successCallback) {
    var getScheduleSettings = {
      url: BASE_URL + "/dashboard.html",
      data: JSON.stringify({
        admin: accessToken//I want the courses to load that are associated w/ the person who logged in.
      }),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "GET",
      success: function(res){
          console.log(res);
      }
    }
    $.ajax(getLoginSettings);
  }
// Display Schedules
  function displaySchedules (schedules) {
     console.log(schedules);
      var transElement = '';
    if(schedules) {
        var keys = Object.keys(schedules);
        keys.forEach(function(key) {
            transElement += 
                '<div class="col-xs-6 col-sm-3 placeholder"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail"><h4>' + schedules.title[key] + '</h4><span class="text-muted">' + schedules.dates[key] + '</span></div>';
        })
    }
    $(".schedulesDisplay").html(transElement);
  }
//Watch Dashboard Page Load
  function watchPageLoad() {
    getSchedules(displaySchedules);
  }
  $(watchPageLoad);