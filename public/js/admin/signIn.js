// Admin Sign In Submit
$('.adminSignInForm').submit((event) => {
  event.preventDefault();
  // get the info from the input
  const email = $('.adminSignInForm #inputEmail').val();
  const password = $('.adminSignInForm #inputPassword').val();
  const getLoginSettings = {
    url: `${BASE_URL}/admins/session`,
    data: JSON.stringify({
      email,
      password,
    }),
    dataType: 'json',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    error(res) {
      const transElement =
            '<div class="negative-msg-display">Invalid login</div>';
      $('.form-signin div').html(transElement);
    },
    success(res) {
      localStorage.setItem('adminId', res.accessToken);
      localStorage.setItem('adminName', res.username);
      location.href = './dashboard.html';
    },
  };
  $.ajax(getLoginSettings);
});


// Watch Dashboard Page Load
function watchDashboardPageLoad() {
  displayName();
}
if (location.pathname === '/dashboardAdmin.html') {
  $(watchDashboardPageLoad);
}
