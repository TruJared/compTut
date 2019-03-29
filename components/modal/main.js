const confirmButton = document.querySelector('#confirm-button');
const modal = document.querySelector('jt-modal');

confirmButton.addEventListener('click', () => {
  modal.setAttribute('opened', '');
});
