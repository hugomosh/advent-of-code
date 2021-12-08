import getInput, { readTestInputFile } from "../../../utils/getInput";

const problem = {
  year: 2021,
  day: 7,
  part1Done: true,
  part2Done: false,
};

const part1 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart1(input);
};

const parseInput = (input: string) => {
  return input.split("\n")[0].split(",").map(Number);
};

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);

  const len = input[0].length;
  const max = Math.max(...input),
    min = Math.min(...input);

  let minFuel = Infinity;

  let minPos = 0;

  for (let i = min; i < max; i++) {
    let currentFuel = 0;
    for (let j = 0; j < input.length; j++) {
      const element = input[j];
      currentFuel += Math.abs(element - i);
      if (currentFuel >= minFuel) break;
    }
    if (currentFuel < minFuel) {
      minFuel = currentFuel;
      minPos = i;
    }
  }

  console.log({ len, input });
  console.log({ min, max });

  let res = 987;
  //parseInt(gamma.join(""), 2)

  return minFuel;
}

function solvePart2(input: any): number {
  const len = input[0].length;
  const max = Math.max(...input),
    min = Math.min(...input);

  let minFuel = Infinity;

  let minPos = 0;

  for (let i = min; i < max; i++) {
    let currentFuel = 0;
    for (let j = 0; j < input.length; j++) {
      const element = input[j];
      const delta = Math.abs(element - i);
      currentFuel += ((delta + 1) * delta) / 2;
      if (currentFuel >= minFuel) break;
    }
    if (currentFuel < minFuel) {
      minFuel = currentFuel;
      minPos = i;
    }
  }

  console.log({ len, input });
  console.log({ min, max });

  let res = 987;
  //parseInt(gamma.join(""), 2)

  return minFuel;
}

const part2 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart2(input);
};

const testPart1 = (): boolean => {
  const input = readTestInputFile(problem.year, problem.day);
  console.assert(input != "" && input.length > 0, "Empty test input part1 !");
  if (input == "") return true; // Skip test and try problem
  console.info("Running test 1");
  const parsed = parseInput(input);

  const expected = 37;
  const actual = solvePart1(parsed);
  const result = actual === expected;
  console.assert(result, `T1: ${actual} vs the expected: ${expected}`);
  return result;
};

const testPart2 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = 168;
  const actual = solvePart2(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

function main() {
  console.log(`----------------------------------------------------------`);
  console.log(`Running Advent of Code ${problem.year} Day: ${problem.day}`);
  if (!problem.part1Done) {
    if (testPart1()) {
      console.log(`Solution 1: ${part1()}`);
    }
  } else if (!problem.part2Done) {
    testPart2();

    console.log(`Solution 2: ${part2()}`);
  }
}

main();
