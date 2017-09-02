//Get Schedules for Admin
function getSchedules(successCallback) {
    var getScheduleSettings = {
      url: BASE_URL + "/schedules/admin/" + localStorage.getItem("adminId"),
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
     console.log(response);
    console.log("displaySchedules");
      var transElement = '';
    if(response.schedules) {
        response.schedules.forEach(function(schedule) {
            transElement += `<a href="../schedule/scheduleDisplay.html?scheduleId=${schedule.id}" class="col-xs-6 col-sm-3 placeholder js-edit">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
                <h4>${schedule.title}</h4>
                <span class="text-muted">${schedule.dates}</span>
            </a>`;
        })
    }
    $(".schedulesDisplay").html(transElement);
  }
  
  $(".nav a").on("click", function() {
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });

function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Dashboard Page Load
function watchDashboardPageLoad() {
    displayName();
    getSchedules(displaySchedules);
}

$(watchDashboardPageLoad);