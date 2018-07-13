let cellSize = 10;
let [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3]; 
let [n, m] = [10, 10]

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawMaze(graphToMaze(generateSpanningTree()));
}

function draw() {
}

function drawMaze(maze) {
  maze.forEach((row, i) => row.forEach((cell, j) => 
    cell.forEach((isWall, dir) => isWall ? drawWall(i, j, dir) : null)
  ));
}

function drawWall(i, j, dir) {
  let y = i * cellSize;
  let x = j * cellSize;

  switch(dir) {
    case NORTH: 
      return line(x, y, x + cellSize, y);
    case EAST:
      return line(x + cellSize, y, x + cellSize, y + cellSize);
    case SOUTH:
      return line(x + cellSize, y + cellSize, x, y + cellSize);
    case WEST:
      return line(x, y + cellSize, x, y);
  }
}

function generateGridGraph() {
  let graph = [];

  for (let cur = 0; cur < n * m; cur++) {
    let cell = [];
    let i = cur / m;
    let j = cur % m;

    if (i - 1 >= 0) { cell.push(cur - m); }
    if (j + 1 < m)  { cell.push(cur + 1); }
    if (i + 1 < n)  { cell.push(cur + m); }
    if (j - 1 >= 0) { cell.push(cur - 1); }

    graph.push(cell);
  }

  return graph;
}

function generateSpanningTree() {
  let grid = generateGridGraph();
  let visited = [];
  let spanningTree = []
  let stack = [randomInt(n * m)];

  for (let i = 0; i < n * m; i++) {
    spanningTree.push([]);
    visited.push(0);
  }
  visited[peek(stack)] = 1;

  while (stack.length) {
    let cur = peek(stack);
    let curList = grid[cur].filter(vert => !visited[vert]);

    if (curList.length) {
      let next = random(curList);
      visited[next] = true;

      spanningTree[cur].push(next);
      spanningTree[next].push(cur);

      stack.push(next);
    } else {
      stack.pop();
    }
  }

  return spanningTree;
}

function peek(arr) {
  return arr[arr.length - 1];
}

function randomInt(to, from = 0) {
  return Math.floor(Math.random() * to) + from;
}

function graphToMaze(graph) {
  let maze = [];
  for (let i = 0; i < n; i++) {
    maze.push([]);
    for (let j = 0; j < m; j++) {
      maze[i].push([1, 1, 1, 1]);
    }
  }
  graph.forEach((cell, cur) => {
    let i = floor(cur / m);
    let j = cur % m;

    if (cell.find(el => el === cur - m)) { maze[i][j][NORTH] = 0; maze[i - 1][j][SOUTH] = 0 ; }
    if (cell.find(el => el === cur + 1)) { maze[i][j][EAST]  = 0; maze[i][j + 1][WEST]  = 0 ; }
    if (cell.find(el => el === cur + m)) { maze[i][j][SOUTH] = 0; maze[i + 1][j][NORTH] = 0 ; }
    if (cell.find(el => el === cur - 1)) { maze[i][j][WEST]  = 0; maze[i][j - 1][EAST]  = 0 ; }
  });

  return maze;
}