//Get Users
function getUsers(successCallback) {
    var getUserSettings = {
      url: BASE_URL + "/users",
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
    $.ajax(getUserSettings);
  }
// Display users
  function displayUsers (response) {
      var transElement = '';
    if(response.users) {
        response.users.forEach(function(user) {
            transElement += `<a href="./user_edit_remove.html?userId=${user.id}" class="col-xs-6 col-sm-3 placeholder js-edit">
            <img class="img-responsive" src="../img/defaultavatar.png" width="200" height="200">
            <h4>${user.fullName}</h4>
            <span class="text-muted">${user.email}</span>
            </a>`;
        })
    }
    $(".usersDisplay").html(transElement);
  }

function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Page Load
function watchUsersPageLoad() {
    displayName();
    getUsers(displayUsers);
}

$(watchUsersPageLoad);