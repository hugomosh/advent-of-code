import { isPrimitive } from "util";
import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 24,
  expectedT2: 93,
  part1Done: 692,
  part2Done: 31706,
};

const testCases = [
  [``, 0],
  [``, 0],
];

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((l) => l != "")
    .map((l) => l.split(" -> ").map((x) => x.split(",").map(Number)));
};

class Coords {
  x: number;
  y: number;
  constructor(a: [number, number]) {
    this.x = a[0];
    this.y = a[1];
  }

  toString = () => {
    return `${this.x},${this.y}`;
  };

  next = () => {};
}

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  console.info({ len, input });
  const m: Set<string> = new Set();
  let max = 0;
  for (const l of input) {
    let prev: Coords | null = null;
    for (const p of l) {
      const e = new Coords(p);
      max = Math.max(max, e.y);
      m.add(e.toString());
      if (prev != null) {
        let c = 0;
        if (e.y == prev.y) {
          c = prev.x;
          while (c != e.x) {
            c = c + Math.sign(e.x - prev.x);

            m.add(new Coords([c, e.y]).toString());
          }
        } else {
          c = prev.y;
          while (c != e.y) {
            c = c + Math.sign(e.y - prev.y);
            m.add(new Coords([e.x, c]).toString());
            max = Math.max(max, c);
          }
        }
      }
      prev = e;
    }
  }
  console.log(m, max);

  // Fall sand = DFS?

  const sand: Set<string> = new Set();
  const sq: Coords[] = [];
  sq.push(new Coords([500, 0]));
  let i = 0;
  let prev = sq[0];
  let next: Coords = prev;
  while (prev.y <= max) {
    next = new Coords([prev.x, prev.y + 1]);
    sq.push(next);
    const ns = next.toString();
    console.log(i, ns);
    if (m.has(ns) || sand.has(ns)) {
      //Left
      const left = new Coords([prev.x - 1, prev.y + 1]);
      if (m.has(left.toString()) || sand.has(left.toString())) {
        const right = new Coords([prev.x + 1, prev.y + 1]);
        if (m.has(right.toString()) || sand.has(right.toString())) {
          sand.add(prev.toString());
          prev = sq[0];
          continue;
        } else {
          next = right;
        }
      } else {
        next = left;
      }
    }
    prev = next;

    i++;
  }

  console.log(sand);

  let res = sand.size;

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/

function solvePart2(input: any): number {
  console.info(
    `One ⭐️ to go. Solving part 2. ${problem.year}/12/${problem.day}`
  );

  const len = input.length;
  console.info({ len, input });
  const m: Set<string> = new Set();
  let max = 0;
  for (const l of input) {
    let prev: Coords | null = null;
    for (const p of l) {
      const e = new Coords(p);
      max = Math.max(max, e.y);
      m.add(e.toString());
      if (prev != null) {
        let c = 0;
        if (e.y == prev.y) {
          c = prev.x;
          while (c != e.x) {
            c = c + Math.sign(e.x - prev.x);

            m.add(new Coords([c, e.y]).toString());
          }
        } else {
          c = prev.y;
          while (c != e.y) {
            c = c + Math.sign(e.y - prev.y);
            m.add(new Coords([e.x, c]).toString());
            max = Math.max(max, c);
          }
        }
      }
      prev = e;
    }
  }
  console.log(m, max);

  // Fall sand = DFS?

  const sand: Set<string> = new Set();
  const sq: Coords[] = [];
  sq.push(new Coords([500, 0]));
  let i = 0;
  let prev = sq[0];
  let next: Coords = prev;
  while (!sand.has(sq[0].toString())) {
    next = new Coords([prev.x, prev.y + 1]);
    sq.push(next);
    const ns = next.toString();
    //console.log(i, ns);
    if (m.has(ns) || sand.has(ns) || next.y == max + 2) {
      //Left
      const left = new Coords([prev.x - 1, prev.y + 1]);
      if (
        m.has(left.toString()) ||
        sand.has(left.toString()) ||
        next.y == max + 2
      ) {
        const right = new Coords([prev.x + 1, prev.y + 1]);
        if (
          m.has(right.toString()) ||
          sand.has(right.toString()) ||
          next.y == max + 2
        ) {
          sand.add(prev.toString());
          prev = sq[0];
          continue;
        } else {
          next = right;
        }
      } else {
        next = left;
      }
    }
    prev = next;

    i++;
  }

  console.log(sand);

  let res = sand.size;

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
