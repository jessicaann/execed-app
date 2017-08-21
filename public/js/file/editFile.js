//do the call that gets the file info and populates it into the form based on the email on page load
function getFiles(successCallback) {
    localStorage.setItem('editFileId', location.search.split("?")[1].split("=")[1]);
    var getFileSettings = {
      url: BASE_URL + "/files/" + localStorage.getItem('editFileId'),
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
    $.ajax(getFileSettings);
  }

$(getFiles(displayFiles));

function displayFiles(response){
    const {email, firstName, lastName} = response;
    $('#firstName').val(firstName);
    $('#email').val(email);
    $('#lastName').val(lastName);
}

$(".newFileForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const firstName = $(".newFileForm #firstName").val();
    const lastName = $(".newFileForm #lastName").val();
    const yearPublished = $(".newFileForm #yearPublished").val();
    const title = $(".newFileForm #title").val();
    //what if we upload a file? Do we get the value and do a put or do a post?
    
    var getFileSettings = {
      url: BASE_URL + "/files/profile/" + localStorage.getItem('editFileId'),
      data: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        yearPublished: yearPublished,
        title: title,
          //what about the file itself?
        id: localStorage.getItem('editFileId')
      }),
      dataType: "json",
        headers: {
            "content-type": "application/json" //different type of data
        },
      method: "PUT",
      error: function(response){
          console.log("Unable to save changes", response);
          var transElement = 
            `<div class="negative-msg-display">Unable to save changes</div>`;
            $(".msg-display").html(transElement);
      },
      success: function(response){
          console.log("Item removed", response);
          var transElement = 
            `<div class="positive-msg-display">Changes saved</div>`;
            $(".msg-display").html(transElement);
      }
    }
    $.ajax(getFileSettings);
})
//delete call
$(".delete").click(function(event) {
    event.preventDefault();
 
    var getFileSettings = {
      url: BASE_URL + "/files/profile/" + localStorage.getItem('editFileId'),
      data: JSON.stringify({}),
      dataType: "json",
        headers: {
            "content-type": "application/json"
        },
      method: "DELETE",
      error: function(response){
          console.log("Unable to delete item", response);
          var transElement = 
            `<div class="negative-msg-display"Unable to delete item</div>`;
            $(".msg-display").html(transElement);
      },
      success: function(response){
          console.log("Item removed", response);
          var transElement = 
            `<div class="positive-msg-display">File removed</div>`;
            $(".editFile").html(transElement);
      }
    }
    $.ajax(getFileSettings);
})

function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Page Load
function watchPageLoad() {
    displayName();
}

$(watchPageLoad);