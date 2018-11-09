
const registrationForm = document.querySelector('.registration-form')
const formUsername = document.getElementById('formUsername');
const formFirstName = document.getElementById('formFirstName');
const formLastName = document.getElementById('formLastName');
const formPw = document.getElementById('password');
const passConf = document.getElementById('passConf');

let usernameCheckResult = document.getElementById('username-check-result');
let passwordCheckResult = document.getElementById('password-check-result');

formUsername.addEventListener('submit', () => {
  if (formUsername.validity.valueMissing) {
    formUsername.setCustomValidity('Please enter a username')
  }
  if (formPw != passConf) {
    passConf.setCustomValidity('Please ensure your Password matches your Password Confirmation')
  }
})
formUsername.addEventListener('input', async () => {
  if (formUsername.value.length) {
    const sourceURL = window.location.href;
    usernameCheck(sourceURL, formUsername.value);
  }
})
formPw.addEventListener('input', () => {
  if (passConf.value.length) {
    passwordCheck(formPw.value, passConf.value);
  }
})
passConf.addEventListener('input', () => {
  passwordCheck(formPw.value, passConf.value)
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
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    }
  }).then(response => {
    if (response.validated === false) {
      let usernameCheckContent = document.createElement('p');
      usernameCheckResult.setAttribute('class', 'notification is-danger');
      usernameCheckResult.appendChild(usernameCheckContent);
      usernameCheckContent.innerHTML = 'This username is taken';
    }
    if (response.validated === true) {
      usernameCheckResult.setAttribute('class', '');
      usernameCheckResult.innerHTML = '';
    }
  })
}
const passwordCheck = (pw,pwConf) => {
  if (pw != pwConf) {
    if (!passwordCheckResult.hasChildNodes()) {
      let passwordCheckContent = document.createElement('p');
      passwordCheckContent.innerHTML = 'These passwords don\'t match';
      passwordCheckResult.setAttribute ('class', 'notification is-danger');
      passwordCheckResult.appendChild(passwordCheckContent);
    }
  }
  if (pw === pwConf) {
    passwordCheckResult.setAttribute('class', '');
    passwordCheckResult.innerHTML = '';
  }
}