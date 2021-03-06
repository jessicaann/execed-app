function getSession(successCallback) {
  localStorage.setItem('sessionId', location.search.split('?')[1].split('=')[1]);
  const getSessionSettings = {
    url: `${BASE_URL }/sessions/${ localStorage.getItem('sessionId')}`,
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
// Display Session
function displaySession(response) {
  $('.sessionTitle').text(`${response.title}`);
  let sessionsElements = '';
  const instructorNames = [];
  const preWorkTitles = [];
  const preWorkLinks = [];
  if (response) {
    const startTime = new Date(response.startTime);
    const endTime = new Date(response.endTime);
    const startMinutes = function () {
      if (startTime.getMinutes() == 0) {
        return '00';
      }
      if (startTime.getMinutes() < 10) {
        return `0${startTime.getMinutes().slice(-2)}`;
      }

      return startTime.getMinutes();
    };
    const endMinutes = function () {
      if (endTime.getMinutes() == 0) {
        return '00';
      }
      if (endTime.getMinutes() < 10) {
        return `0${endTime.getMinutes().slice(-2)}`;
      }

      return endTime.getMinutes();
    };
    response.instructors.forEach((instructor) => {
      instructorNames.push(instructor.instructorName);
    });
    response.preWork.forEach((preWork) => {
      preWorkTitles.push(preWork.title);
      preWorkLinks.push(`<a href="${  BASE_URL  }/uploads/${ preWork.file  }" download>${  preWork.title  }</a>`);
    });
    sessionsElements += `
                <div class="sessionItem">
                <p>Title: ${response.title}</p>
                <p>Time: ${startTime.getHours()}:${startMinutes()} - ${endTime.getHours()}:${endMinutes()}</p>
                <p>Instructor: ${instructorNames.join(', ')}</p>
                <p>Prework: ${preWorkLinks.join(', ')}</p>
                </div>`;
    $('.editBtn').attr('href', `session_edit_remove.html?sessionId=${response.id}`);
  }
  $('.sessionDisplay').html(sessionsElements);
}
function returnBtn() {
  const previousPage = '<a href="#" class="btn btn-info btn-lg btn-primary" role="button">Return to Schedule</a>';
  $('.return').html(previousPage);
  $('.return').on('click', () => {
    history.back();
  });
}

function displayName() {
  $('.username span').text(localStorage.getItem('adminName'));
}

// Watch Dashboard Page Load
function watchDashboardPageLoad() {
  displayName();
  getSession(displaySession);
  returnBtn();
}

$(watchDashboardPageLoad);
