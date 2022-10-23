'use strict'

{
  const images = [
    './MySlideshow/img/pic00.png',
    './MySlideshow/img/pic01.png',
    './MySlideshow/img/pic02.png',
    './MySlideshow/img/pic03.png',
    './MySlideshow/img/pic04.png',
    './MySlideshow/img/pic05.png',
    './MySlideshow/img/pic06.png',
    './MySlideshow/img/pic07.png',
  ];
  let currentIndex = 0;

  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];

  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image;
    const li = document.createElement('li');
    if(index === currentIndex) {
      li.classList.add('current')
    }; //初期表示
    li.addEventListener('click', ()=>{  //各images[]のもとでimgとliが作られているため、きちんと対応関係できている。
      mainImage.src = image;
      const thumbnails = document.querySelectorAll('.thumbnails > li');
      thumbnails[currentIndex].classList.remove('current');
      currentIndex = index;
      thumbnails[currentIndex].classList.add('current');
    })
    li.appendChild(img);
    document.querySelector('.thumbnails').appendChild(li);
  })

  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    let target = currentIndex + 1;
    if(target === images.length){
      target = 0;
    }
    document.querySelectorAll('.thumbnails > li')[target].click(); //document.querySelectorAll('.thumbnails > li')[target]をclickした時と同じ処理をする。
  });

  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    let target = currentIndex - 1;
    if(target < 0){
      target = images.length - 1;
    }
    document.querySelectorAll('.thumbnails > li')[target].click(); 
  });

  let timeoutId;

  function playSlideshow(){
    timeoutId = setTimeout(()=>{
      next.click();
      playSlideshow();
    },1000);
  }

  let isPlaying = false;

  const play = document.getElementById('play');
  play.addEventListener('click', ()=>{
    if(isPlaying === false) {
      playSlideshow();
      play.textContent = 'Pause'
    } else {
      clearTimeout(timeoutId)
      play.textContent = 'Play'
    }
    isPlaying = !isPlaying;

  });
}