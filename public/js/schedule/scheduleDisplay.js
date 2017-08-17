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
    if(response.schedules) {
        response.schedules.forEach(function(schedule) {
            transElement += `<a href="../session/session_edit_remove.html?scheduleId=${schedule.session.id}" class="js-edit">
                <div class="scheduleItem">
                <p>ID: ${schedule.session.id}</p>
                <p>Title: ${schedule.session.title}</p>
                <p>Instructor: ${schedule.session.instructor}</p>
                <p>Time: ${schedule.session.startTime} - ${schedule.session.endTime}</p>
                <p>Prework: ${schedule.session.prework}</p>
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