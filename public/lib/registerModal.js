const registerButton = Array.prototype.slice.call(document.querySelectorAll('.register-button'), 0);
if (registerButton.length > 0) {
  registerButton.forEach( el => {
    el.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
}
const registerCloseButton = Array.prototype.slice.call(document.querySelectorAll('.registerModalClose'), 0);
if (registerCloseButton.length > 0) {
  registerCloseButton.forEach( el => {
    el.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
}
const modalBackground = Array.prototype.slice.call(document.querySelectorAll('.modal-background'), 0);
if (modalBackground.length > 0) {
  modalBackground.forEach( el => {
    el.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
}