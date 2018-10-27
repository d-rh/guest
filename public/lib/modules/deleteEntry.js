export const deleteEntry = () => {
  const deleteButtons = Array.prototype.slice.call(document.querySelectorAll('.entry-delete-icon'), 0)
  if (deleteButtons.length > 0) {
    deleteButtons.forEach( el =>{
      el.addEventListener('click', () => {
        const deleteTargetId = findDeleteTargetId(el);
        const deleteTargetContent = document.getElementById(deleteTargetId);
        const deleteTargetNode = deleteTargetContent.parentNode.parentNode;
        const sourceURL = window.location.href

        deleteTargetNode.remove();
        deleteInEntryStore(sourceURL, deleteTargetId)
      })
    })
  }
}
const findDeleteTargetId = (el) => {
  if (el.id) {
    return el.id
  }
  else {
    return findDeleteTargetId(el.parentNode);
  }
}
const deleteInEntryStore = (url, target) => {
  let data = {
    "deleteEntry": target
  }
  console.log('Request sent to ' + url + ' to delete ' + target)
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(data)
  })
}
