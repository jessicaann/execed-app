$(".newInstructorForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const firstName = $(".newInstructorForm #firstName").val().trim();
    const lastName = $(".newInstructorForm #lastName").val().trim();
    const email = $(".newInstructorForm #email").val().trim();
    var getLoginSettings = {
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
    $.ajax(getLoginSettings);
})