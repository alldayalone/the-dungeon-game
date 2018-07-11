let maze = [
  [ [1, 0, 0, 1], [1, 1, 0, 0] ],
  [ [0, 1, 1, 1], [0, 1, 1, 0] ]
];
let roomSize = 10;
let [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3]; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawMaze();
}

function draw() {
}

function drawMaze() {
  grid.forEach((row, i) => row.forEach((cell, j) => 
    cell.forEach((isWall, dir) => isWall ? drawWall(i, j, dir) : null)
  ));
}

function drawWall(i, j, dir) {
  let y = i * roomSize;
  let x = j * roomSize;

  switch(dir) {
    case NORTH: 
      return line(x, y, x + roomSize, y);
    case EAST:
      return line(x + roomSize, y, x + roomSize, y + roomSize);
    case SOUTH:
      return line(x + roomSize, y + roomSize, x, y + roomSize);
    case WEST:
      return line(x, y + roomSize, x, y);
  }
}