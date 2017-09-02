//Get Files
function getFiles(successCallback) {
    var getFileSettings = {
      url: BASE_URL + "/files",
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
// Display files
  function displayFiles (response) {
      var transElement = '';
      console.log(response);
    if(response.files) {
        response.files.forEach(function(file) {
            transElement += 
            `<tr class="js-edit">
                <td><a href="${file.file}" download>${file.title}</a></td>
                <td>${file.author}</td>
                <td>${file.yearPublished}</td>
                <td><a href="../file/file_edit_remove.html?fileId=${file.id}">Edit</a></td>
             </tr>`;
        })
    }
    $(".filesDisplay").html(transElement);
  }

function displayName(){
    $('.username span').text(localStorage.getItem('adminName'));
}

//Watch Page Load
function watchFilesPageLoad() {
    displayName();
    getFiles(displayFiles);
}

$(watchFilesPageLoad);