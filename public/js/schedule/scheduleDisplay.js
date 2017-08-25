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
      var preWorkTitles = [];
    if(response.sessions) {
        response.sessions.forEach(function(session) {
            let startTime = new Date(session.startTime);
            session.instructors.forEach(function(instructor){
                instructorNames.push(instructor.instructorName);
            })
            session.preWork.forEach(function(preWork){
                preWorkTitles.push(preWork.title);
            })
            sessionsElements += 
                `<div class="scheduleItem">
                <div class="detail">
                    <a href="../session/sessionDisplay.html?sessionId=${session.id}" class="detailBtn btn btn-info btn-sm">Session Details</a>
                </div>
                <p>ID: ${session.id}</p>
                <p>Title: ${session.title}</p>
                <p>Time: ${startTime.getHours()}:${startTime.getMinutes()} - ${session.endTime}</p>
                <p>Instructors: ${instructorNames.join(', ')}</p>
                <p>Prework: ${preWorkTitles.join(', ')}</p>
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