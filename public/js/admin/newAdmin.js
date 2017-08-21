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
      success: function(res){var transElement = 
            `<div class="positive-msg-display">Admin created</div>`;
            $(".msg-display").html(transElement);}
    }
    $.ajax(getLoginSettings);
})

function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Page Load
function watchPageLoad() {
    displayName();
}

$(watchPageLoad);