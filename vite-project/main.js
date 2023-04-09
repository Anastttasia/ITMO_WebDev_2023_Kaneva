const appendBlock = (block) => document.getElementById("app").appendChild(block);
const randomRange = (min, max) => Math.floor(Math.random() * (max - min) + min);

const BLOCK_SIZE = 50;
const STEP_DELTA_X = BLOCK_SIZE;
const DIMENSION = 8;
const DIMENSION_HALF = DIMENSION / 2;

const DOM = document.getElementById.bind(document);
const container = DOM("app")

let columns = 0;
let rows = 0;
let xPos = 0;
let yPos = 0;

let colorsInline = [];

const getColorOrEmptyOnRandom  = () => {
  const isNotEmpty= Math.random() > 0.5;
  if (isNotEmpty){
    return "black"
  }
  return null;
}

const createBLOCK = (x, y, size, color) => {
  const result = document.createElement("div");
  if(color){
    result.style.backgroundColor = color;
  }
  result.style.width = result.style.height = `${size}px`;
  result.style.position = "absolute";
  result.style.color = "white";
  result.style.left = `${x}px`;
  result.style.top = `${y}px`;
  return result;
}

const saveColorForFutureUse = (color) => {
  colorsInline.push(color);
}

while(columns < DIMENSION_HALF){
  const color = getColorOrEmptyOnRandom();
  const block = createBLOCK(xPos, yPos, BLOCK_SIZE, color);
  saveColorForFutureUse(color);
  appendBlock(block, container);
  xPos += STEP_DELTA_X;
  columns += 1;
}

const rigtHalfOffSet = (DIMENSION / 2) * BLOCK_SIZE;
colorsInline.revers().forEach((color, BLOCK_SIZE) => {
  const block = createBLOCK(BLOCK_SIZE * BLOCK_SIZE + rigtHalfOffSet);
  appendBlock(block);
  xPos += BLOCK_SIZE;
});
