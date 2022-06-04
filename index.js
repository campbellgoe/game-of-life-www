import { memory } from "wasm-game-of-life/game_of_life_bg";
import { Universe, Cell } from "wasm-game-of-life";

const CELL_SIZE = 5;
const GRID_COLOUR = "#CCCCCC";
const DEAD_COLOUR = "#FFFFFF";
const ALIVE_COLOUR = "#000000";

const universe = Universe.new();
const width = universe.width();
const height = universe.height();

const getIndex = (row, col) => {
  return row * width + col;
}

const canvas = document.getElementById('game-of-life-canvas');
canvas.width = (CELL_SIZE + 1) * width + 1;
canvas.height = (CELL_SIZE + 1) * height + 1;

const ctx = canvas.getContext('2d');

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  ctx.beginPath();

  for(let row = 0; row < height; row++) {
    for(let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = cells[idx] === Cell.Dead
      ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOUR : ALIVE_COLOUR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }
  ctx.closePath();
}

// const drawGrid = () => {
//   ctx.beginPath();
//   ctx.strokeStyle = GRID_COLOUR;

//   // vertical lines
//   for(let i = 0;i < width; i++){
//     ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
//     ctx.lineTo(i * (CELL_SIZE + 1) +1, (CELL_SIZE + 1) * height + 1);
//   }

//   //horizontal lines
//   for(let i = 0;i < height; i++){
//     ctx.moveTo(0, i * (CELL_SIZE + 1) + 1);
//     ctx.lineTo(i * (CELL_SIZE + 1) *width +1, (CELL_SIZE + 1) + 1);
//   }
//   ctx.stroke();
//   ctx.closePath();
// }
const renderLoop = () => {
  universe.tick();

  // drawGrid();
  drawCells();
  requestAnimationFrame(renderLoop);
};

requestAnimationFrame(renderLoop);