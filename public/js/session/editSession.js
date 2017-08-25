//do the call that gets the session info and populates it into the form based on the email on page load
function getSessions(successCallback) {
    localStorage.setItem('editSessionId', location.search.split("?")[1].split("=")[1]);
    var getSessionSettings = {
      url: BASE_URL + "/sessions/" + localStorage.getItem('editSessionId'),
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
    $.ajax(getSessionSettings);
  }

function displaySessions(response){
    const {title, startTime, endTime, instructors, preWork} = response;
    console.log(response);
    var instructorsNames = [];
    var preWorkTitles = [];
    instructors.forEach(function(instructor){
                instructorsNames.push(instructor.instructorName);
            });
    preWork.forEach(function(preWork){
                preWorkTitles.push(preWork.title);
            });
    
    $('#title').val(title);
    $('#startTime').val(startTime); //can it fill a date/local input?
    $('#endTime').val(endTime);
    $('#currentInstructors').val(instructorsNames.join(", "));
    $('#currentPrework').val(preWorkTitles.join(", "));
    
    getInstructors(displayInstructors, instructors);
    getPrework(displayPrework, preWork)
}

$(".editSessionForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const firstName = $(".editSessionForm #firstName").val();
    const lastName = $(".editSessionForm #lastName").val();
    const email = $(".editSessionForm #email").val();
    const password = $(".editSessionForm #password").val();
    console.log($(".editSessionForm #schedules").val());
    /*const schedules = function() {
        if($(".editSessionForm #schedules").val() !== "") { return $(".editSessionForm #schedules").val();
    } else{
       return $(".editSessionForm #currentSchedule").val();
    } 
};*/
//can I set this to the current schedule if there is not value in this one?
    
    var getSessionSettings = {
      url: BASE_URL + "/sessions/profile/" + localStorage.getItem('editSessionId'),
      data: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        id: localStorage.getItem('editSessionId')
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
    $.ajax(getSessionSettings);
})

function getInstructors(successCallback, instructorsList) {
    var getInstructorSettings = {
      url: BASE_URL + "/instructors",
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "GET",
      success: function(res){
          console.log(res);
          successCallback(res, instructorsList);
      }
    }
    $.ajax(getInstructorSettings);
  }
// Display Instructors
function displayInstructors (response, instructorsList) {
    var transElement = '';
    if(response.instructors) {
        response.instructors.forEach(function(instructor) {
            let isSelected = false;
            instructorsList.forEach(function(_instructor){
                if(instructor.id === _instructor.id){
                   isSelected = true;
                }
            })
            if(isSelected){
                transElement += `<option selected value="${instructor.id}">${instructor.instructorName}</option>`;
            }else{
                transElement += `<option value="${instructor.id}">${instructor.instructorName}</option>`;
            }
        })
    }
    $('#instructors').html(transElement);
}
//get preworks
function getPrework(successCallback) {
    var getPreworkSettings = {
      url: BASE_URL + "/files",
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
    $.ajax(getPreworkSettings);
  }
// Display prework in dropdown
  function displayPrework (response) {
     console.log(response);
      var transElement = '';
    if(response.files) {
        response.files.forEach(function(file) {
            transElement += `<option value="${file.id}">${file.title}</option>`;
        })
    }
    $('#prework').html(transElement);
  }
//delete call
$(".delete").click(function(event) {
    event.preventDefault();
 
    var getSessionSettings = {
      url: BASE_URL + "/sessions/profile/" + localStorage.getItem('editSessionId'),
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "DELETE",
      success: function(response){
          console.log("Item removed", response);
          var transElement = 
            `<div class="itemdeleted">Session removed</div>`;
            $(".editSession").html(transElement);
      }
    }
    $.ajax(getSessionSettings);
})

function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Page Load
function watchPageLoad() {
    displayName();
    getSessions(displaySessions);
}

$(watchPageLoad);