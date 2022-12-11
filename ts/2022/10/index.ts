import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 13140,
  expectedT2: `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`,
  part1Done: 12540,
  part2Done: `####.####..##..####.####.#....#..#.####.
#....#....#..#....#.#....#....#..#.#....
###..###..#......#..###..#....####.###..
#....#....#.....#...#....#....#..#.#....
#....#....#..#.#....#....#....#..#.#....
#....####..##..####.####.####.#..#.####.`,
};

const testCases = [
  [``, 0],
  [``, 0],
];

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((l) => l != "")
    .map((x) => {
      const [a, b] = x.split(" ");
      return [a, Number(b)];
    });
};

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  console.info({ len, input });
  let x: number = 1;
  let values: number[] = [];
  let c: number = 0;
  for (const [o, v] of input) {
    c++;
    values.push(x);
    switch (o) {
      case "noop":
        break;
      case "addx":
        c++;
        values.push(x);
        x += v;
        break;

      default:
        break;
    }
  }
  console.log(values.join(","));
  let res = values.reduce((a: number, b: number, i: number): number => {
    const j = i + 1;
    if ((j + 20) % 40 == 0) {
      console.log(i, b, j * b);
      return a + j * b;
    }
    return a;
  }, 0);

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/

function solvePart2(input: any): String {
  console.info(
    `One ⭐️ to go. Solving part 2. ${problem.year}/12/${problem.day}`
  );
  const len = input.length;
  console.info({ len, input });
  let x: number = 1;
  let l = 3;
  let values: number[] = [];
  let c: number = 0;
  let res = "";
  for (const [o, v] of input) {
    c++;
    values.push(x);
    switch (o) {
      case "noop":
        break;
      case "addx":
        c++;
        values.push(x);
        x += v;
        break;

      default:
        break;
    }
    if ((c - 1 + 20) % 40 == 0) {
      res += "\n";
    }
  }
  console.log(values.join(","));
  let ress = values.reduce((a: string, b: number, i: number): string => {
    console.log(i, b);
    const j = i + 1;
    let r = a + (Math.abs((i % 40) - b) < 2 ? "#" : " ");
    if (j % 40 == 0) {
      return r + "\n";
    }
    return r;
  }, "");

  return ress;
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
    : console.assert(result, `T2️⃣: \n${actual} vs the expected: \n${expected}`);
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
