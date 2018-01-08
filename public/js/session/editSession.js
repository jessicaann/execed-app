// do the call that gets the session info and populates it into the form based on the email on page load
function getSessions(successCallback) {
  localStorage.setItem('editSessionId', location.search.split('?')[1].split('=')[1]);
  const getSessionSettings = {
    url: `${BASE_URL}/sessions/${localStorage.getItem('editSessionId')}`,
    data: JSON.stringify({}),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
    success(res) {
      successCallback(res);
      console.log(res);
    },
  };
  $.ajax(getSessionSettings);
}


function leadZeros(value) {
  return (`0${value}`).slice(-2);
}

function formatDate(date) {
  return `${date.getFullYear()}-${leadZeros(date.getMonth() + 1)}-${leadZeros(date.getDate())}T${leadZeros(date.getHours())}:${leadZeros(date.getMinutes())}`;
}

function displaySessions(response) {
  const { title, instructors, preWork } = response;
  const instructorsNames = [];
  const preWorkTitles = [];
  instructors.forEach((instructor) => {
    instructorsNames.push(instructor.instructorName);
  });
  preWork.forEach((preWork) => {
    preWorkTitles.push(preWork.title);
  });
  const startTime = new Date(response.startTime);
  const endTime = new Date(response.endTime);
  console.log(startTime.toLocaleString());
  const startTimeVar = formatDate(startTime);
  const endTimeVar = formatDate(endTime);
  // help with filling the dates and times
  $('#title').val(title);
  $('#startTime').val(startTimeVar);
  $('#endTime').val(endTimeVar);

  getInstructors(displayInstructors, instructors);
  getPrework(displayPrework, preWork);
}

$('.editSessionForm').submit((event) => {
  event.preventDefault();
  // get the info from the input
  const title = $('.editSessionForm #title').val().trim();
  const startTime = $('.editSessionForm #startTime').val();
  const endTime = $('.editSessionForm #endTime').val();
  const instructors = $('.editSessionForm #instructors').val();
  const preWork = $('.editSessionForm #prework').val();

  const getSessionSettings = {
    url: `${BASE_URL}/sessions/${localStorage.getItem('editSessionId')}`,
    data: JSON.stringify({
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      instructors,
      preWork,
      id: localStorage.getItem('editSessionId'),
    }),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
    error(response) {
      let transElement =
        '<div class="negative-msg-display">Unable to update session</div>';
      $('.msg-display').html(transElement);
 },
    success(response) {
      let transElement =
        '<div class="positive-msg-display">Session updated</div>';
      $('.msg-display').html(transElement);
      location.href = `./sessionDisplay.html?sessionId=${localStorage.getItem('editSessionId')}`;
 },
  };
  $.ajax(getSessionSettings);
});

function getInstructors(successCallback, instructorsList) {
  const getInstructorSettings = {
    url: `${BASE_URL}/instructors`,
    data: JSON.stringify({}),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
    success(res) {
      console.log(res);
      successCallback(res, instructorsList);
    },
  };
  $.ajax(getInstructorSettings);
}
// Display Instructors
function displayInstructors(response, instructorsList) {
  let transElement = '';
  if (response.instructors) {
    response.instructors.forEach((instructor) => {
      let isSelected = false;
      instructorsList.forEach((_instructor) => {
        if (instructor.id === _instructor.id) {
          isSelected = true;
        }
      });
      if (isSelected) {
        transElement += `<option selected value="${instructor.id}">${instructor.instructorName}</option>`;
      } else {
        transElement += `<option value="${instructor.id}">${instructor.instructorName}</option>`;
      }
    });
  }
  $('#instructors').html(transElement);
}
// get preworks
function getPrework(successCallback, preworkList) {
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
      successCallback(res, preworkList);
    },
  };
  $.ajax(getPreworkSettings);
}
// Display prework in dropdown
function displayPrework(response, preworkList) {
  let transElement = '';
  if (response.files) {
    response.files.forEach((file) => {
      let isSelected = false;
      preworkList.forEach((_preWork) => {
        if (file.id === _preWork.id) {
          isSelected = true;
        }
      });
      if (isSelected) {
        transElement += `<option selected value="${file.id}">${file.title}</option>`;
      } else {
        transElement += `<option value="${file.id}">${file.title}</option>`;
      }
    });
  }
  $('#prework').html(transElement);
}
// delete call
$('.delete').click((event) => {
  event.preventDefault();
  const deleteConfirm = confirm('Delete this item?');
  if (!deleteConfirm) {
    return;
  }
  const getSessionSettings = {
    url: `${BASE_URL}/sessions/${ localStorage.getItem('editSessionId')}`,
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
      $('.editSession').html(transElement);
    },
    success(response) {
      console.log('Item removed', response);
      let transElement =
            '<div class="positive-msg-display">Session deleted</div>';
      $('.editSession').html(transElement);
      location.href = `${BASE_URL}/schedules/scheduleDisplay.html?scheduleId=${localStorage.getItem('editScheduleId')}`
    },
  };
  $.ajax(getSessionSettings);
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
