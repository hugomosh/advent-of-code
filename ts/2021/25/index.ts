import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 58,
  expectedT2: 789,
  part1Done: false,
  part2Done: false,
};

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((l) => l != "")
    .map((l) => l.split(""));
};

function getPreviousIndexFrom(i: number, len: number) {
  if (i < 0 || i == len) {
    throw new Error("out of range");
  }
  if (i == 0) return len - 1;
  return i - 1;
}

function getNextIndexFrom(i: number, len: number) {
  if (i < 0 || i == len) {
    throw new Error("out of range");
  }
  return (i + 1) % len;
}

function printDense(m: any[][]) {
  return m.map((l) => l.join("")).join("\n");
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

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  console.info(printDense(input));

  let prev = "",
    count = 0;
  while (prev != printDense(input)) {
    count++;
    prev = printDense(input);
    input = advance(input);
  }
  function advance(input: string[][]): string[][] {
    const newInput: string[][] = [];
    const rowLen = input.length;
    const colLen = input[0].length;
    for (let i = 0; i < input.length; i++) {
      newInput.push([]);
      const row = input[i];
      for (let j = 0; j < colLen; j++) {
        const c = row[j];
        const prevJ = getPreviousIndexFrom(j, colLen);
        const nextJ = getNextIndexFrom(j, colLen);
        const next = row[nextJ];
        const prev = row[prevJ];

        if (c == "v") {
          newInput[i].push(c);
          continue;
        }
        if (c == "." && prev == ".") {
          newInput[i].push(c);
          continue;
        }
        if (c == "." && prev == ">") {
          newInput[i].push(">");
          continue;
        }
        if (c == ">" && next == ".") {
          newInput[i].push(".");
          continue;
        }
        newInput[i].push(c);
      }
    }
/*     console.info(`------${count}----------`);
    console.info(printDense(newInput)); */
    for (let j = 0; j < colLen; j++) {
      for (let i = 0; i < rowLen; i++) {
        const c = newInput[i][j];
        const prevI = getPreviousIndexFrom(i, rowLen);
        const nextI = getNextIndexFrom(i, rowLen);
        const prev = newInput[prevI][j];
        const next = newInput[nextI][j];
        if (c == ">") {
          input[i][j] = ">";
          continue;
        }
        if (c == "." && prev == ".") {
          input[i][j] = c;
          continue;
        }
        if (c == "." && prev == "v") {
          input[i][j] = "v";
          continue;
        }
        if (c == "v" && next == ".") {
          input[i][j] = ".";
          continue;
        }
        input[i][j] = c;
      }
    }
/*     console.info(`------${count}----------`);
    console.info(printDense(input)); */
    return input;
  }

  let res = count;
  //parseInt(gamma.join(""), 2)

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
