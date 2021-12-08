import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: 2021,
  day: 4,
  part1Done: false,
  part2Done: false,
};

const part1 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart1(input);
};

const parseInput = (input: string) => {
  return input.split("\n");
};

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input[0].length;
  console.info({ len, input });
  let res = 987;
  //parseInt(gamma.join(""), 2)

  return res;
}

function solvePart2(input: any): number {
  const len = input[0].length;
  console.info({ len, input });
  let res2 = 123;

  return res2;
}

const part2 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart2(input);
};

const testPart1 = (): boolean => {
  const input = readTestInputFile(problem.year, problem.day);
  console.assert(input != "" && input.length > 0, "Empty test input part1 !");
  if (input != "") return true; // Skip test and try problem
  console.info("Running test 1");
  const parsed = parseInput(input);

  const expected = 5934;
  const actual = solvePart1(parsed);
  const result = actual === expected;
  console.assert(result, `T1: ${actual} vs the expected: ${expected}`);
  return result;
};

const testPart2 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = 230;
  const actual = solvePart2(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

function main() {
  console.info(`----------------------------------------------------------`);
  console.info(`Running Advent of Code ${problem.year} Day: ${problem.day}`);
  if (!problem.part1Done) {
    if (testPart1()) {
      console.info(`Solution 1: ${part1()}`);
    }
  } else if (!problem.part2Done) {
    testPart2();
    console.info(`Solution 2: ${part2()}`);
  }
}

main();
