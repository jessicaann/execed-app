// do the call that gets the admin info and populates it into the form based on the email on page load
function getAdmins(successCallback) {
  localStorage.setItem('editId', location.search.split('?')[1].split('=')[1]);
  const getAdminSettings = {
    url: `${BASE_URL}/admins/${localStorage.getItem('editId')}`,
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
  $.ajax(getAdminSettings);
}

$(getAdmins(displayAdmins));

function displayAdmins(response) {
  const { email, firstName, lastName } = response;
  $('#firstName').val(firstName);
  $('#email').val(email);
  $('#lastName').val(lastName);
}

$('.editAdminForm').submit((event) => {
  event.preventDefault();
  // get the info from the input
  const firstName = $('.editAdminForm #firstName').val();
  const lastName = $('.editAdminForm #lastName').val();
  const email = $('.editAdminForm #email').val();
  const password = $('.editAdminForm #password').val();

  const getAdminSettings = {
    url: `${BASE_URL}/admins/profile/${localStorage.getItem('editId')}`,
    data: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      id: localStorage.getItem('editId'),
    }),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
    success(response) {
      const transElement =
        '<div class="positive-msg-display">Admin updated</div>';
      $('.msg-display').html(transElement);
    },
  };
  $.ajax(getAdminSettings);
});
// delete call
$('.delete').click((event) => {
  event.preventDefault();

  const getAdminSettings = {
    url: `${BASE_URL}/admins/profile/${localStorage.getItem('editId')}`,
    data: JSON.stringify({}),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'DELETE',
    success(response) {
      console.log('Item removed', response);
      const transElement =
            '<div class="itemdeleted">Admin deleted</div>';
      $('.editAdmin').html(transElement);
    },
  };
  $.ajax(getAdminSettings);
});

function displayName() {
  $('.username span').text(localStorage.getItem('adminName'));
}

// Watch Page Load
function watchPageLoad() {
  displayName();
}

$(watchPageLoad);
