'use strict';

{
  class Panel{
    constructor(){  //コンストラクタを設定、thisをつけることで、生成したインスタンスを参照することができる。とにもかくにも、コンストラクタのthisは生成先を参照しますよってことで。
      const section = document.createElement('section');
        section.classList.add('panel');

        this.img = document.createElement('img');
        this.img.src = this.getRandomImage();

        this.stop = document.createElement('div');
        this.stop.textContent= 'STOP';
        this.stop.classList.add('stop','inactive');
        
        this.timeoutId = undefined; //明示的に表現
        this.stop.addEventListener('click',() => {
          clearTimeout(this.timeoutId)
          panelsLeft--;
          if(this.stop.classList.contains('inactive')){
            return;
          };
          this.stop.classList.add('inactive')
          if (panelsLeft === 0){
            spin.classList.remove('inactive');
            panelsLeft = 3;
            checkResult();
          }
        });
        
        section.appendChild(this.img);
        section.appendChild(this.stop);

        const main = document.querySelector('main');
        main.appendChild(section);
    }

    //例えば以下のように、クラス内でメソッドを定義できる。
    getRandomImage() {
      const images = [
        './MySlotMachine/img/seven.png',
        './MySlotMachine/img/bell.png',
        './MySlotMachine/img/cherry.png',
      ];
      return images[Math.floor(Math.random()*images.length)]
    }

    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin()
      }, 50);
    }

    isUnmatched(p1, p2) {
      if(this.img.src !== p1.img.src && p2.img.src){
        return true;
      } else {
        return false;
      };
    }
    
    unmatch() {
      this.img.classList.add('unmatched');
    }

    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive')
    }
  };//ここまでがクラス
  
  function checkResult() {
    if (panels[0].isUnmatched(panels[1],panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0],panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0],panels[1])) {
      panels[2].unmatch();
    }
  }

  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];//インスタンス生成

  let panelsLeft = 3;

  const spin = document.getElementById('spin');
  spin.addEventListener('click', ()=>{
    if(spin.classList.contains('inactive')){
      return;
    };

    spin.classList.add('inactive')
    panels.forEach(panel => {
      panel.activate();
      panel.spin();
    })
  })
}