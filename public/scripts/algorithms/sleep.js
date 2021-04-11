function sleep(speed) {
  let delay = speed === "fast" ?
    0 : speed === "average" ?
      10 : 20;

  return new Promise(resolve => setTimeout(resolve, delay));
};

module.exports = sleep;
