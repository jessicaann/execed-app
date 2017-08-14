//Get Schedules for Admin
function getAdmins(successCallback) {
    var getAdminSettings = {
      url: BASE_URL + "/admins",
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "GET",
      success: function(res){
          successCallback(res);
      }
    }
    $.ajax(getAdminSettings);
  }
// Display Schedules
  function displayAdmins (response) {
      var transElement = '';
    if(response.admins) {
        response.admins.forEach(function(admin) {
            transElement += `<div class="col-xs-6 col-sm-3 placeholder js-editAdmin">
            <img class="img-responsive" src="../img/defaultavatar.png" width="200" height="200">
            <h4>${admin.fullName}</h4>
            <span class="text-muted">${admin.email}</span>
            </div>`;
        })
    }
    $(".adminsDisplay").html(transElement);
  }

function handleAdminClicks() {
    $('.adminsDisplay').on('click', '.js-editAdmin',function(event) {
        //get the id of the item we clicked on
        const email = $('.js-editAdmin this.span').text(); //need to figure out how to use THIS to refer to the span that is on the one that's clicked
        console.log(email);
        //go to the editAdmins page
        //populate the data from that item into a form
    })
}
$(handleAdminClicks);

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
            `<div class="invalidLogin">Invalid login</div>`;
            $(".form-signin div").html(transElement);},
      success: function(res){
          localStorage.setItem("adminId", res.accessToken);
          localStorage.setItem("adminName", res.username);
          location.href="./dashboard.html";
      }
    }
    $.ajax(getLoginSettings);
})
function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Dashboard Page Load
function watchAdminsPageLoad() {
    displayName();
    getAdmins(displayAdmins);
}

$(watchAdminsPageLoad);