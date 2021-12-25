import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 739785,
  expectedT2: 444356092776315,
  part1Done: 1,
  part2Done: false,
};

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((l) => l != "")
    .map((l) => l.match(/\d+/g)![1])
    .map(Number);
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

  let isPlayer1Turn = true;
  let scores = [0, 0];
  let pos = input;
  let dice = 1;
  let diceRollCount = 0;
  const goal = 1000;
  while (scores[0] < goal && scores[1] < goal) {
    const i = isPlayer1Turn ? 0 : 1;
    pos[i] += dice + (dice + 1) + (dice + 2);
    dice += 3;
    diceRollCount += 3;
    pos[i] = pos[i] % 10;
    pos[i] = pos[i] == 0 ? 10 : pos[i];
    scores[i] += pos[i];
    isPlayer1Turn = !isPlayer1Turn;
  }
  console.log(diceRollCount, scores);

  return scores.filter((x) => x < goal)[0] * diceRollCount;
}
/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  const len = input.length;
  console.info({ len, input });
  let res2 = 123;

  return res2;
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

function getOptionForDie() {
  const faces = [1, 2, 3];
  const options = [],
    frequencies = new Map<number, number>();
  for (const f1 of faces) {
    for (const f2 of faces) {
      for (const f3 of faces) {
        options.push([f1, f2, f3]);
      }
    }
  }
  const sum = options.map((r) => r.reduce((a, b) => a + b, 0));
  console.log(sum);
  for (const o of sum) {
    frequencies.set(o, (frequencies.get(o) ?? 0) + 1);
  }
  console.log({ frequencies });
  return frequencies;
}

getOptionForDie();
main();
