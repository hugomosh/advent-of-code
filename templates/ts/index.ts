import getInput, { readTestInputFile } from "../../../utils/getInput";

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
  const len = input[0].length;
  console.log({ len, input });
  let res = 987;
  //parseInt(gamma.join(""), 2)

  return res;
}

function solvePart2(input: any): number {
  const len = input[0].length;
  console.log({ len, input });
  let res2 = 123;

  return res2;
}

const part2 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart2(input);
};

const testPart1 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  console.assert(input != "" && input.length > 0, "Empty test input");
  const parsed = parseInput(input);

  const expected = 198;
  const actual = solvePart1(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

const testPart2 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = 230;
  const actual = solvePart2(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

function main() {
  console.log(`----------------------------------------------------------`);
  console.log(`Running Advent of Code ${problem.year} Day: ${problem.day}`);
  if (!problem.part1Done) {
    testPart1();
    console.log(`Solution 1: ${part1()}`);
  } else if (!problem.part2Done) {
    testPart2();
    console.log(`Solution 2: ${part2()}`);
  }
}

main();
