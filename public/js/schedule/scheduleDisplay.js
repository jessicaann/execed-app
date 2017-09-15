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
        var scheduleSessions = response.sessions;
        var sortingTest = scheduleSessions.sort(function(a, b){
            return new Date(a.startTime) - new Date(b.startTime);
        });
        scheduleSessions.forEach(function(session) {
            var instructorNames = [];
            var preWorkTitles = [];
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
                    <a href="../session/sessionDisplay.html?sessionId=${session.id}" class="detailBtn btn btn-info btn-sm">Session Details</a>
                </div>
                <p>Title: ${session.title}</p>
                <p>Date: ${months[startTime.getMonth()]} ${startTime.getDate()}, ${startTime.getFullYear()}
                <p>Time: ${startTime.getHours()}:${startMinutes()} - ${endTime.getHours()}:${endMinutes()}</p>
                <p>Instructors: ${instructorNames.join(', ')}</p>
                <p>Prework: ${preWorkTitles.join(', ')}</p>
            </div>
            </a>`;
        })
        $('.editSchedBtn').attr('href', `schedule_edit_remove.html?scheduleId=${response.id}`);
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