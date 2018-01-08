$('.newScheduleForm').submit((event) => {
  event.preventDefault();
  // get the info from the input
  const title = $('.newScheduleForm #title').val().trim();
  const dates = $('.newScheduleForm #dates').val().trim();
  const admin = localStorage.getItem('adminId');
  const sessions = $('.newScheduleForm #sessions').val();
  console.log(sessions);
  let getScheduleSettings = {
    url: `${BASE_URL  }/schedules`,
    data: JSON.stringify({
      title,
      dates,
      admin,
      sessions,
    }),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    error(response){
        var transElement = 
        `<div class="negative-msg-display">Unable to create schedule</div>`;
        $(".msg-display").html(transElement);},
    success(res){var transElement = 
            `<div class="positive-msg-display">Schedule created</div>`;
            $(".msg-display").html(transElement);},
  };
  $.ajax(getScheduleSettings);
  location.href=`${BASE_URL }/admin/dashboard.html`
});

function getSessions(successCallback) {
  const getSessionSettings = {
    url: `${BASE_URL}/sessions`,
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
  $.ajax(getSessionSettings);
}
// Display sessions in dropdown
function displaySessions(response) {
  console.log(response);
  let transElement = '';
  if (response.sessions) {
    response.sessions.forEach((session) => {
      transElement += `<option value="${session.id}">${session.title}</option>`;
    });
  }
  $('#sessions').html(transElement);
}

$('.newSessionBtn').click((event) => {
  event.preventDefault();
  $('.newSession').removeClass('hidden');
  getInstructors(displayInstructors);
  getPrework(displayPrework);
});
$('.cancel').click((event) => {
  event.preventDefault();
  $('.newSession').addClass('hidden');
});
// get instructors
function getInstructors(successCallback) {
  const getInstructorSettings = {
    url: `${BASE_URL }/instructors`,
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
  $.ajax(getInstructorSettings);
}
// Display instructors in dropdown
function displayInstructors(response) {
  console.log(response);
  let transElement = '';
  if (response.instructors) {
    response.instructors.forEach((instructor) => {
      transElement += `<option value="${instructor.id}">${instructor.instructorName}</option>`;
    });
  }
  $('#instructors').html(transElement);
}

// get preworks
function getPrework(successCallback) {
  const getPreworkSettings = {
    url: `${BASE_URL}/files`,
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
  $.ajax(getPreworkSettings);
}
// Display prework in dropdown
function displayPrework(response) {
  console.log(response);
  let transElement = '';
  if (response.files) {
    response.files.forEach((file) => {
      transElement += `<option value="${file.id}">${file.title}</option>`;
    });
  }
  $('#prework').html(transElement);
}

$('.newSessionForm').submit((event) => {
  event.preventDefault();
  // get the info from the input
  const title = $('.newSessionForm #title').val().trim();
  const startTime = $('.newSessionForm #startTime').val().trim();
  const endTime = $('.newSessionForm #endTime').val().trim();
  const instructors = $('.newSessionForm #instructors').val();
  const preWork = $('.newSessionForm #prework').val();
  const admin = localStorage.getItem('adminId');

  let getScheduleSettings = {
    url: `${BASE_URL  }/sessions`,
    data: JSON.stringify({
      title,
      startTime,
      endTime,
      instructors,
      preWork,
      admin,
    }),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    error(res){var transElement = 
            `<div class="negative-msg-display">Unable to create session</div>`;
            $(".session-msg-display").html(transElement);
            $('.newSession').addClass('hidden');
        },
    success(res){var transElement = 
            `<div class="positive-msg-display">Session created</div>
            <p class="italicize">After successfully creating the session, add it to your new schedule by selecting it in the above "Create New Schedule."
            `;
            $(".session-msg-display").html(transElement);
            $('.newSession').addClass('hidden');
            var newSession = `<option value="${res.id}">${res.title}</option>`;
            $("#sessions").prepend(newSession);
        },
  };
  $.ajax(getScheduleSettings);
});
function displayName() {
  $('.username span').text(localStorage.getItem('adminName'));
}

// Watch Page Load
function watchPageLoad() {
  displayName();
  getSessions(displaySessions);
}

$(watchPageLoad);
