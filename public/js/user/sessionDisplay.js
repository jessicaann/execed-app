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
      var instructorNames = [];
      var preWorkTitles = [];
      var preWorkLinks = [];
    if(response) {
        let startTime = new Date(response.startTime);
        let endTime = new Date(response.endTime);
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
            response.instructors.forEach(function(instructor){
                instructorNames.push(instructor.instructorName);
            })
            response.preWork.forEach(function(preWork){
                preWorkTitles.push(preWork.title);
                preWorkLinks.push('<a href="' + BASE_URL + '/uploads/'+ preWork.file + '" download>' + preWork.title + '</a>')
            })
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            
            sessionsElements += `
                <div class="sessionItem">
                    <div class="detail">
                        <div class="detailBtn btn btn-secondary btn-sm">Prework Status</div></li>                 
                 </div>
                    <p>Time: ${startTime.getHours()}:${startMinutes()} - ${endTime.getHours()}:${endMinutes()}</p>
                    <p>Date: ${months[startTime.getMonth()]} ${startTime.getDate()}, ${startTime.getFullYear()}                
                    <p>Instructor: ${instructorNames.join(', ')}</p>
                    <p>Prework: ${preWorkLinks.join(', ')}</p>
                </div>`;
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