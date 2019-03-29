const confirmButton = document.querySelector('#launch-modal-button');
const modal = document.querySelector('jt-modal');

confirmButton.addEventListener('click', () => {
  // access public method from modal.js
  modal.open();
});

modal.addEventListener('confirm', () => console.log('confirmed'));
modal.addEventListener('cancel', () => console.log('canceled'));
