'use strict';

{
  const open = document.getElementById('js-open');
  const overlay = document.querySelector('.js-overlay');
  const close = document.getElementById('js-close');

  open.addEventListener('click', () => {
    overlay.classList.add('show');
    open.classList.add('hidden')
  })

  close.addEventListener('click', () => {
    overlay.classList.remove('show');
    open.classList.remove('hidden')
  })

}