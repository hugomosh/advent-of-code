import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 157,
  expectedT2: 70,
  part1Done: 7766,
  part2Done: 2415,
};

const parseInput = (input: string) => {
  return input.split("\n").filter((l) => l != "");
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

  let res = input
    .map((l: String) => {
      const hl = l.slice(l.length / 2);
      for (let i = 0; i < l.length / 2; i++) {
        if (hl.search(l[i]) != -1) {
          return l[i];
        }
      }
    })
    .filter((x: any) => x != undefined);
  console.log(res);
  res = res.map(
    (x: any) =>
      x.charCodeAt(0) +
      (x.toUpperCase() == x ? 27 : 1) -
      (x.toUpperCase() == x ? "A" : "a").charCodeAt(0)
  );
  console.log(res);

  res = res.reduce((a: number, b: number) => a + b, 0);
  //parseInt(gamma.join(""), 2)

  return res;
}
let intersection = (a: any, b: any) => new Set([...a].filter((x) => b.has(x)));
/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): any {
  const len = input.length;
  console.info({ len, input });
  let res2: any[] = [];

  for (let i = 0; i < len ; i = i + 3) {
    console.log(i);

    let l0 = new Set(input[i].split(""));
    let l1 = new Set(input[i + 1].split(""));
    let l2 = new Set(input[i + 2].split(""));
    let r = intersection(intersection(l1, l2), l0);
    res2.push(...r);
  }
  console.log(res2);
  res2 = res2.map(
    (x: any) =>
      x.charCodeAt(0) +
      (x.toUpperCase() == x ? 27 : 1) -
      (x.toUpperCase() == x ? "A" : "a").charCodeAt(0)
  );
  console.log(res2);

  res2 = res2.reduce((a: number, b: number) => a + b, 0);
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

main();
