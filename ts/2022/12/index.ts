import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 31,
  expectedT2: 29,
  part1Done: 408,
  part2Done: false,
};

const testCases = [
  [``, 0],
  [``, 0],
];
type coords = [number, number];

function getCoordinates(array: string[][], char: string): coords | undefined {
  for (let i = 0; i < array.length; i++) {
    const i2 = array[i].indexOf(char);
    if (i2 !== -1) return [i, i2];
  }
  return undefined;
}

function getAllCoordinates(array: string[][], char: string) {
  let r: coords[] = [];
  for (let i = 0; i < array.length; i++) {
    for (let i2 = 0; i2 < array[0].length; i2++) {
      if (array[i][i2].includes(char)) {
        r.push([i, i2]);
      }
    }
  }
  return r;
}
const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((l) => l != "")
    .map((x) => x.split(""));
};

function distance(a: coords, b: coords) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
function isLower(to: coords, from: coords, m: any[][]) {
  if (m[to[0]][to[1]].charCodeAt(0) - m[from[0]][from[1]].charCodeAt(0) <= 1) {
    return true;
  }
  return false;
}

class Node {
  pos: coords;
  f: number;
  g: number;
  h: number;
  parent?: Node;
  constructor(p: coords, g: number, h: number, parent?: Node) {
    this.pos = p;
    this.g = g;
    this.h = h;
    this.f = g + h;
    this.parent = parent;
  }
}

function neighbors(a: coords, input: number[][]): coords[] {
  let ret: coords[] = [];
  let x = a[0];
  let y = a[1];
  ("a");

  if (input[x - 1] && input[x - 1][y] && isLower([x - 1, y], a, input)) {
    ret.push([x - 1, y]);
  }
  if (input[x + 1] && input[x + 1][y] && isLower([x + 1, y], a, input)) {
    ret.push([x + 1, y]);
  }
  if (input[x][y - 1] && input[x][y - 1] && isLower([x, y - 1], a, input)) {
    ret.push([x, y - 1]);
  }
  if (input[x][y + 1] && input[x][y + 1] && isLower([x, y + 1], a, input)) {
    ret.push([x, y + 1]);
  }
  return ret;
}

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const start = getCoordinates(input, "S")!;
  input[start[0]][start[1]] = "a";
  const end = getCoordinates(input, "E")!;
  input[end[0]][end[1]] = "z";
  let path: Set<string> = new Set();
  let visited: Set<string> = new Set();
  let nodes: Map<string, Node> = new Map();
  nodes.set(start.join(","), new Node(start, 0, distance(start, end)));
  path.add(start.join(","));
  visited.add(start.join(","));
  let c = 0;
  while (path.size > 0 && c < 10000) {
    c++;
    const p = Array.from(path.values()).sort(
      (a, b) => nodes.get(a)!.f - nodes.get(b)!.f
    );

    let n = p[0];
    let nc = n.split(",").map(Number) as coords;
    const node = nodes.get(n)!;
    path.delete(n);
    visited.add(n);

    if (n == end.join(",")) {
      console.log(node);
      return node.f;
      continue;
    }
    const ne = neighbors(nc, input);
    for (let i = 0; i < ne.length; i++) {
      const nec = ne[i].join(",");
      const element = new Node(ne[i], node.g + 1, distance(ne[i], end), node);
      if (visited.has(nec)) {
        continue;
      }
      if (path.has(nec)) {
        if (nodes.get(nec)!.g < node.g + 1) {
          nodes.set(nec, element);
        }
      } else {
        nodes.set(nec, element);
        path.add(nec);
      }
    }
  }

  let res = 987;

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/

function solvePart2(input: any): number {
  console.info(
    `One ⭐️ to go. Solving part 2. ${problem.year}/12/${problem.day}`
  );

  const startS = getCoordinates(input, "S")!;
  input[startS[0]][startS[1]] = "a";
  let as = getAllCoordinates(input, "a");
  console.log({ as });

  const end = getCoordinates(input, "E")!;

  console.info({ input, as, end });
  let path: Set<string> = new Set();
  let visited: Set<string> = new Set();
  let nodes: Map<string, Node> = new Map();
  let res: any = [];
  as.forEach((start) => {
    input[start[0]][start[1]] = "S";
    let r = solvePart1(input);
    res.push(r);
    console.log(r);
    input[end[0]][end[1]] = "E";

    //visited.add(start.join(","));
  });
  res.sort((a: number, b: number) => a - b);
  return res[0];

  console.log({ path });
  let c = 0;
  let posible: any = [];
  while (path.size > 0 && c < 1000000) {
    c++;
    const p = Array.from(path.values()).sort(
      (a, b) => nodes.get(a)!.g - nodes.get(b)!.g
    );
    // console.log(p);

    let n = p[0];
    let nc = n.split(",").map(Number) as coords;
    const node = nodes.get(n)!;
    path.delete(n);
    visited.add(n);
    console.log(c, n, node.g, node.f);

    if (n == end.join(",")) {
      console.log(node);
      return node.f;
      posible.push(node.f);
      continue;
    }
    const ne = neighbors(nc, input);
    for (let i = 0; i < ne.length; i++) {
      const nec = ne[i].join(",");
      const element = new Node(ne[i], node.g + 1, distance(ne[i], end), node);
      if (visited.has(nec)) {
        if (visited.has(nec + ";" + node.parent?.pos.join(","))) {
          if (nodes.get(nec)!.g < node.g + 1) {
            nodes.set(nec, element);
          }
          continue;
        } else {
          if (nodes.get(nec)!.g < node.g + 1) {
            visited.add(n + ";" + node.parent?.pos.join(","));
            nodes.set(nec, element);
          }
        }
        continue;
      }
      if (path.has(nec)) {
        if (nodes.get(nec)!.g < node.g + 1) {
          nodes.set(nec, element);
        }
      } else {
        nodes.set(nec, element);
        path.add(nec);
      }
    }
  }
  console.log(posible);
  //let res = posible[0];

  return res;
}

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

/* ----------------------------   Tests   ------------------------------*/

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
