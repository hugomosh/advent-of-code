import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: 0,
  expectedT1: 45,
  expectedT2: 112,
  part1Done: false,
  part2Done: false,
};

const parseInput = (input: string) => {
  const l = input.split("\n")[0];
  const [a, x, xx, y, yy] = l.match(/target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/) ?? [];
  return [x, xx, y, yy].map(Number);
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
  const len = input[0].length;
  console.info({ len, input });
  const [x0, x1, y0, y1] = input;

  // Loop n++
  let n = 1;
  const options = new Set();
  let lastValid = 0;
  const maxRangX = [0, 0];
  var optionsCount = 0;
  while (n < 500) {
    const rx = [Math.ceil(x0 / n + ((n - 1) / 2)), Math.floor(x1 / n + ((n - 1) / 2))];

    if (rx[0] >= n) {
      maxRangX[0] = rx[0];
    } else {
      rx[0] = maxRangX[0];
    }
    if (rx[1] >= n) {
      maxRangX[1] = rx[1];
    } else {
      rx[1] = maxRangX[1];
    }
    const ry = [Math.ceil(y0 / n + ((n - 1) / 2)), Math.floor(y1 / n + ((n - 1) / 2))];


    if (ry[0] <= ry[1] && rx[0] <= rx[1]) {
      let height = 0, lastHeight = 0; lastValid = ry[1];
      for (let i = rx[0]; i <= rx[1]; i++) {
        for (let j = ry[0]; j <= ry[1]; j++) {

          options.add(`${i},${j}`);

        }

      }
      while (height >= lastHeight) {
        lastHeight = height;
        height += lastValid--;
      }
      console.log({ n, rx, ry, lastHeight, optionsCount: options.size });

    } else {
      //console.log({ invalid: 1, n, rx, ry });
    }

    n++;

  }
  // If n has valid shots continue

  let res = 987;
  //parseInt(gam.join(""), 2)

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  const len = input[0].length;
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

main();
