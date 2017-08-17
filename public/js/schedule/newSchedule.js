$(".newScheduleForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const firstName = $(".newScheduleForm #firstName").val().trim();
    const lastName = $(".newScheduleForm #lastName").val().trim();
    const email = $(".newScheduleForm #email").val().trim();
    var getScheduleSettings = {
      url: BASE_URL + "/schedules",
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
            `<div class="positive-msg-display">Schedule created</div>`;
            $(".msg-display").html(transElement);}
      }
    $.ajax(getScheduleSettings);
})