window.onload = () => {
  const replyButtons = Array.prototype.slice.call(document.querySelectorAll('.entry-reply-submit'), 0)
  if (replyButtons.length > 0) {
    replyButtons.forEach( el => {
      el.addEventListener('click', () => {
        el.setAttribute('id', 'eventTarget');
        const replyTargetId = el.parentNode.id;
        const replyForm = document.createElement('form');
        const replyInput = document.createElement('input');
        const hiddenInput = document.createElement('input');
        const replySubmit = document.createElement('button');
        
        replyTargetContentEl = document.getElementById(replyTargetId);
        
        replyForm.setAttribute('method', 'post');
        replyForm.setAttribute('action', '/feed');
        
        replyInput.setAttribute('type', 'text');
        replyInput.setAttribute('name', 'newReply');
        replyInput.setAttribute('class', 'input');
        
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'entryId');
        hiddenInput.setAttribute('value', replyTargetId);
        
        replySubmit.setAttribute('type', 'submit');
        replySubmit.setAttribute('class', 'button is-primary');
        replySubmit.innerHTML = 'Submit';
        
        replyForm.appendChild(replyInput);
        replyForm.appendChild(hiddenInput);
        replyForm.appendChild(replySubmit);
        replyTargetContentEl.appendChild(replyForm)
        replyTargetContentEl.removeChild(eventTarget)
      })
    })
  }
}




