// do the call that gets the instructor info and populates it into the form based on the email on page load
function getInstructors(successCallback) {
  localStorage.setItem('editInstrId', location.search.split('?')[1].split('=')[1]);
  const getInstructorSettings = {
    url: `${BASE_URL}/instructors/${localStorage.getItem('editInstrId')}`,
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
  $.ajax(getInstructorSettings);
}

$(getInstructors(displayInstructors));

function displayInstructors(response) {
  const { email, firstName, lastName } = response;
  $('#firstName').val(firstName);
  $('#email').val(email);
  $('#lastName').val(lastName);
}

$('.editInstructorForm').submit((event) => {
  event.preventDefault();
  // get the info from the input
  const firstName = $('.editInstructorForm #firstName').val();
  const lastName = $('.editInstructorForm #lastName').val();
  const email = $('.editInstructorForm #email').val();

  const getInstructorSettings = {
    url: `${BASE_URL}/instructors/${localStorage.getItem('editInstrId')}`,
    data: JSON.stringify({
      firstName,
      lastName,
      email,
      id: localStorage.getItem('editInstrId'),
    }),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
    error(response) {
      console.log('Unable to save changes', response);
      let transElement =
            '<div class="negative-msg-display">Unable to save changes</div>';
      $('.msg-display').html(transElement);
    },
    success(response) {
      console.log('Item removed', response);
      let transElement =
            '<div class="positive-msg-display">Changes saved</div>';
      $('.msg-display').html(transElement);
      location.href='./instructors.html';
    },
  };
  $.ajax(getInstructorSettings);
});
// delete call
$('.delete').click((event) => {
  event.preventDefault();

  const getInstructorSettings = {
    url: `${BASE_URL }/instructors/${ localStorage.getItem('editInstrId')}`,
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
            '<div class="positive-msg-display">Instructor removed</div>';
      $('.editInstructor').html(transElement);
      location.href='./instructors.html';
    },
  };
  $.ajax(getInstructorSettings);
});

function displayName() {
  $('.username span').text(localStorage.getItem('adminName'));
}

// Watch Page Load
function watchPageLoad() {
  displayName();
}

$(watchPageLoad);
