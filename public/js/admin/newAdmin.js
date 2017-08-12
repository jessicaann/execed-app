$(".newAdminForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const firstName = $(".newAdminForm #firstName").val();
    const lastName = $(".newAdminForm #lastName").val();
    const email = $(".newAdminForm #email").val();
    const password = $(".newAdminForm #password").val();
    var getLoginSettings = {
      url: BASE_URL + "/admins",
      data: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "POST",
      success: function(response){
          console.log("It's a miracle:", response);
      }
    }
    $.ajax(getLoginSettings);
})