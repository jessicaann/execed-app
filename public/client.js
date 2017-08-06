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
          //the response from the router location.href="name of the page" use the access token in the next page
          console.log(res);
      }
    }
    $.ajax(getLoginSettings);
})