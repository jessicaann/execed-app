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
      $(".sessionTitle").text(`${response.title}`);
      var sessionsElements = '';
    if(response.sessions) {
        response.sessions.forEach(function(session) {
            sessionsElements += `<a href="../session/sessionDisplay.html?sessionId=${session.
            _id}" class="js-edit">
                <div class="sessionItem">
                <p>ID: ${session.
            id}</p>
                <p>Title: ${session.title}</p>
                <p>Instructor: ${session.instructor.instructorName}</p>
                <p>Time: ${session.startTime} - ${session.endTime}</p>
                <p>Prework: ${session.preWork.title}</p>
            </div>
            </a>`;
        })
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