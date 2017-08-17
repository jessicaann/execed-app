$(".newFileForm").submit(function(event) {
    event.preventDefault();
    //get the info from the input
    const firstName = $(".newFileForm #firstName").val().trim();
    const lastName = $(".newFileForm #lastName").val().trim();
    const yearPublished = $(".newFileForm #yearPublished").val().trim();
    const title = $(".newFileForm #title").val().trim();
    const file = $(".newFileForm #file")[0].files[0];
    const fd = new FormData();
    
    fd.append('firstName', firstName);
    fd.append('lastName', lastName);
    fd.append('yearPublished', yearPublished);
    fd.append('title', title);
    fd.append('file', file);
    
    var getFileSettings = {
      url: BASE_URL + "/files",
      async: true,
      data: fd,
      dataType: "json",
      method: "POST",
      processData: false,
      contentType: false,
      mimeType: "multipart/form-data",
        error: function(res){var transElement = 
            `<div class="negative-msg-display">Unable to create file</div>`;
            $(".msg-display").html(transElement);},
      success: function(res){var transElement = 
            `<div class="positive-msg-display">File created</div>`;
            $(".msg-display").html(transElement);}
      }
    $.ajax(getFileSettings);
})