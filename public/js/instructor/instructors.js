//Get instructors
function getInstructors(successCallback) {
    var getInstructorSettings = {
      url: BASE_URL + "/instructors",
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "GET",
      success: function(res){
          successCallback(res);
      }
    }
    $.ajax(getInstructorSettings);
  }
// Display Instructors
  function displayInstructors (response) {
      var transElement = '';
    if(response.instructors) {
        response.instructors.forEach(function(instructor) {
            transElement += `<a href="./instructor_edit_remove.html?instructorId=${instructor.id}" class="col-xs-6 col-sm-3 placeholder js-edit">
            <img class="img-responsive" src="../img/defaultavatar.png" width="200" height="200">
            <h4>${instructor.instructorName}</h4>
            <span class="text-muted">${instructor.email}</span>
            </a>`;
        })
    }
    $(".instructorsDisplay").html(transElement);
  }

function displayName(){
    $('.username span').text(localStorage.getItem('instructorName'));
}

//Watch Page Load
function watchPageLoad() {
    displayName();
    getInstructors(displayInstructors);
}

$(watchPageLoad);