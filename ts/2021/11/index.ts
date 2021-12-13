import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 1656,
  expectedT2: 195,
  part1Done: true,
  part2Done: false,
};

const parseInput = (input: string) => {
  return input
    .split("\n").map(l => l.split("").map(Number));
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

const coords = (i: number, j: number) => `${i},${j}`;
function increaseNei(i: number, j: number, m: number[][]) {
  const ne = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let n of ne) {
    const ii = n[0] + i, jj = n[1] + j;
    if (ii >= 0 && ii < m.length && jj >= 0 && jj < m[0].length) {
      if (m[ii][jj] == 10) continue;
      m[ii][jj]++;
      if (m[ii][jj] == 10) {
        increaseNei(ii, jj, m);
      }
    }
  }
}

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const m = input;
  let res = 0;

  for (let k = 0; k < 100; k++) {
    let que = new Map();
    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[0].length; j++) {
        if (m[i][j] != 10) {
          m[i][j]++;
          if (m[i][j] == 10) {
            //console.log(i, j);
            increaseNei(i, j, m);

          }
        }
      }
    }

    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[0].length; j++) {
        if (m[i][j] == 10) {
          m[i][j] = 0;
          res++;
        }
      }
    }

  }

  //  console.log(m, res);
  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  const m = input;

  for (let k = 0; k < 500; k++) {
    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[0].length; j++) {
        if (m[i][j] != 10) {
          m[i][j]++;
          if (m[i][j] == 10) {
            increaseNei(i, j, m);
          }
        }
      }
    }
    let res = 0;
    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[0].length; j++) {
        if (m[i][j] == 10) {
          m[i][j] = 0;
          res++;
        }
      }
    }
    const v = m.map((l: number[][]) => l.join("")).join("\n");
    if (res == (m.length * m[0].length)) {
      return k + 1;
    }
  }

  console.log(m);
  return 0;
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
