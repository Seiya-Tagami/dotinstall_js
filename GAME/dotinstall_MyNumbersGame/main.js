"use strict";

{
  class Panel {
    constructor(game) { //gameクラスのインスタンスを受け取る。
      this.game = game;  //this.gameとして、プロパティに値を保存している。
      this.el = document.createElement("li");
      this.el.classList.add("pressed");
      this.el.addEventListener("click", () => {
        this.check();
      });
    }

    getEl() {
      return this.el;
    }

    activate(num) {
      this.el.classList.remove("pressed");
      this.el.textContent = num;
    }

    check() {
      if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) {
        //parseIntで数値にしてあげる。
        this.el.classList.add("pressed");
        this.game.addCurrentNum();

        if (this.game.getCurrentNum() === this.game.getLevel() ** 2) {
          clearTimeout(this.game.getTimeoutId());
        }
      }
    }
  }



  class Board {
    constructor(game) {  //gameクラスのインスタンスを受け取る。
      this.game = game;  //this.gameとして、プロパティに値を保存している。
      this.panels = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        this.panels.push(new Panel(this.game)); //Panelのインスタンスが配列で4つ入る
      }
      this.setup();  //thisによって、自分のクラスのsetupを参照しているという意味。
    }
    setup() {
      const board = document.getElementById("board");
      this.panels.forEach((panel) => {
        //一つ一つのPanelインスタンスに対して、getEl()している。多分、getElをPanelクラスの方に書かないと、インスタンスが生成されることによって、メソッドが機能しないっていう理解？
        board.appendChild(panel.getEl()); //カプセル化
      });
    }
    activate() {

      const nums = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        nums.push(i);
      }
      this.panels.forEach((panel) => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      });
    }
  }

  class Game {
    constructor(level) {
      this.level = level; //thisはクラス自身のことを指す。
      this.board = new Board(this); //Gameクラスのインスタンスを参照し、それをboardに渡す。

      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined;

      this.btn = document.getElementById("btn");
      btn.addEventListener("click", () => {
        this.start();
      });

      this.setup();
    }
    
    setup() {
      const container = document.getElementById('container');
      const PANEL_WIDTH = 50;
      const BOARD_PADDING = 10;
      container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';

    }
      start() {
        if (typeof this.timeoutId !== "undefined") {
          clearTimeout(this.timeoutId); //タイマーが走っている時、何度でもリスタートできる仕組みとなっている。
        }
        this.currentNum = 0;
        this.board.activate();
        this.startTime = Date.now();
        this.runTimer();
      }
    
    runTimer() {
      const timer = document.getElementById("timer");
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
  
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }

    addCurrentNum() {
      this.currentNum++;
    }

    getCurrentNum() {
      return this.currentNum;
    }

    getTimeoutId() {
      return this.timeoutId;
    }

    getLevel() {
      return this.level;
    }
  }


  new Game(3); //インスタンス生成
}
