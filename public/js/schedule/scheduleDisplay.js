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
      var instructorNames = [];
      var preWorkTitles = '';
    if(response.sessions) {
        response.sessions.forEach(function(session) {
            let startTime = new Date(session.startTime);
            session.instructors.forEach(function(instructor){
                instructorNames.push(instructor.instructorName);
            })
            session.preWork.forEach(function(preWork){
                preWorkTitles += `<p>Prework: ${preWork.title}</p>`;
            })
            sessionsElements += `<a href="../session/sessionDisplay.html?sessionId=${session.id}" class="js-edit">
                <div class="scheduleItem">
                <p>ID: ${session.id}</p>
                <p>Title: ${session.title}</p>
                <p>Instructors: ${instructorNames.join(', ')}</p>
                <p>Time: ${startTime.getHours()}:${startTime.getMinutes()} - ${session.endTime}</p>
                ${preWorkTitles}
            </div>
            </a>`;
        })
    }
    $(".schedulesDisplay").html(sessionsElements);
  }
//  On the prework array, how do I make it show multiple items???
function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Dashboard Page Load
function watchDashboardPageLoad() {
    displayName();
    getSchedules(displaySchedules);
}

$(watchDashboardPageLoad);