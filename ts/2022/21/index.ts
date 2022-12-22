import { isNumber } from "util";
import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: 0,
  expectedT1: 152,
  expectedT2: 301,
  part1Done: 159591692827554,
  part2Done: 3509819803065,
};

const testCases = [
  [``, 0],
  [``, 0],
];

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((l) => l != "")
    .map((x) => x.split(": "));
};

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  const m: Map<string, number> = new Map();
  console.info({ len, input });

  input.forEach(([a, b]: any) => {
    if (!isNaN(b)) {
      m.set(a, Number(b));
    } else {
    }
  });
  const pending = input.filter((x: any) => !m.has(x[0]));
  console.log(pending);

  while (!m.has("root")) {
    const next = pending.shift();

    const [c, o, d] = next[1].split(" ");
    if (m.has(c) && m.has(d)) {
      let cc = m.get(c)!;
      let dd = m.get(d)!;
      let op: number;
      switch (o) {
        case "*":
          op = cc * dd;
          break;
        case "-":
          op = cc - dd;
          break;
        case "+":
          op = cc + dd;
          break;
        case "/":
          op = cc / dd;
          break;

        default:
          break;
      }
      m.set(next[0], op!);
    } else {
      pending.push(next);
    }
  }
  console.log(m);

  let res = m.get("root")!;

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/

function solvePart2(input: any): number {
  console.info(
    `One ⭐️ to go. Solving part 2. ${problem.year}/12/${problem.day}`
  );
  let i = 3509819793200;
  let f = true;
  while (f) {
    //console.log(i);
    i = i + 10;
    const m: Map<string, number> = new Map();
    input.forEach(([a, b]: any) => {
      if (!isNaN(b)) {
        m.set(a, (a == "humn" ? i : 0) + Number(b));
      }
    });

    const pending = input.filter((x: any) => !m.has(x[0]));

    while (!m.has("root")) {
      const next = pending.shift();

      const [c, o, d] = next[1].split(" ");
      let cc = m.get(c)!;
      let dd = m.get(d)!;

      if (m.has(c) && m.has(d)) {
        if (next[0] == "root") {
          if ( cc == dd) {
          f = true;
          return  m.get("humn")!;
          }
          console.log(i, 
            cc,dd, dd-cc);
          
          //     pending.push(next);
        }
        let op: number;
        switch (o) {
          case "*":
            op = cc * dd;
            break;
          case "-":
            op = cc - dd;
            break;
          case "+":
            op = cc + dd;
            break;
          case "/":
            op = cc / dd;
            break;

          default:
            break;
        }
        m.set(next[0], op!);
      } else {
        pending.push(next);
      }
    }
  }

  let res = i;

  return res;
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
