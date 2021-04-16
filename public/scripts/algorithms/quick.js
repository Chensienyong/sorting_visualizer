const sleep = require("./sleep");

const STATE = {
  'ACTIVE': 'active',
  'NOT_ACTIVE': 'not_active',
  'COMPARED': 'compared',
  'CURRENT': 'current'
};
Object.freeze(STATE)

async function partition(bars, left, right, board) {
  let index = getRandomPivot(left, right);
  swapHeight(bars[index], bars[right], board.height);
  drawBarByState(bars[right], STATE.ACTIVE);
  let pivot = bars[right].height;

  for (let curr = left; curr < right; curr++) {
    if (bars[curr].height < pivot) {
      drawBarByState(bars[curr], STATE.COMPARED);
      drawBarByState(bars[left], STATE.COMPARED);
      await sleep(board.speed);
      swapHeight(bars[left], bars[curr], board.height);
      drawBarByState(bars[curr], STATE.NOT_ACTIVE);
      drawBarByState(bars[left], STATE.NOT_ACTIVE);
      left++;
    }
  }
  await sleep(board.speed);
  swapHeight(bars[left], bars[right], board.height);
  drawBarByState(bars[right], STATE.NOT_ACTIVE);
  return left++;
}

async function quickMain(bars, left, right, board) {
  if (left >= right) return;
  let partitionIndex = await partition(bars, left, right, board);
  await quickMain(bars, left, partitionIndex - 1, board);
  await quickMain(bars, partitionIndex+1, right, board);
}

async function quickSort(board, callback) {
  let bars = board.boardBars;
  await quickMain(bars, 0, bars.length - 1, board);
  callback(board);
}

function getRandomPivot(left, right) {
  return Math.floor(Math.random() * (right - left + 1)) + left;
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

module.exports = quickSort;
