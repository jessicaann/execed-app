$(".editAdminForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const firstName = $(".editAdminForm #firstName").val();
    const lastName = $(".editAdminForm #lastName").val();
    const email = $(".editAdminForm #email").val();
    const password = $(".editAdminForm #password").val();
    
    var getAdminSettings = {
      url: BASE_URL + "/admins/profile/" + localStorage.getItem('editId'), //need to get the admin id that we want to change from local storage - store from the all admins page?
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
      method: "PUT",
      success: function(response){
          console.log("It's a miracle:", response);
          location.href="../admin/admins.html";
      }
    }
    $.ajax(getAdminSettings);
})
//delete call
$(".delete").click(function(event) {
    event.preventDefault();
 
    var getAdminSettings = {
      url: BASE_URL + "/admins/profile/" + localStorage.getItem('editId'), //need to get the admin id that we want to change from local storage - store from the all admins page?
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