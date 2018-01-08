$('.newUserForm').submit((event) => {
  event.preventDefault();
  // get the info from the input
  const firstName = $('.newUserForm #firstName').val();
  const lastName = $('.newUserForm #lastName').val();
  const email = $('.newUserForm #email').val();
  const password = $('.newUserForm #password').val();
  const schedules = $('.newUserForm #schedules').val();
  const getUserSettings = {
    url: `${BASE_URL}/users`,
    data: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      schedules,
    }),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    error(res) {
      const transElement =
            '<div class="negative-msg-display">Cannot create user</div>';
      $('.msg-display').html(transElement);
    },
    success(res) {
      const transElement =
            '<div class="positive-msg-display">User created</div>';
      $('.msg-display').html(transElement);
    },
  };
  $.ajax(getUserSettings);
});
// get Schedules for the dropdown
function getSchedules(successCallback) {
  const getScheduleSettings = {
    url: `${BASE_URL}/schedules/admin/${localStorage.getItem('adminId')}`,
    data: JSON.stringify({}),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
    success(res) {
      console.log(res);
      successCallback(res);
    },
  };
  $.ajax(getScheduleSettings);
}
// Display sessions in dropdown
function displaySchedules(response) {
  console.log(response);
  console.log('displaySchedules');
  let transElement = '';
  if (response.schedules) {
    response.schedules.forEach((schedule) => {
      transElement += `<option value="${schedule.id}">${schedule.title}</option>`;
    });
  }
  $('#schedules').html(transElement);
}
function displayName() {
  $('.username span').text(localStorage.getItem('adminName'));
}

// Watch Page Load
function watchPageLoad() {
  displayName();
  getSchedules(displaySchedules);
}

$(watchPageLoad);
