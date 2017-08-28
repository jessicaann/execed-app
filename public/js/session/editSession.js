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
    const {title, instructors, preWork} = response;
    var instructorsNames = [];
    var preWorkTitles = [];
    instructors.forEach(function(instructor){
                instructorsNames.push(instructor.instructorName);
            });
    preWork.forEach(function(preWork){
                preWorkTitles.push(preWork.title);
            });
    let startTime = new Date(response.startTime);
    let endTime = new Date(response.endTime);
    const startMinutes = function() {
                if (startTime.getMinutes() == 0) {
                return '00';
                }
                if (startTime.getMinutes() <10) {
                    return '0'+startTime.getMinutes().slice(-2);
                }
                else {
                    return startTime.getMinutes();
                }
            }
            const endMinutes = function() {
                if (endTime.getMinutes() == 0) {
                return '00';
                }
                if (endTime.getMinutes() <10) {
                    return '0'+endTime.getMinutes().slice(-2);
                }
                else {
                    return endTime.getMinutes();
                }
            }
            const startTimeVar = startTime.getHours() + ':' + startMinutes();
    //help with filling the dates and times
    $('#title').val(title);
    $('#startTime').val(startTimeVar);
    $('#endTime').val(endTime);
    
    getInstructors(displayInstructors, instructors);
    getPrework(displayPrework, preWork)
}

$(".editSessionForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const title = $(".editSessionForm #title").val().trim();
    const startTime = $(".editSessionForm #startTime").val();
    const endTime = $(".editSessionForm #endTime").val();
    const instructors = $(".editSessionForm #instructors").val();
    const preWork = $(".editSessionForm #prework").val();
    
    var getSessionSettings = {
      url: BASE_URL + "/sessions/" + localStorage.getItem('editSessionId'),
      data: JSON.stringify({
        title: title,
        startTime: startTime,
        endTime: endTime,
        instructors: instructors,
        preWork: preWork,
        id: localStorage.getItem('editSessionId')
      }),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "PUT",
      success: function(response){
          console.log(response);
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
function getPrework(successCallback, preworkList) {
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
          successCallback(res, preworkList);
      }
    }
    $.ajax(getPreworkSettings);
  }
// Display prework in dropdown
  function displayPrework (response, preworkList) {
     var transElement = '';
    if(response.files) {
        response.files.forEach(function(file) {
            let isSelected = false;
            preworkList.forEach(function(_preWork){
                if(file.id === _preWork.id){
                   isSelected = true;
                }
            })
            if(isSelected){
                transElement += `<option selected value="${file.id}">${file.title}</option>`;
            }else{
                transElement += `<option value="${file.id}">${file.title}</option>`;
            }
        })
    }
    $('#prework').html(transElement);
  }
//delete call
$(".delete").click(function(event) {
    event.preventDefault();
 
    var getSessionSettings = {
      url: BASE_URL + "/sessions/" + localStorage.getItem('editSessionId'),
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