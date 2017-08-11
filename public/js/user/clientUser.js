var BASE_URL = "http://localhost:8080"

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
      error: function(res){var transElement = 
            `<div class="invalidLogin">Invalid login</div>`;
            $(".form-signin div").html(transElement);},
      success: function(res){
          localStorage.setItem("userId", res.accessToken);
          localStorage.setItem("userName", res.username);
          location.href="/dashboardUser.html";
      }
    }
    $.ajax(getLoginSettings);
})

//Get Schedules for User
function getSchedules(successCallback) {
    var getScheduleSettings = {
      url: BASE_URL + "/users/" + localStorage.getItem("userId") + "/schedules",
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "GET",
      success: function(res){
          console.log(res);
          successCallback(res);
      }
    }
    $.ajax(getScheduleSettings);
  }
// Display Schedules
  function displaySchedules (response) {
     console.log(response);
    console.log("displaySchedules");
      var transElement = '';
    if(response.users.schedules) {
        response.users.schedules.forEach(function(schedule) {
            transElement += `<div class="col-xs-6 col-sm-3 placeholder">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
                <h4>${schedule.title}</h4>
                <span class="text-muted">${schedule.dates}</span>
            </div>`;
        })
    }
    $(".schedulesDisplay").html(transElement);
  }

function displayName(){
    $('.username span').text(localStorage.getItem('userName'));
}
//Watch Dashboard Page Load
    function watchDashboardPageLoad() {
        displayName();
        getSchedules(displaySchedules);
    }
    if(location.pathname === "/dashboardUser.html") {
        $(watchDashboardPageLoad);
    }
