const sleep = require("./sleep");

const STATE = {
  'ACTIVE': 'active',
  'NOT_ACTIVE': 'not_active',
  'COMPARED': 'compared',
  'CURRENT': 'current'
};
Object.freeze(STATE)

async function selectionSort(board, callback) {
  let bars = board.boardBars;
  for(let i = 0; i<bars.length; i++) {
    let smallestBar = bars[i];
    if(!board.run) return;
    drawBarByState(bars[i], STATE.ACTIVE);
    for(let j = i+1; j<bars.length; j++) {
      drawBarByState(bars[j], STATE.CURRENT);
      await sleep(board.speed);
      if(smallestBar.height > bars[j].height) {
        if(smallestBar.id != bars[i].id) {
          drawBarByState(smallestBar, STATE.NOT_ACTIVE);
        }
        smallestBar = bars[j];
        drawBarByState(smallestBar, STATE.COMPARED);
      } else {
        drawBarByState(bars[j], STATE.NOT_ACTIVE);
      }
    }
    if(smallestBar.id != bars[i].id) {
      swapHeight(smallestBar, bars[i], board.height);
      drawBarByState(smallestBar, STATE.NOT_ACTIVE);
    }
    drawBarByState(bars[i], STATE.NOT_ACTIVE);
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

module.exports = selectionSort;
