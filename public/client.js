var BASE_URL = "http://localhost:8080"

//Page Reveals - Handles Clicks
$(function () {
    $(".jsPaxBttn").click(function() {
        $(".userSignIn").removeClass("hidden");
        $(".signInSelect").addClass("hidden");
    });
    $(".jsAdminBttn").click(function() {
        $(".adminSignIn").removeClass("hidden");
        $(".signInSelect").addClass("hidden");
    });
    $(".signUpInvite").click(function() {
        $(".adminSignIn").addClass("hidden");
        $(".newAdminSignUp").removeClass("hidden");
    })
});