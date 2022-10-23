
(function() {
  const cards = [];
  const btn = document.getElementById('btn');
  const stage = document.getElementById('stage');
  let level = 2, //ペアの数
  flipCount = 0,
  correctCount = 0,
  firstCard = null,
  secondCard =null;

  

  init();

  function init(){

    correctCount = 0;
    btn.className = '';

    while (stage.firstChild) stage.removeChild(stage.firstChild);
    for (let i = 1; i <= level; i++) { 
      cards[cards.length] = createCard(i);
      console.log(cards) //cards.lengthについて実験用
      cards[cards.length] = createCard(i); 
      console.log(cards) //実験用
    }
    

    while(cards.length) {
      const pos = Math.floor(Math.random() * cards.length);
      stage.appendChild(cards.splice(pos, 1)[0]);
    }
  }

  function createCard(num) {
    const inner = '<div class="card-back">?</div><div class="card-front">*</div>';
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = inner.replace('*', num);
    card.addEventListener('click', function() {
      flipCard(this); //thisによってここを参照している。よってcardが参照され、機能する。
    } )
    const container = document.createElement('div');
    container.className = 'card-container';
    container.appendChild(card);

    return container;
    
  }

  function flipCard(card) {
    if (firstCard !== null && secondCard !== null) {
      return;
    }

    if (card.className.indexOf('open') === -1) {  //indexOfで検索し、見つからなかった場合-1を返す。 
      card.className = 'card open'; //cardクラスとopenクラス両方付けるという意味
    } else {
      return;
    }
    flipCount++;
    if(flipCount % 2 === 1){
      firstCard = card;
    } else {
      secondCard = card;
      setTimeout(function() {
        judge();
      }, 900);
    }
  }

  function judge() {
    if(firstCard.children[1].textContent === secondCard.children[1].textContent ){
      correctCount++;
      if(correctCount === level) {
        btn.className = 'visible';
      }
    } else {
      firstCard.className = 'card';
      secondCard.className = 'card';
    }
    firstCard = null;
    secondCard = null;
  }

  btn.addEventListener('click',() =>{
    level++;
    init();
    })
})();

