const Bar = require("./bar");

function Board(width, height, totalBars) {
  this.width = width;
  this.height = height;
  this.boardBars = [];
  this.bars = {};
  this.speed = "fast";
  this.totalBars = totalBars;
}

Board.prototype.init = function() {
  this.createBoard();
  this.draw();
};

Board.prototype.createBoard = function() {
  let tableHTML = `<div class="row">`;
  let heights = heightArray(5, this.height, this.totalBars);
  for (let c = 0; c < this.totalBars; c++) {
    let newBarId = `${c}`;
    let newBar = new Bar(newBarId, heights[c]);
    this.boardBars.push(newBar);
    this.bars[`${newBarId}`] = newBar;
    tableHTML += `<div id="${newBarId}" class="bar"></div>`;
  }
  tableHTML += `</div>`;
  let board = document.getElementById("array");
  board.innerHTML = tableHTML;
};

Board.prototype.draw = function() {
  for(let i = 0; i < this.boardBars.length; i++) {
    let bar = this.boardBars[i];
    $(`#${bar.id}`).css("width", this.width);
    $(`#${bar.id}`).css("height", bar.height);
    $(`#${bar.id}`).css("margin-top", this.height - bar.height);
  }
};

function heightArray(minHeight, maxHeight, size) {
  let heights = [minHeight];
  let incremental = (maxHeight - minHeight) / size;
  while(minHeight < maxHeight) {
    minHeight += incremental;
    heights.push(minHeight);
  }
  shuffle(heights);
  return heights;
}

function shuffle(array) {

  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }

  return array;
}

let totalBars = 50;
let width = ($("#array").width() / totalBars) - 4;
let height = $("#array").height();
let newBoard = new Board(width, height, totalBars);
newBoard.init();
