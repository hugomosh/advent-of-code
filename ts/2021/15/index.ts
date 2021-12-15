import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 40,
  expectedT2: 315,
  part1Done: 1,
  part2Done: false,
};

const parseInput = (input: string) => {
  return input.split("\n").filter(x => x != "").map(l => l.split("").map(Number));
};

const part1 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart1(input);
};

const part2 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart2(input);
};

const coords = (x: number, y: number) => `${x},${y}`;
const coordNum = (coords: string) => coords.split(",").map(Number);
const neighboards = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];


function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const n = input[0].length;
  const m = input.length;
  console.info({ input, m, n, });
  const goal = [m - 1, n - 1];
  const visited = {};
  class Node {
    coords: string;
    distance: number = 0;
    risk: number = 0;
    f: number = 0;
    parent: Node | null = null;
    constructor(x: number, y: number, parent?: Node) {
      this.coords = coords(x, y);
      this.risk = input[x][y] + (parent?.risk ?? 0);
      this.distance = goal[0] - x + goal[1] - y;
      this.f = this.risk + this.distance;
      this.parent = parent ?? null;
    }
  }

  const openList = new Set<string>();
  const closedList = new Map<string, Node>();


  const startNode = new Node(0, 0);
  startNode.risk = 0;
  openList.add(startNode.coords);
  closedList.set(startNode.coords, startNode);
  function inRange(newCoords: number[]) {
    const [x, y] = newCoords;
    return x >= 0 && y >= 0 && x < m && y < n;
  }
  function grabLowestF(): Node {
    let minNode: Node | undefined;
    for (const s of openList) {
      const node = closedList.get(s)!;
      console.assert(node, `No node for ${s}`);
      if (!minNode) {
        minNode = node;
      } else {
        if (minNode.risk > node.risk) {
          minNode = node;
        }
      }
    }
    return minNode!;
  }

  while (openList.size > 0) {
    // Grab lowest f
    const current = grabLowestF();
    openList.delete(current!.coords);
    // End case
    if (current.coords == coords(goal[0], goal[1])) {
      return current.risk;
    }

    // Move node to visited

    // Check neighboard 
    for (const neighboard of neighboards) {
      const coordsN = coordNum(current.coords);
      const newCoords = [neighboard[0] + coordsN[0], neighboard[1] + coordsN[1]];

      if (inRange(newCoords)) {
        const newNode = new Node(newCoords[0], newCoords[1], current);
        const tentative = newNode.risk;

        if (tentative < (closedList.get(coords(newCoords[0], newCoords[1])) ?? Infinity)) {
          closedList.set(coords(newCoords[0], newCoords[1]), newNode);
          openList.add(newNode.coords);
        }
      }
    }
    // Score of n
    // update better score
    // 
  }
  let res = 0;
  //parseInt(gamma.join(""), 2)
  return res;
}

