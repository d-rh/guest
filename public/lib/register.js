const registrationForm = document.querySelector('.registration-form')
const formUsername = document.getElementById('formUsername');
const formFirstName = document.getElementById('formFirstName');
const formLastName = document.getElementById('formLastName');
const formPw = document.getElementById('password');
const passConf = document.getElementById('passConf');

formUsername.addEventListener('submit', () => {
  if (formUsername.validity.valueMissing) {
    formUsername.setCustomValidity('Please enter a username')
  }
  if (formPw != passConf) {
    passConf.setCustomValidity('Please ensure your Password matches your Password Confirmation')
  }
})
formUsername.addEventListener('input', () => {
  if (formUsername.value.length) {
    usernameCheck(formUsername.value.toLowerCase());
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
const usernameCheck = (username) => {
  let data = {
    usernameCheck: username
  }
  fetch('/register', {
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
      let usernameCheckMessage = document.querySelector('#username-check-result')
      usernameCheckMessage.style.color = 'Red';
      usernameCheckMessage.innerHTML = 'This username is already taken';
      formUsername.style.borderColor = 'Red';
      formUsername.setCustomValidity('Choose a different username')
    }
    if (response.validated === true) {
      let usernameCheckMessage = document.querySelector('#username-check-result')
      usernameCheckMessage.innerHTML = '';
      formUsername.style.borderColor = null;
      formUsername.setCustomValidity('');
    }
  })
  }

const passwordCheck = (pw,pwConf) => {
  if (pw != pwConf) {
    let passwordCheckMessage = document.querySelector('#password-check-result');
    passwordCheckMessage.innerHTML = 'These passwords don\'t match';
    passwordCheckMessage.style.color = 'Red';
    passConf.style.borderColor = 'Red';
  }
  if (pw === pwConf) {
    let passwordCheckMessage = document.querySelector('#password-check-result');
    passwordCheckMessage.innerHTML = '';
    passConf.style.borderColor = null;
  }
}