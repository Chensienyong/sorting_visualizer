const sleep = require("./sleep");

const STATE = {
  'ACTIVE': 'active',
  'NOT_ACTIVE': 'not_active',
  'COMPARED': 'compared',
  'CURRENT': 'current'
};
Object.freeze(STATE)

async function bubbleSort(board, callback) {
  let bars = board.boardBars;
  for(let i = 0; i<bars.length-1; i++) {
    let swapped = false;
    for(let j = 0; j<bars.length-1-i; j++) {
      drawBarByState(bars[j], STATE.ACTIVE);
      drawBarByState(bars[j+1], STATE.COMPARED);
      await sleep(board.speed);
      if(bars[j].height > bars[j+1].height) {
        swapped = true;
        swapHeight(bars[j], bars[j+1], board.height);
      }
      drawBarByState(bars[j], STATE.NOT_ACTIVE);
      drawBarByState(bars[j+1], STATE.NOT_ACTIVE);
      await sleep(board.speed);
    }
    if(!swapped) break;
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

module.exports = bubbleSort;
