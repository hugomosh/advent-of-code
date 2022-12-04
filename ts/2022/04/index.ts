import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: 0,
  expectedT1: 123,
  expectedT2: 789,
  part1Done: 483,
  part2Done: 874,
};

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((l) => l != "")
    .map((l) => l.split(",").map((s) => s.split("-").map(Number)));
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

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  console.info({ len, input });

  let res = 0;

  for (let i = 0; i < input.length; i++) {
    const e = input[i];
    let k = 0,
      j = 0;
    if (
      (e[0][0] <= e[1][0] && e[0][1] >= e[1][1]) ||
      (e[0][0] >= e[1][0] && e[0][1] <= e[1][1])
    ) {
      res++;
    }
  }

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  const len = input[0].length;
  console.info({ len, input });

  let res = 0;

  for (let i = 0; i < input.length; i++) {
    const e = input[i];
    let k = 0,
      j = 0;
    if (
      (e[0][0] <= e[1][0] && e[1][0] <= e[0][1]) ||
      (e[0][0] <= e[1][1] && e[1][1] <= e[0][1]) ||
      (e[1][0] <= e[0][0] && e[0][0] <= e[1][1]) ||
      (e[1][0] <= e[0][0] && e[0][0] <= e[1][1])
    ) {
      res++;
    }
  }

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
