//do the call that gets the user info and populates it into the form based on the email on page load
function getUsers(successCallback) {
    localStorage.setItem('editUserId', location.search.split("?")[1].split("=")[1]);
    var getUserSettings = {
      url: BASE_URL + "/users/" + localStorage.getItem('editUserId'),
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

$(getUsers(displayUsers));

function displayUsers(response){
    const {email, firstName, lastName, schedules} = response;
    $('#firstName').val(firstName);
    $('#email').val(email);
    $('#lastName').val(lastName);
    $('#currentSchedule').val(schedules.title);
}

$(".editUserForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const firstName = $(".editUserForm #firstName").val();
    const lastName = $(".editUserForm #lastName").val();
    const email = $(".editUserForm #email").val();
    const password = $(".editUserForm #password").val();
    const schedules = $(".editUserForm #schedules").val();
    
    var getUserSettings = {
      url: BASE_URL + "/users/profile/" + localStorage.getItem('editUserId'),
      data: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        id: localStorage.getItem('editUserId')
      }),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "PUT",
      success: function(response){
          console.log("It's a miracle:", response);
      }
    }
    $.ajax(getUserSettings);
})
//delete call
$(".delete").click(function(event) {
    event.preventDefault();
 
    var getUserSettings = {
      url: BASE_URL + "/users/profile/" + localStorage.getItem('editUserId'),
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "DELETE",
      success: function(response){
          console.log("Item removed", response);
          var transElement = 
            `<div class="itemdeleted">User removed</div>`;
            $(".editUser").html(transElement);
      }
    }
    $.ajax(getUserSettings);
})

function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Page Load
function watchPageLoad() {
    displayName();
}

$(watchPageLoad);