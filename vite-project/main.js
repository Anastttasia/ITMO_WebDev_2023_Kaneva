const appendBlock = (block) => document.getElementById("app").appendChild(block);
const randomRange = (min, max) => Math.floor(Math.random() * (max - min) + min);

let currentColor = "#000000";

const BLOCK_SIZE = 25;
const NUM_BLOCKS_IN_LINE = 10;
const CONTAINER_SIZE = NUM_BLOCKS_IN_LINE * BLOCK_SIZE;

const CONTAINERS_COUNT_IN_LINE = Math.floor(window.innerWidth / (CONTAINER_SIZE + BLOCK_SIZE));
const CONTAINERS_COUNT_IN_COLUMN = Math.floor(window.innerHeight / (CONTAINER_SIZE + BLOCK_SIZE));
const CONTAINERS_COUNT = CONTAINERS_COUNT_IN_COLUMN * CONTAINERS_COUNT_IN_LINE;

const DOM = document.getElementById.bind(document);
const CONTAINER = DOM("app");

let xPos = BLOCK_SIZE;
let yPos = BLOCK_SIZE;

let containers = [];
let colorsInline = [];

const setRandomColor = () => {
  currentColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const getColorOrEmptyOnRandom = () => {
  const isNotEmpty = Math.random() > 0.5;
  if (isNotEmpty) {
    return currentColor;
  }
  return null;
};

const createBLOCK = (x, y, size, color) => {
  const result = document.createElement("div");
  if (color) {
    result.style.backgroundColor = color;
  }
  result.style.width = result.style.height = `${size}px`;
  result.style.position = "absolute";
  result.style.left = `${x}px`;
  result.style.top = `${y}px`;
  return result;
}

const createContainer = (x, y) => {
  const result = document.createElement("div");

  result.id = "container" + containers.length;
  result.style.width = result.style.height = `${CONTAINER_SIZE}px`;
  result.style.position = "absolute";
  result.style.left = `${x}px`;
  result.style.top = `${y}px`;
  return result;
}

const saveColorForFutureUse = (color) => {
  colorsInline.push(color);
}

while (containers.length < CONTAINERS_COUNT) {
  let container = createContainer(xPos, yPos);
  containers.push(container);
  appendBlock(container, CONTAINER);

  let xposs = 0;
  let yposs = 0;
  let blockNumber = 0;

  while (blockNumber < NUM_BLOCKS_IN_LINE * NUM_BLOCKS_IN_LINE) {
    let blockNumberInLine = blockNumber % NUM_BLOCKS_IN_LINE;
    let color;
    if (blockNumberInLine >= (NUM_BLOCKS_IN_LINE / 2)) {
      color = colorsInline[NUM_BLOCKS_IN_LINE - blockNumberInLine - 1];
    }
    else {
      color = getColorOrEmptyOnRandom();
      saveColorForFutureUse(color);
    }
    const block = createBLOCK(xposs, yposs, BLOCK_SIZE, color);
    container.appendChild(block);
    xposs += BLOCK_SIZE;
    blockNumber += 1;

    if (xposs == CONTAINER_SIZE) {
      yposs += BLOCK_SIZE;
      xposs = 0;
      colorsInline = [];
      setRandomColor();
    }
  }
  xPos += CONTAINER_SIZE + BLOCK_SIZE;
  if (xPos == CONTAINERS_COUNT_IN_LINE * (CONTAINER_SIZE + BLOCK_SIZE) + BLOCK_SIZE) {
    xPos = BLOCK_SIZE;
    yPos += CONTAINER_SIZE + BLOCK_SIZE;
  }
}


function updatePixelMonster(container) {
  let blocks = container.childNodes
  let color;
  setRandomColor();
  for (let blockNumber = 0; blockNumber < blocks.length; ++blockNumber) {
    let blockNumberInLine = blockNumber % NUM_BLOCKS_IN_LINE;
    if (blockNumberInLine >= (NUM_BLOCKS_IN_LINE / 2)) {
      color = colorsInline[NUM_BLOCKS_IN_LINE - blockNumberInLine - 1]
    }
    else {
      color = getColorOrEmptyOnRandom();
      saveColorForFutureUse(color);
    }
    blocks[blockNumber].style.backgroundColor = color;
    if (blockNumberInLine + 1 == NUM_BLOCKS_IN_LINE) {
      colorsInline = [];
    }
  }
}

let index = 0;
setInterval(() => {
  updatePixelMonster(containers[index % containers.length])
  index += 1;
}, 300);
