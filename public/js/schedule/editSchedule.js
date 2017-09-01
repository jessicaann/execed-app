//do the call that gets the schedule info and populates it into the form based on the email on page load
function getSchedules(successCallback) {
    localStorage.setItem('editScheduleId', location.search.split("?")[1].split("=")[1]);
    var getScheduleSettings = {
      url: BASE_URL + "/schedules/" + localStorage.getItem('editScheduleId'),
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "GET",
      success: function(res){
          successCallback(res);
          console.log(res);
      }
    }
    $.ajax(getScheduleSettings);
  }

function displaySchedules(response){
    const {title, dates, sessions} = response;
    var sessionTitles = [];
    sessions.forEach(function(session){
                sessionTitles.push(session.title);
            });

    $('#title').val(title);
    $('#dates').val(dates);
    $('#sessions').val(sessionTitles);
    
    getSessions(displaySessions, sessions);
}

$(".editScheduleForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const title = $(".editScheduleForm #title").val().trim();
    const dates = $(".editScheduleForm #dates").val();
    const sessions = $(".editScheduleForm #sessions").val();
    
    var getScheduleSettings = {
      url: BASE_URL + "/schedules/" + localStorage.getItem('editScheduleId'),
      data: JSON.stringify({
        title: title,
        dates: dates,
        sessions: sessions,
        id: localStorage.getItem('editScheduleId')
      }),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "PUT",
      error: function(response){
        var transElement = 
        `<div class="negative-msg-display">Unable to update schedule</div>`;
        $(".msg-display").html(transElement);},
      success: function(response){
        var transElement = 
        `<div class="positive-msg-display">Schedule updated</div>`;
        $(".msg-display").html(transElement);}
    }
    $.ajax(getScheduleSettings);
})

function getSessions(successCallback, sessionsList) {
    var getSessionSettings = {
      url: BASE_URL + "/sessions",
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "GET",
      success: function(res){
          console.log(res);
          successCallback(res, sessionsList);
      }
    }
    $.ajax(getSessionSettings);
  }
// Display Sessions
function displaySessions (response, sessionsList) {
    var transElement = '';
    if(response.sessions) {
        response.sessions.forEach(function(session) {
            let isSelected = false;
            sessionsList.forEach(function(_session){
                if(session.title === _session.title){
                   isSelected = true;
                }
            })
            if(isSelected){
                transElement += `<option selected value="${session.id}">${session.title}</option>`;
            }else{
                transElement += `<option value="${session.id}">${session.title}</option>`;
            }
        })
    }
    $('#sessions').html(transElement);
}
//delete call
$(".delete").click(function(event) {
    event.preventDefault();
    confirm('Delete this item?');
    var getScheduleSettings = {
      url: BASE_URL + "/schedules/" + localStorage.getItem('editScheduleId'),
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "DELETE",
      success: function(response){
          console.log("Item removed", response);
          var transElement = 
            `<div class="itemdeleted">Schedule removed</div>`;
            $(".editSchedule").html(transElement);
      }
    }
    $.ajax(getScheduleSettings);
})

$(".newSessionBtn").click(function(event) {
    event.preventDefault();
    $('.newSession').removeClass('hidden');
    getInstructors(displayInstructors);
    getPrework(displayPrework);
})
$(".cancel").click(function(event) {
    event.preventDefault();
    $('.newSession').addClass('hidden');
})

function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}
//get instructors
function getInstructors(successCallback) {
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
          successCallback(res);
      }
    }
    $.ajax(getInstructorSettings);
  }
// Display instructors in dropdown
  function displayInstructors (response) {
     console.log(response);
      var transElement = '';
    if(response.instructors) {
        response.instructors.forEach(function(instructor) {
            transElement += `<option value="${instructor.id}">${instructor.instructorName}</option>`;
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

$(".newSessionForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const title= $(".newSessionForm #title").val().trim();
    const startTime = $(".newSessionForm #startTime").val().trim();
    const endTime = $(".newSessionForm #endTime").val().trim();
    const instructors = $(".newSessionForm #instructors").val();
    const preWork = $(".newSessionForm #prework").val();
    const admin = localStorage.getItem('adminId');
    
    var getScheduleSettings = {
      url: BASE_URL + "/sessions",
      data: JSON.stringify({
        title: title,
        startTime: startTime,
        endTime: endTime,
        instructors: instructors,
        preWork: preWork,
        admin: admin
      }),
      dataType: "json",
      headers: {
            "content-type": "application/json"
        },
      method: "POST",
      error: function(res){var transElement = 
            `<div class="negative-msg-display">Unable to create session</div>`;
            $(".session-msg-display").html(transElement);
            $('.newSession').addClass('hidden');
        },
      success: function(res){var transElement = 
            `<div class="positive-msg-display">Session created</div>`;
            $(".session-msg-display").html(transElement);
            $('.newSession').addClass('hidden');
            var newSession = `<option value="${res.id}">${res.title}</option>`;
            $("#sessions").prepend(newSession);
        }
      }
    $.ajax(getScheduleSettings);
})
//Watch Page Load
function watchPageLoad() {
    displayName();
    getSchedules(displaySchedules);
}

$(watchPageLoad);