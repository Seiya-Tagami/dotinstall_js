'use strict'

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp(){
    const d = new Date(Date.now() - startTime + elapsedTime); //Dateインスタンスを生成、再開した時に経過時間も足してあげる
    const m = String(d.getMinutes()).padStart(2, '0'); //インスタンスメソッドを実行し、値を返す。
    const s = String(d.getSeconds()).padStart(2, '0'); //padStartは文字列でしか使えない
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`;
    
    timeoutId = setTimeout(() => {
      countUp();
    }, 10); //10ミリ秒ごとに繰り返すから、タイマーが動いているように見える。
  }

  function setButtonStateInitial() {
    start.classList.remove('inactive')
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive')
    reset.classList.add('inactive');
  }
  function setButtonStateStopped() {
    start.classList.remove('inactive')
    stop.classList.add('inactive');
    reset.classList.remove('inactive')
  }

  setButtonStateInitial();

  start.addEventListener('click' , () => {
    if (start.classList.contains('inactive') === true){
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();

  })


  stop.addEventListener('click' , () => {
    if (stop.classList.contains('inactive') === true){
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime; //スタートからの経過時間を記録、タイマーが走っていた時間を足し上げるようにする
    console.log(elapsedTime);
    });

  reset.addEventListener('click' , () => {
    if (reset.classList.contains('inactive') === true){
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  });
}