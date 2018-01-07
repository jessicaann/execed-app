// Get Admins
function getAdmins(successCallback) {
  const getAdminSettings = {
    url: `${BASE_URL }/admins`,
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
// Display admins
function displayAdmins(response) {
  let transElement = '';
  if (response.admins) {
    response.admins.forEach((admin) => {
      transElement += `<a href="./admin_edit_remove.html?adminId=${admin.id}" class="col-xs-6 col-sm-3 placeholder js-edit">
            <img class="img-responsive" src="../img/defaultavatar.png" width="200" height="200">
            <h4>${admin.fullName}</h4>
            <span class="text-muted">${admin.email}</span>
            </a>`;
    });
  }
  $('.adminsDisplay').html(transElement);
}


function displayName() {
  $('.username span').text(localStorage.getItem('adminName'));
}

// Watch Page Load
function watchAdminsPageLoad() {
  displayName();
  getAdmins(displayAdmins);
}

$(watchAdminsPageLoad);
