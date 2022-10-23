'use strict'

{
  function createColumn(col) {
    const source = []
    for (let i = 0; i < 15; i++){
      source[i] = i + 1 + 15 * col;
    }
    
    
    const column = [];
  
  
    for (let i = 0; i < 5; i++){
      column[i] = source.splice(Math.floor(Math.random()*source.length), 1)[0]; //spliceは配列を返してしまう。そのため、その要素を取り出す必要がある。
    } 
    return column;
  }

  function createColumns() {
    const columns = [];
    for(let i = 0; i < 5; i++){
      columns[i] = createColumn(i);
    }
    columns[2][2] = 'Free'; 
    return columns; //計算結果を返すことで関数の外側で使えるようになる
  }

  function createBingo(columns) {
    const bingo = [];
    for (let row = 0; row < 5; row++){
      bingo[row] = [];
      for (let col = 0; col < 5; col++){
        bingo[row][col] = columns[col][row]; //反転させる
      }
    }
    return bingo;
  }

  function renderBingo(bingo) {
    for(let row = 0; row < 5; row++){
  
      const tr = document.createElement('tr');
      for (let col = 0; col < 5; col++){
        const td = document.createElement('td');
        td.textContent = bingo[row][col];
        tr.appendChild(td);
      }
      document.querySelector('tbody').appendChild(tr)
    }
  }

  const columns = createColumns();
  const bingo = createBingo(columns);
  renderBingo(bingo);
}


