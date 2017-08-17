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
    if(response.files) {
        response.files.forEach(function(file) {
            transElement += 
            `<a href="./file_edit_remove.html?fileId=${file.id}">
                <tr class="js-edit">
                    <td>${file.title}</td>
                    <td>${file.authorName}</td>
                    <td>${file.yearPublished}</td>
                    <td>${file.file}</td>
                </tr>
             </a>`;
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