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
      error: function(res){var transElement = 
            `<div class="negative-msg-display">Invalid login</div>`;
            $(".form-signin div").html(transElement);},
      success: function(res){
          localStorage.setItem("adminId", res.accessToken);
          localStorage.setItem("adminName", res.username);
          location.href="./dashboard.html";
      }
    }
    $.ajax(getLoginSettings);
})


//Watch Dashboard Page Load
    function watchDashboardPageLoad() {
        displayName();
    }
    if(location.pathname === "/dashboardAdmin.html") {
        $(watchDashboardPageLoad);
    }