import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 13,
  expectedT2: 140,
  part1Done: 6046,
  part2Done: false,
};

const testCases = [
  [``, 0],
  [``, 0],
];

const parseInput = (input: string) => {
  return input
    .split("\n\n")
    .filter((l) => l != "")
    .map((p) => p.split("\n").map(eval));
};

function wrapInArray(a: any[] | number): any[] {
  if (Number.isInteger(a)) {
    return [a];
  }
  return a as any[];
}

function isRigthOrder(a1: any[], a2: any[]): boolean | null {
  let l = 0,
    r = 0;
  /*   if (a1.length < a2.length) {
    return true;
  } else 
  if (a1.length > a2.length) {
    return false;
  } */

  //Same lenght
  while (l < a1.length && r < a2.length) {
    const e1 = a1[l],
      e2 = a2[r];
    if (Number.isInteger(e1) && Number.isInteger(e2)) {
      if (e1 != e2) {
        return e1 < e2;
      }
    } else {
      const r = isRigthOrder(wrapInArray(e1), wrapInArray(e2));
      if (r != null) {
        return r;
      }
    }
    l++;
    r++;
  }

  if (a1.length == a2.length) {
    return null;
  }

  return a1.length < a2.length;
}

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  console.info({ len, input });
  let c = 0;
  for (let i = 0; i < input.length; i++) {
    const [e0, e1] = input[i];
    const r = isRigthOrder(e0, e1);
    if (r) {
      c += 1 + i;
    }
  }

  let res = c;

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/

function solvePart2(input: any): number {
  console.info(
    `One ⭐️ to go. Solving part 2. ${problem.year}/12/${problem.day}`
  );

  let all = input.flat();
  all.push([[2]], [[6]]);
  console.info({ all, input });
  all = all.sort((a: any, b: any) => {
    switch (isRigthOrder(a, b)) {
      case null:
        return 0;
      case false:
        return 1;
      case true:
        return -1;
    }
  });
  console.log(all);
  const r = all.map((x: any) => JSON.stringify(x));
  const q1 = 1 + r.indexOf("[[2]]");
  const q2 = 1 + r.indexOf("[[6]]");
  console.log(all, q1, q2);

  let res2 = q1 * q2;

  return res2;
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
