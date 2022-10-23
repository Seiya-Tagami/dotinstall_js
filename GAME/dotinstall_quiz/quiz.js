'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p')

  const quizSet = shuffle([
    {q: '犯罪論体系に当てはまらないものを答えよ', c: ['動機', '違法性', '構成要件該当性']},
    {q: '瑕疵　この読み方は？' ,c: ['かし', 'かけつ', 'かび']},
    {q: '刑法199条には何が定められているか', c: ['殺人罪', '同意殺人罪', '強盗殺人罪']},
    {q: '成年後見制度において、成年後見人に任命されるには本人の事理弁識能力がどのような状況でなくてはならないか', c: ['事理弁識能力を欠く', '事理弁識能力が著しく不十分', '事理弁識能力が不十分']},
    {q: '早稲田大学法学部の8号館には本来あるべきはずのものがない。それは何か', c: ['下り用のエスカレーター', '水を売る自動販売機', '先生の講義の面白さ']},
  ]);

  let currentNum = 0;
  let isAnswered;
  let score = 0;
  
  
function shuffle(arr) {
  
  for(let i = arr.length-1; i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[j],arr[i]]=[arr[i],arr[j]];
  }
  return arr;
  // フィッシャー・イェーツのシャッフルと言われるアルゴリズムを定義、仕組みはあとで理解
}

  function checkAnswer(li){
    if (isAnswered === true){
      return;
    }

    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct'); 
      score++;     
    } else { li.classList.add('wrong');
  }
    btn.classList.remove('disabled')
  }  

  function setQuiz(){
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
    }
    // choicesの最初の要素がある限り、最初の要素を消していく


    
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    // ...にすることで元の配列は崩さないまま、コピーを渡す。
    shuffledChoices.forEach(choice =>{
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () =>{
        checkAnswer(li);
      }
      )
      choices.appendChild(li); //ここで追加
    });

    if(currentNum === quizSet.length-1){
      btn.textContent = 'Show Score'
    }
  }
  
  setQuiz();



  btn.addEventListener('click',()=>{
    if (btn.classList.contains('disabled')){
      return;
    }
    btn.classList.add('disabled');

    if(currentNum === quizSet.length - 1){
      scoreLabel.textContent = `Score:${score}/${quizSet.length}`;
      result.classList.remove('hidden');
    }else{ 
      currentNum++;
      setQuiz();
    }
    
  })
}



