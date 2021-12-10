import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 26397,
  expectedT2: 288957,
  part1Done: true,
  part2Done: false,
};
const points: any = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((e) => e != "")
    .map((l) => l.split(""));
};

function isOpening(e: string) {
  switch (e) {
    case "(":
    case "[":
    case "{":
    case "<":
      return true;

    default:
      return false;
  }
}
function isOpposite(a: string, b: string) {
  const opening = isOpening(a) ? a : b,
    closing = isOpening(a) ? b : a;
  switch (opening) {
    case "(":
      return closing == ")";
    case "[":
      return closing == "]";

    case "{":
      return closing == "}";

    case "<":
      return closing == ">";

      return true;

    default:
      console.warn("NOO");
      return false;
  }
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

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input[0].length;
  let count: any = {
    ")": 0,
    "]": 0,
    "}": 0,
    ">": 0,
  };

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const que = [];
    for (let j = 0; j < line.length; j++) {
      const e = line[j];
      if (isOpening(e)) {
        que.push(e);
      } else {
        const prev = que.pop()!;
        if (!isOpposite(prev, e)) {
          console.log({ prev, e });

          count[e]++;
        }
      }
    }
  }
  console.log(count);
  let res = 0;
  for (let k of Object.keys(count)) {
    res += count[k] * points[k];
  }
  //parseInt(gamma.join(""), 2)

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  const len = input[0].length;
  let count: any = {
    ")": 0,
    "]": 0,
    "}": 0,
    ">": 0,
  };
  const points2: any = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
  };
  let res2 = [];

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const que = [];
    let skipped = false;
    for (let j = 0; j < line.length; j++) {
      const e = line[j];
      if (isOpening(e)) {
        que.push(e);
      } else {
        const prev = que.pop()!;
        if (!isOpposite(prev, e)) {
          skipped = true;
          continue;
        }
      }
    }
    if (skipped) continue;

    console.log(que);
    let lineScore = 0;
    while (que.length > 0) {
      const e = que.pop();
      lineScore = lineScore * 5;
      lineScore += points2[e];
      console.log(lineScore);
    }
    res2.push(lineScore);
  }
  res2 = res2.sort((a, b) => a - b);
  return res2[res2.length / 2 - 0.5];
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
