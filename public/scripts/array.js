const Bar = require("./bar");
const selectionSort = require("./algorithms/selection");
const bubbleSort = require("./algorithms/bubble");
const insertionSort = require("./algorithms/insertion");

function Board(width, height, totalBars, minHeight) {
  this.width = width;
  this.height = height;
  this.boardBars = [];
  this.bars = {};
  this.speed = "fast";
  this.totalBars = totalBars;
  this.minHeight = minHeight;
}

Board.prototype.init = function() {
  this.createBoard();
  this.draw();
  this.toggleButtons();
};

Board.prototype.createBoard = function() {
  let tableHTML = `<div class="row">`;
  let heights = heightArray(this.minHeight, this.height, this.totalBars);
  for (let c = 0; c < this.totalBars; c++) {
    let newBarId = `${c}`;
    let newBar = new Bar(newBarId, heights[c]);
    this.boardBars.push(newBar);
    this.bars[`${newBarId}`] = newBar;
    tableHTML += `<div id="${newBarId}" class="bar not_active"></div>`;
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

Board.prototype.randomize = function() {
  let heights = heightArray(this.minHeight, this.height, this.totalBars);
  for (let c = 0; c < this.totalBars; c++) {
    let newBarId = `${c}`;
    this.bars[`${newBarId}`].height = heights[c];

    let element = document.getElementById(newBarId);
    element.className = 'bar not_active';
  }
  this.draw();
};

Board.prototype.toggleButtons = function() {
  document.getElementById("adjustFast").onclick = () => {
    this.speed = "fast";
    document.getElementById("adjustSpeed").innerHTML = 'Speed: Fast<span class="caret"></span>';
  }

  document.getElementById("adjustAverage").onclick = () => {
    this.speed = "average";
    document.getElementById("adjustSpeed").innerHTML = 'Speed: Average<span class="caret"></span>';
  }

  document.getElementById("adjustSlow").onclick = () => {
    this.speed = "slow";
    document.getElementById("adjustSpeed").innerHTML = 'Speed: Slow<span class="caret"></span>';
  }

  document.getElementById("randomizeButton").onclick = () => {
    this.randomize();
  }

  document.getElementById("selectionSortButton").onclick = () => {
    selectionSort(this, finishSorting);
  }

  document.getElementById("bubbleSortButton").onclick = () => {
    bubbleSort(this, finishSorting);
  }

  document.getElementById("insertionSortButton").onclick = () => {
    insertionSort(this, finishSorting);
  }
};

function finishSorting(board) {
  let listBars = [];
  for(let i = board.boardBars.length-1; i >= 0; i--) {
    listBars.push(board.boardBars[i].id);
  }

  function generation() {
    if(listBars.length == 0) return;
    let speed = board.speed === "fast" ?
      15 : board.speed === "average" ?
        25 : 50;

    setTimeout(function () {
      let element = document.getElementById(listBars.pop());
      element.className = 'bar sorted';

      generation();
    }, speed);
  }

  generation();
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

let minHeight = 5;
let totalBars = Math.min(50, $("#array").width() / 7);
let width = ($("#array").width() / totalBars) - 4;
let height = $("#array").height();
let newBoard = new Board(width, height, totalBars, minHeight);
newBoard.init();
