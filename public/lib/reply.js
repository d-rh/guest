window.onload = () => {
  const replyButtons = Array.prototype.slice.call(document.querySelectorAll('.entry-reply-submit'), 0)
  if (replyButtons.length > 0) {
    replyButtons.forEach( el => {
      el.addEventListener('click', () => {
        el.setAttribute('id', 'eventTarget');
        const replyTargetId = el.parentNode.id;
        replyTargetContent = document.getElementById(replyTargetId);
        const replyForm = document.createElement('form');
        replyForm.setAttribute('method', 'post');
        replyForm.setAttribute('action', '/feed')
        const replyInput = document.createElement('input');
        replyInput.setAttribute('type', 'text');
        replyInput.setAttribute('name', 'newReply');
        replyInput.setAttribute('class', 'input');
        const hiddenInput = document.createElement('input')
        hiddenInput.setAttribute('type', 'hidden')
        hiddenInput.setAttribute('name', 'entryId')
        hiddenInput.setAttribute('value', replyTargetId)
        const replySubmit = document.createElement('button');
        replySubmit.setAttribute('type', 'submit');
        replySubmit.setAttribute('class', 'button is-primary');
        replySubmit.innerHTML = 'Submit';
        replyForm.appendChild(replyInput);
        replyForm.appendChild(hiddenInput);
        replyForm.appendChild(replySubmit);
        replyTargetContent.appendChild(replyForm)
        replyTargetContent.removeChild(eventTarget)
      })
    })
  }
}




