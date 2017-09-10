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
          location.href="./dashboard.html";
      }
    }
    $.ajax(getLoginSettings);
})


function displayName(){
    $('.username span').text(localStorage.getItem('userName'));
}
//Watch Dashboard Page Load
    function watchDashboardPageLoad() {
        displayName();
    }
    if(location.pathname === "/dashboardUser.html") {
        $(watchDashboardPageLoad);
    }
