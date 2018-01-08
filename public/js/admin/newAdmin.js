$('.newAdminForm').submit((event) => {
  event.preventDefault();
  // get the info from the input
  const firstName = $('.newAdminForm #firstName').val();
  const lastName = $('.newAdminForm #lastName').val();
  const email = $('.newAdminForm #email').val();
  const password = $('.newAdminForm #password').val();
  const getLoginSettings = {
    url: `${BASE_URL}/admins`,
    data: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    success(res) {
      const transElement =
            '<div class="positive-msg-display">Admin created</div>';
      $('.msg-display').html(transElement);
      location.href='./admins.html';
    },
  };
  $.ajax(getLoginSettings);
});

function displayName() {
  $('.username span').text(localStorage.getItem('adminName'));
}

// Watch Page Load
function watchPageLoad() {
  displayName();
}

$(watchPageLoad);