function printMatrix(input: any[][]) {
  console.log(input.map(x => x.join("")).join("\n"));
}
function expandInput(inputO: number[][]): number[][] {


  const input = new Array(inputO.length * 5).fill(1).map(x => new Array(inputO[0].length * 5).fill(0))


  for (let i = 0; i < inputO.length; i++) {
    for (let j = 0; j < inputO[0].length; j++) {
      const element = inputO[i][j];
      for (let ii = 0; ii < 5; ii++) {
        for (let jj = 0; jj < 5; jj++) {
          if (ii == 0 && jj == 0) {
            input[i][j] = inputO[i][j];
          } else {
            if (jj == 0) {
              input[i + (inputO.length * ii)][j] = input[i + (inputO.length * (ii - 1))][j] + 1;
              if (input[i + (inputO.length * ii)][j] > 9) {
                input[i + (inputO.length * ii)][j] = 1;
              }
            } else {
              input[i + (inputO.length * ii)][j + (inputO[0].length * jj)] = input[i + (inputO.length * ii)][j + (inputO[0].length * (jj - 1))] + 1;
              if (input[i + (inputO.length * ii)][j + (inputO[0].length * jj)] > 9) {
                input[i + (inputO.length * ii)][j + (inputO[0].length * jj)] = 1;
              }
            }
          }

        }
      }
    }
  }
  // printMatrix(input);
  return input;

}
/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(inputO: any): number {
  console.info(`Solving part 2. ${problem.year}/12/${problem.day}`);

  const input = expandInput(inputO);
  const n = input[0].length;
  const m = input.length;
  console.info({ m, n, });
  const goal = [m - 1, n - 1];
  const visited = {};
  class Node {
    coords: string;
    distance: number = 0;
    risk: number = 0;
    f: number = 0;
    parent: Node | null = null;
    constructor(x: number, y: number, parent?: Node) {
      this.coords = coords(x, y);
      this.risk = input[x][y] + (parent?.risk ?? 0);
      this.distance = goal[0] - x + goal[1] - y;
      this.f = this.risk + this.distance;
      this.parent = parent ?? null;
    }
  }

  const openList = new Set<string>();
  const closedList = new Map<string, Node>();


  const startNode = new Node(0, 0);
  startNode.risk = 0;
  openList.add(startNode.coords);
  closedList.set(startNode.coords, startNode);
  function inRange(newCoords: number[]) {
    const [x, y] = newCoords;
    return x >= 0 && y >= 0 && x < m && y < n;
  }
  function grabLowestF(): Node {
    let minNode: Node | undefined;
    for (const s of openList) {
      const node = closedList.get(s)!;
      console.assert(node, `No node for ${s}`);
      if (!minNode) {
        minNode = node;
      } else {
        if (minNode.risk > node.risk) {
          minNode = node;
        }
      }
    }
    return minNode!;
  }

  while (openList.size > 0) {
    // Grab lowest f
    const current = grabLowestF();
    openList.delete(current!.coords);
    // End case
    if (current.coords == coords(goal[0], goal[1])) {
      return current.risk;
    }

    // Move node to visited

    // Check neighboard 
    for (const neighboard of neighboards) {
      const coordsN = coordNum(current.coords);
      const newCoords = [neighboard[0] + coordsN[0], neighboard[1] + coordsN[1]];

      if (inRange(newCoords)) {
        const newNode = new Node(newCoords[0], newCoords[1], current);
        const tentative = newNode.risk;

        if (tentative < (closedList.get(coords(newCoords[0], newCoords[1])) ?? Infinity)) {
          closedList.set(coords(newCoords[0], newCoords[1]), newNode);
          openList.add(newNode.coords);
        }
      }
    }
    // Score of n
    // update better score
    // 
  }
  let res = 0;
  //parseInt(gamma.join(""), 2)
  return res;
}

const testPart1 = (): boolean => {
  const input = readTestInputFile(problem.year, problem.day);
  console.assert(input != "" && input.length > 0, "Empty test input part1 !");
  if (input == "") return true; // Skip test and try problem
  console.info("Running test 1");
  const parsed = parseInput(input);

  const expected = problem.expectedT1;
  const actual = solvePart1(parsed);
  const result = actual === expected;
  result
    ? console.info("1️⃣ ✅", actual)
    : console.assert(result, `T1️⃣  ${actual} vs the expected: ${expected}`);
  return result;
};

const testPart2 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = problem.expectedT2;
  const actual = solvePart2(parsed);
  const result = actual === expected;
  result
    ? console.info("2️⃣ ✅", actual)
    : console.assert(result, `T2️⃣: ${actual} vs the expected: ${expected}`);
  return result;
};

function main() {
  console.info(`------------------------------------------------------------`);
  console.info(`🎄 Running Advent of Code ${problem.year} Day: ${problem.day}`);
  if (!problem.part1Done) {
    if (!problem.doTest || testPart1()) {
      console.info(`Solution 1️⃣: ${part1()}`);
    }
  } else if (!problem.part2Done) {
    if (!problem.doTest || testPart2()) {
      console.info(`Solution 2️⃣: ${part2()}`);
    }
  }
}

main();
