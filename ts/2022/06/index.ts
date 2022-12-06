import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 11,
  expectedT2: 26,
  part1Done: 1034,
  part2Done: 2472,
};

const parseInput = (input: string) => {
  return input.split("\n").filter(l=>l!="")[0];
};

const part1 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart1(input);
};

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  console.info({  input });
  let x = true;
  let i = 0;
  while (x) {
    i++;
    let sub = input.slice(i, i + 4);
    let subSet = new Set(sub);
    x = subSet.size != 4;
    console.log(subSet);
  }

  let res = i + 4;
  //parseInt(gamma.join(""), 2)

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
const part2 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  console.log({input});
  return solvePart2(input);
};

function solvePart2(input: any): number {
  console.info({  input });
  let x = true;
  let i = 0;
  while (x) {
    i++;
    let sub = input.slice(i, i + 14);
    let subSet = new Set(sub);
    x = subSet.size != 14;
  }

  let res = i + 14;

  return res;
}

const testPart1 = (): boolean => {
  const input = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";
  console.assert(input.length > 0, "Empty test input part1 !");
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
  const input = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"
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
