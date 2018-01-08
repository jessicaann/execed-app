$('.newInstructorForm').submit((event) => {
  event.preventDefault();
  // get the info from the input
  const firstName = $('.newInstructorForm #firstName').val().trim();
  const lastName = $('.newInstructorForm #lastName').val().trim();
  const email = $('.newInstructorForm #email').val().trim();
  let getInstructorSettings = {
    url: `${BASE_URL  }/instructors`,
    data: JSON.stringify({
      firstName,
      lastName,
      email,
    }),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    success(res){var transElement = 
            `<div class="positive-msg-display">Instructor created</div>`;
            $(".msg-display").html(transElement);},
  };
  $.ajax(getInstructorSettings);
  location.href = './instructors.html';
});

$('.logout').click((event) => {
  event.preventDefault();
  // delete the admin's session
  const adminId = localStorage.getItem('adminId');
  let getLogoutSettings = {
    url: `${BASE_URL  }/admins/session`,
    data: JSON.stringify({
      email,
      password,
    }),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'DELETE',
    success(res){
          location.href="../logout.html";
      },
  };
  $.ajax(getLogoutSettings);
});
function displayName() {
  $('.username span').text(localStorage.getItem('adminName'));
}

// Watch Page Load
function watchPageLoad() {
  displayName();
}

$(watchPageLoad);
