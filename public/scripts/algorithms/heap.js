const sleep = require("./sleep");

const STATE = {
  'ACTIVE': 'active',
  'NOT_ACTIVE': 'not_active',
  'COMPARED': 'compared',
  'CURRENT': 'current'
};
Object.freeze(STATE)

async function heapify(board, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  let bars = board.boardBars;

  if (l < n && bars[l].height > bars[largest].height)
    largest = l;

  if (r < n && bars[r].height > bars[largest].height)
    largest = r;

  if (largest != i) {
    drawBarByState(bars[largest], STATE.ACTIVE);
    drawBarByState(bars[i], STATE.COMPARED);
    swapHeight(bars[i], bars[largest], board.height);
    await sleep(board.speed);
    drawBarByState(bars[largest], STATE.NOT_ACTIVE);
    drawBarByState(bars[i], STATE.NOT_ACTIVE);
    await heapify(board, n, largest);
  }
}

async function heapSort(board, callback) {
  let bars = board.boardBars;
  let n = bars.length;
  for (let i = n / 2 -1; i >= 0; i--)
    await heapify(board, n, i);

  for (let i = n - 1; i > 0; i--) {
    drawBarByState(bars[i], STATE.ACTIVE);
    drawBarByState(bars[0], STATE.COMPARED);
    swapHeight(bars[0], bars[i], board.height);
    await sleep(board.speed);
    drawBarByState(bars[i], STATE.NOT_ACTIVE);
    drawBarByState(bars[0], STATE.NOT_ACTIVE);
    await heapify(board, i, 0);
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

module.exports = heapSort;
