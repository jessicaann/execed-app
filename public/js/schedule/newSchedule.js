$(".newScheduleForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const title= $(".newScheduleForm #title").val().trim();
    const dates = $(".newScheduleForm #dates").val().trim();
    const admin = localStorage.getItem('adminId');
    const sessions = $(".newScheduleForm #sessions").val().split();
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
// Display Sessions in dropdown
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

function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Page Load
function watchPageLoad() {
    displayName();
    getSessions(displaySessions);
}

$(watchPageLoad);