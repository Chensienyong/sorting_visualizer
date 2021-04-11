const sleep = require("./sleep");

const STATE = {
  'ACTIVE': 'active',
  'NOT_ACTIVE': 'not_active',
  'COMPARED': 'compared',
  'CURRENT': 'current'
};
Object.freeze(STATE)

async function insertionSort(board, callback) {
  let bars = board.boardBars;
  for(let i = 1; i<bars.length; i++) {
    let currentBar = bars[i];
    let j = i - 1;
    drawBarByState(bars[i], STATE.ACTIVE);
    await sleep(board.speed);
    while(j >= 0 && bars[j].height > currentBar.height) {
      drawBarByState(bars[j], STATE.CURRENT);
      swapHeight(bars[j], currentBar, board.height);
      currentBar = bars[j];
      await sleep(board.speed);
      drawBarByState(bars[j], STATE.NOT_ACTIVE);
      j -= 1;
    }
    drawBarByState(currentBar, STATE.NOT_ACTIVE);
    await sleep(board.speed);
  }
  callback(board);
}

function swapHeight(barA, barB, maxheight) {
  let tempHeight = barA.height;
  barA.height = barB.height;
  barB.height = tempHeight;

  $(`#${barA.id}`).css("height", barA.height);
  $(`#${barA.id}`).css("margin-top", maxheight - barA.height);
  $(`#${barB.id}`).css("height", barB.height);
  $(`#${barB.id}`).css("margin-top", maxheight - barB.height);
}

function drawBarByState(bar, state) {
  let element = document.getElementById(bar.id);
  element.className = `bar ${state}`;
};

module.exports = insertionSort;
