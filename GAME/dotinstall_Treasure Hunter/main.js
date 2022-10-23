(function(){
  'use strict'

  const boxes = document.getElementsByClassName('box');
  const contents = [
    'coin.png',
    'empty.png',
    'cobra.png'
  ];

  function init(){
    let i;
    for(i = 0; i< boxes.length; i++){
      boxes[i].addEventListener('click', function(){
        let j;
        if(this.className.indexOf('shake') === -1) {
          return;
        }
        for(j = 0; j < boxes.length; j++) {
          boxes[j].src = './TreasureHunter/img/'+ contents[Math.floor(Math.random()*contents.length)];
          boxes[j].classList = 'box disabled'
        } //全部つけて
        this.className = 'box'; //クリックしたものだけ外す
        document.getElementById('btn').className = ''
      });
      }
  }

    init();
  }
)();