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
            transElement += `<a href="./adminEditRemove.html?adminId=${admin.id}" class="col-xs-6 col-sm-3 placeholder js-editAdmin">
            <img class="img-responsive" src="../img/defaultavatar.png" width="200" height="200">
            <h4>${admin.fullName}</h4>
            <span class="text-muted">${admin.email}</span>
            </a>`;
        })
    }
    $(".adminsDisplay").html(transElement);
  }

function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Dashboard Page Load
function watchAdminsPageLoad() {
    displayName();
    getAdmins(displayAdmins);
}

$(watchAdminsPageLoad);