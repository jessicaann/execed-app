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
        var scheduleSessions = response.sessions;
        var sortingTest = scheduleSessions.sort(function(a, b){
            return new Date(a.startTime) - new Date(b.startTime);
        });
        scheduleSessions.forEach(function(session) {
            let startTime = new Date(session.startTime);
            let endTime = new Date(session.endTime);
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
            session.instructors.forEach(function(instructor){ instructorNames.push(instructor.instructorName);
            })
            session.preWork.forEach(function(preWork){
                preWorkTitles.push(preWork.title);
            })
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            sessionsElements += 
                `<div class="scheduleItem">
                <div class="detail">
                    <ul>
                        <li><a href="sessionDisplay.html?sessionId=${session.id}" class="detailBtn btn btn-info btn-sm">Session Details</a></li>
                        <li><div class="detailBtn btn btn-secondary btn-sm">Prework Status</div></li>
                    </ul>                  
                </div>
                <p>Title: ${session.title}</p>
                <p>Date: ${months[startTime.getMonth()]} ${startTime.getDate()}, ${startTime.getFullYear()}
                <p>Time: ${startTime.getHours()}:${startMinutes()} - ${endTime.getHours()}:${endMinutes()}</p>
                <p>Instructors: ${instructorNames.join(', ')}</p>
                <p>Prework: ${preWorkTitles.join(', ')}</p>
            </div>
            </a>`;
        })
        //$('.editSchedBtn').attr('href', `schedule_edit_remove.html?scheduleId=${response.id}`);
    }
    $(".schedulesDisplay").html(sessionsElements);
  }
function displayName(){
    $('.username span').text(localStorage.getItem('userName'));
}

//Watch Dashboard Page Load
function watchDashboardPageLoad() {
    displayName();
    getSchedules(displaySchedules);
}

$(watchDashboardPageLoad);