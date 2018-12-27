const difficultyElement = document.querySelector('.diff-span');
const pDifficultyElement = document.querySelector('.pDiff-span');
const coinsElement = document.querySelector('.coins-span');
const clickZone = document.querySelector('.click-zone');

var blockInfo = {
  reward: 50,
  previousDiff: 40,
  currentDiff: 40,
  meanTime: 5000,
  blockAmount: 0
}

difficultyElement.innerText = blockInfo.currentDiff;
pDifficultyElement.innerText = blockInfo.previousDiff;

var blocks = [];

var clicks = 0;

var coins = 0;

function calculateDiff() {
  if(blocks.length >= 5) {
    var blockTime = ((blocks[4] - blocks[3]) + (blocks[3] - blocks[2]) + (blocks[2] - blocks[1]) + (blocks[1] - blocks[0]) / 4);
  }
  var newDiff = (blockInfo.meanTime * 8) / ( blockTime / 5) * 8;
  var prevDiff = blockInfo.currentDiff;
  blockInfo.previousDiff = prevDiff;
  blockInfo.currentDiff = Math.round(newDiff);
  difficultyElement.innerText = blockInfo.currentDiff;
  pDifficultyElement.innerText = blockInfo.previousDiff;
  console.log(blockInfo.previousDiff, blockInfo.currentDiff);
}

function halfReward() {
  var remainder = blockInfo.blockAmount % 10;
  var currentReward = blockInfo.reward;

  if(remainder === 0){
    var newReward = currentReward / 2;
    blockInfo.reward = newReward;
  }
}

function startBlock() {
  blockInfo.blockAmount++;
  blocks.push(Date.now());
  if(blocks.length > 5){
    blocks.shift();
    calculateDiff();
  }
}

function addReward() {
  coins += blockInfo.reward;
  coinsElement.innerText = coins;
}

function resetClicks() {
  clicks = 0;
  addReward();
  startBlock();
  halfReward();
}

function mine() {
  clicks++;
  clickZone.innerHTML = clicks;
  if(clicks === blockInfo.currentDiff){
    resetClicks();
  }
}

clickZone.addEventListener('click', mine);
