const Bar = require("./bar");
const selectionSort = require("./algorithms/selection");
const bubbleSort = require("./algorithms/bubble");
const insertionSort = require("./algorithms/insertion");
const mergeSort = require("./algorithms/merge");
const quickSort = require("./algorithms/quick");
const heapSort = require("./algorithms/heap");

const ARRAY_SIZE = {
  'smallest': 25,
  'small': 75,
  'normal': 100,
  'large': 1000,
  'largest': 10000,
};
Object.freeze(ARRAY_SIZE)

function Board(height) {
  this.width = 50;
  this.height = height;
  this.boardBars = [];
  this.bars = {};
  this.speed = "fast";
  this.totalBars = 100;
  this.minHeight = 5;
  this.algorithm = "heap";
  this.run = false;
  this.arraySize = "normal";
};

Board.prototype.init = function() {
  this.changeSize();
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
  }
  this.unactivate();
  this.draw();
};

Board.prototype.unactivate = function() {
  for (let c = 0; c < this.totalBars; c++) {
    let element = document.getElementById(`${c}`);
    element.className = 'bar not_active';
  }
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

  document.getElementById("bubble").onclick = () => {
    this.algorithm = "bubble";
    document.getElementById("algorithm").innerHTML = 'Algorithm: Bubble Sort<span class="caret"></span>';
  }

  document.getElementById("heap").onclick = () => {
    this.algorithm = "heap";
    document.getElementById("algorithm").innerHTML = 'Algorithm: Heap Sort<span class="caret"></span>';
  }

  document.getElementById("insertion").onclick = () => {
    this.algorithm = "insertion";
    document.getElementById("algorithm").innerHTML = 'Algorithm: Insertion Sort<span class="caret"></span>';
  }

  document.getElementById("merge").onclick = () => {
    this.algorithm = "merge";
    document.getElementById("algorithm").innerHTML = 'Algorithm: Merge Sort<span class="caret"></span>';
  }

  document.getElementById("quick").onclick = () => {
    this.algorithm = "quick";
    document.getElementById("algorithm").innerHTML = 'Algorithm: Quick Sort<span class="caret"></span>';
  }

  document.getElementById("selection").onclick = () => {
    this.algorithm = "selection";
    document.getElementById("algorithm").innerHTML = 'Algorithm: Selection Sort<span class="caret"></span>';
  }

  document.getElementById("startButton").onclick = () => {
    if (this.run) {
      stop(this);
    } else {
      this.run = true;

      document.getElementById("randomizeButton").setAttribute("disabled", "");
      document.getElementById("algorithm").className = "btn btn-dark btn-lg dropdown-toggle disabled";
      document.getElementById("arraySize").className = "btn btn-dark btn-lg dropdown-toggle disabled";
      document.getElementById("startButton").innerHTML = "Stop";

      this.unactivate();
      this.runSorting();
    }
  }
};

Board.prototype.runSorting = function() {
  switch(this.algorithm) {
    case "bubble":
      bubbleSort(this, finishSorting);
      break;
    case "heap":
      heapSort(this, finishSorting);
      break;
    case "insertion":
      insertionSort(this, finishSorting);
      break;
    case "merge":
      mergeSort(this, finishSorting);
      break;
    case "quick":
      quickSort(this, finishSorting);
      break;
    case "selection":
      selectionSort(this, finishSorting);
      break;
  }
};

Board.prototype.changeSize = function() {
  let maxBars = getMaxBars(this.arraySize);
  let width = $("#array").width();
  let maxWidth = width / 2; //2 is margin 0.5 both right and left + 1px bar

  this.totalBars = Math.min(maxBars, maxWidth);
  this.width = (width / this.totalBars) - 1; //1 is margin 0.5 both right and left
};

function getMaxBars(arraySize) {
  return ARRAY_SIZE[arraySize];
};

function stop(board) {
  board.run = false;

  document.getElementById("randomizeButton").removeAttribute("disabled", "");
  document.getElementById("algorithm").className = "btn btn-dark btn-lg dropdown-toggle";
  document.getElementById("arraySize").className = "btn btn-dark btn-lg dropdown-toggle";
  document.getElementById("startButton").innerHTML = "Start";
}

function finishSorting(board) {
  let listBars = [];
  for(let i = board.boardBars.length-1; i >= 0; i--) {
    listBars.push(board.boardBars[i].id);
  }

  function generation() {
    if(listBars.length == 0) {
      stop(board);
      return;
    }
    let speed = board.speed === "fast" ?
      0 : board.speed === "average" ?
        10 : 20;

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

let height = $("#array").height();
let newBoard = new Board(height);
newBoard.init();
