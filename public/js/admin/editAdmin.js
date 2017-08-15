//do the call that gets the admin info and populates it into the form based on the email on page load
function getAdmins(successCallback) {
    localStorage.setItem('editId', location.search.split("?")[1].split("=")[1]);
    var getAdminSettings = {
      url: BASE_URL + "/admins/" + localStorage.getItem('editId'),
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
    $.ajax(getAdminSettings);
  }

$(getAdmins(displayAdmins));

function displayAdmins(response){
    const {email, firstName, lastName} = response;
    $('#firstName').val(firstName);
    $('#email').val(email);
    $('#lastName').val(lastName);
}

$(".editAdminForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const firstName = $(".editAdminForm #firstName").val();
    const lastName = $(".editAdminForm #lastName").val();
    const email = $(".editAdminForm #email").val();
    const password = $(".editAdminForm #password").val();
    
    var getAdminSettings = {
      url: BASE_URL + "/admins/profile/" + localStorage.getItem('editId'),
      data: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        id: localStorage.getItem('editId')
      }),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "PUT",
      success: function(response){
          console.log("It's a miracle:", response);
      }
    }
    $.ajax(getAdminSettings);
})
//delete call
$(".delete").click(function(event) {
    event.preventDefault();
 
    var getAdminSettings = {
      url: BASE_URL + "/admins/profile/" + localStorage.getItem('editId'),
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "DELETE",
      success: function(response){
          console.log("Item removed", response);
          var transElement = 
            `<div class="itemdeleted">Admin removed</div>`;
            $(".editAdmin").html(transElement);
      }
    }
    $.ajax(getAdminSettings);
})