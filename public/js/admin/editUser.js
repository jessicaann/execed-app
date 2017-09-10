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
    var scheduleTitles = [];
    schedules.forEach(function(schedule){
        scheduleTitles.push(schedule.title);
    });
    $('#firstName').val(firstName);
    $('#email').val(email);
    $('#lastName').val(lastName);

    getSchedules(displaySchedules, schedules);
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
      url: BASE_URL + "/users/" + localStorage.getItem('editUserId'),
      data: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        schedules: schedules,
        id: localStorage.getItem('editUserId')
      }),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "PUT",
      error: function(response){
        var transElement = 
        `<div class="negative-msg-display">Unable to update user</div>`;
        $(".msg-display").html(transElement);},
      success: function(response){
        var transElement = 
        `<div class="positive-msg-display">User updated</div>`;
        $(".msg-display").html(transElement);}
    }
    $.ajax(getUserSettings);
})

function getSchedules(successCallback, scheduleTitles) {
    var getScheduleSettings = {
      url: BASE_URL + "/schedules",
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "GET",
      success: function(res){
          console.log(res);
          successCallback(res, scheduleTitles);
      }
    }
    $.ajax(getScheduleSettings);
  }
// Display Schedules
function displaySchedules (response, scheduleTitles) {
    var transElement = '';
    if(response.schedules) {
        response.schedules.forEach(function(schedule) {
            let isSelected = false;
            scheduleTitles.forEach(function(_schedule){
                if(schedule.id === _schedule.id){
                   isSelected = true;
                }
            })
            if(isSelected){
                transElement += `<option selected value="${schedule.id}">${schedule.title}</option>`;
            }else{
                transElement += `<option value="${schedule.id}">${schedule.title}</option>`;
            }
        })
    }
    $('#schedules').html(transElement);
}

//delete call
$(".delete").click(function(event) {
    event.preventDefault();
    var deleteConfirm = confirm('Delete this item?');
    if (!deleteConfirm) {
        return
    }
    var getUserSettings = {
      url: BASE_URL + "/users/" + localStorage.getItem('editUserId'),
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "DELETE",
      error: function(response){
        console.log("Cannot delete item", response);
        var transElement = 
          `<div class="negative-msg-display">Cannot delete item</div>`;
          $(".msg-display").html(transElement);
      },
      success: function(response){
          console.log("Item removed", response);
          var transElement = 
            `<div class="itemdeleted">User deleted</div>`;
            $(".msg-display").html(transElement);
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
    getUsers(displayUsers);
}

$(watchPageLoad);