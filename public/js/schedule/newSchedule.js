$(".newScheduleForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const title= $(".newScheduleForm #title").val().trim();
    const dates = $(".newScheduleForm #dates").val().trim();
    const admin = localStorage.getItem('adminId');
    const sessions = $(".newScheduleForm #sessions").val();
    console.log(sessions);
    var getScheduleSettings = {
      url: BASE_URL + "/schedules",
      data: JSON.stringify({
        title: title,
        dates: dates,
        admin: admin,
        sessions: sessions
      }),
      dataType: "json",
      headers: {
            "content-type": "application/json"
        },
      method: "POST",
      success: function(res){var transElement = 
            `<div class="positive-msg-display">Schedule created</div>`;
            $(".msg-display").html(transElement);}
      }
    $.ajax(getScheduleSettings);
})

function getSessions(successCallback) {
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
          successCallback(res);
      }
    }
    $.ajax(getSessionSettings);
  }
// Display sessions in dropdown
  function displaySessions (response) {
     console.log(response);
    console.log("displaySessions");
      var transElement = '';
    if(response.sessions) {
        response.sessions.forEach(function(session) {
            transElement += `<option value="${session.id}">${session.title}</option>`;
        })
    }
    $('#sessions').html(transElement);
  }

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
    const instructor = $(".newSessionForm #instructors").val();
    const preWork = $(".newSessionForm #prework").val();
    const admin = localStorage.getItem('adminId');
    
    var getScheduleSettings = {
      url: BASE_URL + "/sessions",
      data: JSON.stringify({
        title: title,
        startTime: startTime,
        endTime: endTime,
        instructor: instructor,
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
function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Page Load
function watchPageLoad() {
    displayName();
    getSessions(displaySessions);
}

$(watchPageLoad);