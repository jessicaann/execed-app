// do the call that gets the user info and populates it into the form based on the email on page load
function getUsers(successCallback) {
  localStorage.setItem('editUserId', location.search.split('?')[1].split('=')[1]);
  const getUserSettings = {
    url: `${BASE_URL}/users/${localStorage.getItem('editUserId')}`,
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
  $.ajax(getUserSettings);
}

$(getUsers(displayUsers));

function displayUsers(response) {
  const {
    email, firstName, lastName, schedules,
  } = response;
  const scheduleTitles = [];
  schedules.forEach((schedule) => {
    scheduleTitles.push(schedule.title);
  });
  $('#firstName').val(firstName);
  $('#email').val(email);
  $('#lastName').val(lastName);

  getSchedules(displaySchedules, schedules);
}

$('.editUserForm').submit((event) => {
  event.preventDefault();
  // get the info from the input
  const firstName = $('.editUserForm #firstName').val();
  const lastName = $('.editUserForm #lastName').val();
  const email = $('.editUserForm #email').val();
  const password = $('.editUserForm #password').val();
  const schedules = $('.editUserForm #schedules').val();


  const getUserSettings = {
    url: `${BASE_URL}/users/${localStorage.getItem('editUserId')}`,
    data: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      schedules,
      id: localStorage.getItem('editUserId'),
    }),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
    error(response) {
      let transElement =
        '<div class="negative-msg-display">Unable to update user</div>';
      $('.msg-display').html(transElement); 
},
    success(response) {
      let transElement =
        '<div class="positive-msg-display">User updated</div>';
      $('.msg-display').html(transElement);
      location.href='./users.html'
},
  };
  $.ajax(getUserSettings);
});

function getSchedules(successCallback, scheduleTitles) {
  const getScheduleSettings = {
    url: `${BASE_URL}/schedules`,
    data: JSON.stringify({}),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
    success(res) {
      console.log(res);
      successCallback(res, scheduleTitles);
    },
  };
  $.ajax(getScheduleSettings);
}
// Display Schedules
function displaySchedules(response, scheduleTitles) {
  let transElement = '';
  if (response.schedules) {
    response.schedules.forEach((schedule) => {
      let isSelected = false;
      scheduleTitles.forEach((_schedule) => {
        if (schedule.id === _schedule.id) {
          isSelected = true;
        }
      });
      if (isSelected) {
        transElement += `<option selected value="${schedule.id}">${schedule.title}</option>`;
      } else {
        transElement += `<option value="${schedule.id}">${schedule.title}</option>`;
      }
    });
  }
  $('#schedules').html(transElement);
}

// delete call
$('.delete').click((event) => {
  event.preventDefault();
  const deleteConfirm = confirm('Delete this item?');
  if (!deleteConfirm) {
    return;
  }
  const getUserSettings = {
    url: `${BASE_URL}/users/${localStorage.getItem('editUserId')}`,
    data: JSON.stringify({}),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'DELETE',
    error(response) {
      console.log('Cannot delete item', response);
      let transElement =
          '<div class="negative-msg-display">Cannot delete item</div>';
      $('.msg-display').html(transElement);
    },
    success(response) {
      console.log('Item removed', response);
      let transElement =
            '<div class="itemdeleted">User deleted</div>';
      $('.msg-display').html(transElement);
    },
  };
  $.ajax(getUserSettings);
});

function displayName() {
  $('.username span').text(localStorage.getItem('adminName'));
}

// Watch Page Load
function watchPageLoad() {
  displayName();
  getUsers(displayUsers);
}

$(watchPageLoad);
