const sleep = require("./sleep");

const STATE = {
  'ACTIVE': 'active',
  'NOT_ACTIVE': 'not_active',
  'COMPARED': 'compared',
  'CURRENT': 'current'
};
Object.freeze(STATE)

async function merge(bars, left, mid, right, board) {
  let n1 = mid - left + 1;
  let n2 = right - mid;
  let barsLeft = [], barsRight = [];
  for (let i = 0; i < n1; i++) {
    drawBarByState(bars[left + i], STATE.ACTIVE);
    barsLeft.push(bars[left + i].height);
    drawBarByState(bars[left + i], STATE.NOT_ACTIVE);
  }
  for (let i = 0; i < n2; i++) {
    drawBarByState(bars[mid + 1 + i], STATE.ACTIVE);
    barsRight.push(bars[mid + 1 + i].height);
    drawBarByState(bars[mid + 1 + i], STATE.NOT_ACTIVE);
  }

  let pointerLeft = 0, pointerRight = 0;
  let pointerNow = left;
  while (pointerLeft < n1 && pointerRight < n2) {
    drawBarByState(bars[pointerNow], STATE.ACTIVE);
    drawBarByState(bars[pointerLeft + left], STATE.COMPARED);
    drawBarByState(bars[mid + 1 + pointerRight], STATE.COMPARED);
    await sleep(board.speed);
    if (barsLeft[pointerLeft] <= barsRight[pointerRight]) {
      setHeight(bars[pointerNow], barsLeft[pointerLeft], board.height);
      drawBarByState(bars[pointerLeft + left], STATE.NOT_ACTIVE);
      drawBarByState(bars[mid + 1 + pointerRight], STATE.NOT_ACTIVE);
      pointerLeft++;
    } else {
      setHeight(bars[pointerNow], barsRight[pointerRight], board.height);
      drawBarByState(bars[pointerLeft + left], STATE.NOT_ACTIVE);
      drawBarByState(bars[mid + 1 + pointerRight], STATE.NOT_ACTIVE);
      pointerRight++;
    }
    drawBarByState(bars[pointerNow], STATE.NOT_ACTIVE);
    pointerNow++;
  }

  while (pointerLeft < n1) {
    drawBarByState(bars[pointerNow], STATE.ACTIVE);
    setHeight(bars[pointerNow], barsLeft[pointerLeft], board.height);
    await sleep(board.speed);
    drawBarByState(bars[pointerNow], STATE.NOT_ACTIVE);
    pointerLeft++;
    pointerNow++;
  }

  while (pointerRight < n2) {
    drawBarByState(bars[pointerNow], STATE.ACTIVE);
    setHeight(bars[pointerNow], barsRight[pointerRight], board.height);
    await sleep(board.speed);
    drawBarByState(bars[pointerNow], STATE.NOT_ACTIVE);
    pointerRight++;
    pointerNow++;
  }
}

async function mergeMain(bars, left, right, board) {
  if (left >= right) return;
  let mid = Math.floor(left + ((right - left) / 2));
  await mergeMain(bars, left, mid, board);
  await mergeMain(bars, mid+1, right, board);
  await merge(bars, left, mid, right, board);
}

async function mergeSort(board, callback) {
  let bars = board.boardBars;
  await mergeMain(bars, 0, bars.length - 1, board);
  callback(board);
}

function setHeight(barA, height, maxheight) {
  barA.height = height;

  $(`#${barA.id}`).css("height", barA.height);
  $(`#${barA.id}`).css("margin-top", maxheight - barA.height);
}

function drawBarByState(bar, state) {
  let element = document.getElementById(bar.id);
  element.className = `bar ${state}`;
};

module.exports = mergeSort;
