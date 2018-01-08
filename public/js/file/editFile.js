// do the call that gets the file info and populates it into the form based on the email on page load
function getFiles(successCallback) {
  localStorage.setItem('editFileId', location.search.split('?')[1].split('=')[1]);
  const getFileSettings = {
    url: `${BASE_URL}/files/${localStorage.getItem('editFileId')}`,
    data: JSON.stringify({}),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
    success(res) {
      successCallback(res);
    },
  };
  $.ajax(getFileSettings);
}

$(getFiles(displayFiles));

function displayFiles(response) {
  const {
    title, yearPublished, file, authorFirstName, authorLastName,
  } = response;
  console.log(response);
  $('#title').val(title);
  $('#yearPublished').val(yearPublished);
  $('#firstName').val(authorFirstName);
  $('#lastName').val(authorLastName);
}

$('.newFileForm').submit((event) => {
  event.preventDefault();
  const firstName = $('.newFileForm #firstName').val().trim();
  const lastName = $('.newFileForm #lastName').val().trim();
  const yearPublished = $('.newFileForm #yearPublished').val().trim();
  const title = $('.newFileForm #title').val().trim();
  const file = $('.newFileForm #file')[0].files[0];
  const fd = new FormData();

  fd.append('firstName', firstName);
  fd.append('lastName', lastName);
  fd.append('yearPublished', yearPublished);
  fd.append('title', title);
  fd.append('file', file);
  fd.append('id', localStorage.getItem('editFileId'));

  const getFileSettings = {
    url: `${BASE_URL}/files/profile/${localStorage.getItem('editFileId')}`,
    async: true,
    data: fd,
    dataType: 'json',
    method: 'PUT',
    processData: false,
    contentType: false,
    mimeType: 'multipart/form-data',
    error(response) {
      console.log('Unable to save changes', response);
      let transElement =
            '<div class="negative-msg-display">Unable to save changes</div>';
      $('.msg-display').html(transElement);
    },
    success(response) {
      console.log('Item changed', response);
      let transElement =
            '<div class="positive-msg-display">Changes saved</div>';
      $('.msg-display').html(transElement);
      location.href='./files.html';
    },
  };
  $.ajax(getFileSettings);
});
// delete call
$('.delete').click((event) => {
  event.preventDefault();
  const deleteConfirm = confirm('Delete this item?');
  if (!deleteConfirm) {
    return;
  }
  const getFileSettings = {
    url: `${BASE_URL}/files/profile/${ localStorage.getItem('editFileId')}`,
    data: JSON.stringify({}),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'DELETE',
    error(response) {
      console.log('Unable to delete item', response);
      let transElement =
            '<div class="negative-msg-display"Unable to delete item</div>';
      $('.msg-display').html(transElement);
    },
    success(response) {
      console.log('Item removed', response);
      let transElement =
            '<div class="positive-msg-display">File deleted</div>';
      $('.msg-display').html(transElement);
      location.href='./files.html';
    },
  };
  $.ajax(getFileSettings);
});

function displayName() {
  $('.username span').text(localStorage.getItem('adminName'));
}

// Watch Page Load
function watchPageLoad() {
  displayName();
}

$(watchPageLoad);
