const STATE = {
  'ACTIVE': 'active',
  'NOT_ACTIVE': 'not_active',
  'COMPARED': 'compared',
  'CURRENT': 'current'
};
Object.freeze(STATE)

async function SelectionSort(board, callback) {
  for(let i = 0; i<board.boardBars.length; i++) {
    let smallestBar = board.boardBars[i];
    drawBarByState(board.boardBars[i], STATE.ACTIVE);
    for(let j = i+1; j<board.boardBars.length; j++) {
      drawBarByState(board.boardBars[j], STATE.CURRENT);
      await sleep(board.speed);
      if(smallestBar.height > board.boardBars[j].height) {
        if(smallestBar.id != board.boardBars[i].id) {
          drawBarByState(smallestBar, STATE.NOT_ACTIVE);
        }
        smallestBar = board.boardBars[j];
        drawBarByState(smallestBar, STATE.COMPARED);
      } else {
        drawBarByState(board.boardBars[j], STATE.NOT_ACTIVE);
      }
      await sleep(board.speed);
    }
    if(smallestBar.id != board.boardBars[i].id) {
      swapHeight(smallestBar, board.boardBars[i], board.height);
      drawBarByState(smallestBar, STATE.NOT_ACTIVE);
    }
    drawBarByState(board.boardBars[i], STATE.NOT_ACTIVE);
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

function sleep(speed) {
  let delay = speed === "fast" ?
    5 : speed === "average" ?
      15 : 35;

  return new Promise(resolve => setTimeout(resolve, delay));
};

module.exports = SelectionSort;
