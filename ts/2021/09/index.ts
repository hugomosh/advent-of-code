import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  part1Done: 1,
  part2Done: false,
};

const part1 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart1(input);
};

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((x) => x != "")
    .map((x) => x.split("").map(Number));
};

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input[0].length;
  //console.info({ len, input });

  let res = 0;
  //parseInt(gamma.join(""), 2)
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (isMinimum(input, i, j)) {
        res += 1 + input[i][j];
      }
    }
  }

  return res;
}

function isMinimum(input: number[][], i: number, j: number) {
  const e = input[i][j];
  return (
    (i != 0 ? e < input[i - 1][j] : true) &&
    (i < input.length - 1 ? e < input[i + 1][j] : true) &&
    (j != 0 ? e < input[i][j - 1] : true) &&
    (j < input[0].length - 1 ? e < input[i][j + 1] : true)
  );
}
function solvePart2(input: any): number {
  const len = input[0].length;
  // console.info({ len, input });

  const basin = new Map<string, number>(),
    visited = new Map<string, string>();

  function visit(i: number, j: number, input: number[][], parentCoords?: string): number {
    if (i < 0 || i == input.length || j < 0 || j == input[0].length) {
      return 0;
    }
    const value = input[i][j];

    if (value == 9) return 0;
    const coords = `${i},${j}`;

    if (parentCoords == null) {
      basin.set(coords, 0);
    }

    parentCoords = parentCoords ?? coords;
    //No visited
    if (visited.has(coords)) {
      return 0;
    } else {
      visited.set(coords, parentCoords);
      basin.set(parentCoords, basin.get(parentCoords)! + 1);
      let size = 1;
      size += visit(i - 1, j, input, parentCoords);
      size += visit(i + 1, j, input, parentCoords);
      size += visit(i, j - 1, input, parentCoords);
      size += visit(i, j + 1, input, parentCoords);
      return size;
    }
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      visit(i, j, input);
    }
  }

  console.log(basin);

  let res2 = Array.from(basin.values())
    .sort((a, b) => b - a)
    .slice(0, 3);
  console.log(res2);
  return res2.reduce((x, a) => x * a, 1);
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

  const expected = 15;
  const actual = solvePart1(parsed);
  const result = actual === expected;
  result ?? console.info("1️⃣✅", actual);
  console.assert(result, `T1: ${actual} vs the expected: ${expected}`);
  return result;
};

const testPart2 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = 1134;
  const actual = solvePart2(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

function main() {
  console.info(`------------------------------------------------------------`);
  console.info(`🎄 Running Advent of Code ${problem.year} Day: ${problem.day}`);
  if (!problem.part1Done) {
    if (testPart1()) {
      console.info(`Solution 1️⃣: ${part1()}`);
    }
  } else if (!problem.part2Done) {
    testPart2();
    // console.info(`Solution 2: ${part2()}`);
  }
}

main();
