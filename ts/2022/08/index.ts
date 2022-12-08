import { truncate } from "fs/promises";
import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 21,
  expectedT2: 8,
  part1Done: 1796,
  part2Done: 288120,
};

const testCases = [
  [``, 0],
  [``, 0],
];

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((l) => l != "")
    .map((x) => x.split("").map(Number));
};

function isVisible(r: number, c: number, m: number[][]): boolean {
  if (r == 0 || c == 0 || r === m.length - 1 || c == m[0].length - 1) {
    return true;
  }

  const e = m[r][c];
  let leftVisible = true,
    rightVisible = true,
    lowVisible = true,
    highVisible = true;
  for (let i = 0; i < m.length; i++) {
    switch (true) {
      case i < r:
        if (m[i][c] >= e) leftVisible = false;
        break;
      case i > r:
        if (m[i][c] >= e) rightVisible = false;
        break;
      default:
        break;
    }
  }

  for (let j = 0; j < m.length; j++) {
    switch (true) {
      case j < c:
        if (m[r][j] >= e) lowVisible = false;
        break;
      case j > c:
        if (m[r][j] >= e) highVisible = false;
        break;
      default:
        break;
    }
  }
  return lowVisible || highVisible || leftVisible || rightVisible;
}

function visibility(r: number, c: number, m: number[][]): number {
  if (r == 0 || c == 0 || r === m.length - 1 || c == m[0].length - 1) {
    return 0;
  }

  const e = m[r][c];
  let leftVisible = 0,
    rightVisible = 0,
    lowVisible = 0,
    highVisible = 0;

  let i = r - 1;
  while (i >= 0) {
    const n = m[i][c];
    if (n < e) {
      i--;
    } else {
      i = -1;
    }
    highVisible++;
  }
  i = r + 1;
  while (i < m.length) {
    const n = m[i][c];
    if (n < e) {
      i++;
    } else {
      i = m.length;
    }
    lowVisible++;
  }
  i = c - 1;
  while (i >= 0) {
    const n = m[r][i];
    if (n < e) {
      i--;
    } else {
      i = -1;
    }
    leftVisible++;
  }
  i = c + 1;
  while (i < m[0].length) {
    const n = m[r][i];
    if (n < e) {
      i++;
    } else {
      i = m.length;
    }
    rightVisible++;
  }

  return lowVisible * highVisible * leftVisible * rightVisible;
}
function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  console.info({ len, input });
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
      const c = row[j];
      if (isVisible(i, j, input)) {
        console.log(c, i, j);
        count++;
      }
    }
  }

  let res = count;

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/

function solvePart2(input: any): number {
  const len = input.length;
  console.info({ len, input });
  let count = 0,
    max = 0;
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
      const c = row[j];
      let v = visibility(i, j, input);
      max = Math.max(v, max);
    }
  }

  let res = max;

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
