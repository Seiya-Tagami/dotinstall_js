'use strict';

{
  const open = document.getElementById('js-open');
  const close = document.getElementById('js-close');
  const modal = document.getElementById('js-modal');
  const mask = document.getElementById('js-mask');

  open.addEventListener('click', () => {
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
  });

  close.addEventListener('click', () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });

  mask.addEventListener('click', () => {
    // modal.classList.add('hidden');
    // mask.classList.add('hidden');
    close.click();
  });
}