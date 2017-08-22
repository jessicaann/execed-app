function getSchedules(successCallback) {
    localStorage.setItem('scheduleId', location.search.split("?")[1].split("=")[1]);
    var getScheduleSettings = {
      url: BASE_URL + "/schedules/" + localStorage.getItem("scheduleId"),
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
    $.ajax(getScheduleSettings);
  }
// Display Schedules
  function displaySchedules (response) {
      $(".scheduleTitle").text(`${response.title}`);
      $(".scheduleDates").text(`${response.dates}`);
      var sessionsElements = '';
    if(response.sessions) {
        response.sessions.forEach(function(session) {
            sessionsElements += `<a href="../session/session_edit_remove.html?scheduleId=${session.
            _id}" class="js-edit">
                <div class="scheduleItem">
                <p>ID: ${session.
            _id}</p>
                <p>Title: ${session.title}</p>
                <p>Instructor: ${session.instructors.instructorName}</p>
                <p>Time: ${session.startTime} - ${session.endTime}</p>
                <p>Prework: ${session.prework}</p>
            </div>
            </a>`;
        })
    }
    $(".schedulesDisplay").html(sessionsElements);
  }

function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Dashboard Page Load
function watchDashboardPageLoad() {
    displayName();
    getSchedules(displaySchedules);
}

$(watchDashboardPageLoad);