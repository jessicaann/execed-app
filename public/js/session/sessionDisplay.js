function getSession(successCallback) {
    localStorage.setItem('sessionId', location.search.split("?")[1].split("=")[1]);
    var getSessionSettings = {
      url: BASE_URL + "/sessions/" + localStorage.getItem("sessionId"),
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
// Display Session
  function displaySession (response) {
      console.log(response);
      $(".sessionTitle").text(`${response.title}`);
      var sessionsElements = '';
      var instructorNames = [];
      var preWorkTitles = [];
    if(response) {
            response.instructors.forEach(function(instructor){
                instructorNames.push(instructor.instructorName);
            })
            response.preWork.forEach(function(preWork){
                preWorkTitles.push(preWork.title);
            })
            sessionsElements += `
                <div class="sessionItem">
                <p>ID: ${response.id}</p>
                <p>Title: ${response.title}</p>
                <p>Time: ${response.startTime} - ${response.endTime}</p>
                <p>Instructor: ${instructorNames.join(', ')}</p>
                <p>Prework: ${preWorkTitles.join(', ')}</p>
            </div>`;
        $('.editBtn').attr('href', `session_edit_remove.html?sessionId=${response.id}`);
        }
    $(".sessionDisplay").html(sessionsElements);
  }
function returnBtn(){
    const previousPage = `<a href="#" class="btn btn-info btn-lg btn-primary" role="button">Return to Schedule</a>`;
    $('.return').html(previousPage);
    $('.return').on('click', function(){
        history.back();
    })
}

function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Dashboard Page Load
function watchDashboardPageLoad() {
    displayName();
    getSession(displaySession);
    returnBtn();
}

$(watchDashboardPageLoad);