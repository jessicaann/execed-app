$(".newInstructorForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const firstName = $(".newInstructorForm #firstName").val().trim();
    const lastName = $(".newInstructorForm #lastName").val().trim();
    const email = $(".newInstructorForm #email").val().trim();
    var getInstructorSettings = {
      url: BASE_URL + "/instructors",
      data: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email
      }),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "POST",
      success: function(res){var transElement = 
            `<div class="positive-msg-display">Instructor created</div>`;
            $(".msg-display").html(transElement);}
      }
    $.ajax(getInstructorSettings);
})

$(".logout").click(function(event) {
    event.preventDefault();
    //delete the admin's session
    const adminId = localStorage.getItem('adminId');
    var getLogoutSettings = {
      url: BASE_URL + "/admins/session",
      data: JSON.stringify({
        email: email,
        password: password
      }),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "DELETE",
      success: function(res){
          location.href="../logout.html";
      }
    }
    $.ajax(getLogoutSettings);
})
function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Page Load
function watchPageLoad() {
    displayName();
}

$(watchPageLoad);