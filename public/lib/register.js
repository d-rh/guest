
const formUsername = document.getElementById('formUsername');
const formFirstName = document.getElementById('formFirstName');
const formLastName = document.getElementById('formLastName');
const formPw = document.getElementById('formPw');
const passConf = document.getElementById('passConf');

formUsername.addEventListener('submit', () => {
  if (formUsername.validity.valueMissing) {
    formUsername.setCustomValidity('Please enter a username')
  }
})
formUsername.addEventListener('input', async () => {
  if (formUsername.value.length > 0) {
    const sourceURL = window.location.href;
    usernameCheck(sourceURL, formUsername.value);
  }
})
const usernameCheck = (url, username) => {
  let data = {
    usernameCheck: username
  }
  fetch(url + 'register', {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(data)
  }).then(response => {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    }
  }).then(response => {
    if (response.validated === false) {
      console.log('flag!!')
      formUsername.setCustomValidity("Username taken.")
    } else if (response.validated === true) {
      console.log(response)
    }
  })
}