import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 10605,
  expectedT2: 2713310158,
  part1Done: 121450,
  part2Done: 28244037010,
};

const testCases = [
  [``, 0],
  [``, 0],
];

const mRegex =
  /Monkey (\d+):\n[\s]+Starting items: (.*)\n[\s]+Operation: (.*)\n[\s]+Test: divisible by (\d+)\n[\s]+If true: throw to monkey (\d+)\n[\s]+If false: throw to monkey (\d+)/;

class Item {
  level: number;
  constructor(level: number) {
    this.level = level;
  }
}
class Monkey {
  id: number;
  items: Item[];
  operation: (x: number) => number;
  test: (x: number) => number;
  inspected = 0;
  div: number;

  constructor(m: string) {
    console.log({ m });
    const match = m.match(mRegex)!;
    console.log(m.match(mRegex));
    m.split("\n");
    this.id = Number(match[1]);
    this.items = match[2]
      .split(",")
      .map(Number)
      .map((x) => new Item(x));
    const op = match[3].replace("new", "res");
    this.operation = (old: number) => {
      let res = old;
      eval(op);
      return res;
    };
    this.div = Number(match[4]);
    this.test = (x: number): number => {
      if (x % Number(match[4]) == 0) {
        return Number(match[5]);
      } else {
        return Number(match[6]);
      }
    };
    console.log(this.items);
  }
}

const parseInput = (input: string) => {
  return input
    .split("\n\n")
    .filter((l) => l != "")
    .map((m) => {
      return new Monkey(m);
    });
};

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < input.length; j++) {
      const monkey = input[j];

      while (monkey.items.length) {
        monkey.inspected++;
        const item = monkey.items.shift();
        item.level = monkey.operation(item.level);
        item.level = Math.floor(item.level / 3);
        const nextMonkey = monkey.test(item.level);
        console.log({ item, nextMonkey });
        input[nextMonkey].items.push(item);
      }
    }
    console.log(i, input[0].items);
  }
  let res = input.map((x: Monkey) => x.inspected);
  res.sort((a: number, b: number) => b - a);
  console.log(res);
  return res[0] * res[1];
}

/* ----------------------------   Part 2  ------------------------------*/

function solvePart2(input: any): number {
  console.info(
    `One ⭐️ to go. Solving part 2. ${problem.year}/12/${problem.day}`
  );

  const lcm = input
    .map((x: Monkey) => x.div)
    .reduce((a: number, b: number) => a * b, 1);
  console.log({ lcm });
  const len = input.length;
  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < input.length; j++) {
      const monkey = input[j];

      while (monkey.items.length) {
        monkey.inspected++;
        const item = monkey.items.shift();
        item.level = monkey.operation(item.level);
        item.level = item.level % lcm;
        const nextMonkey = monkey.test(item.level);
        input[nextMonkey].items.push(item);
      }
    }
    console.log(i);
  }
  let res = input.map((x: Monkey) => x.inspected);
  res.sort((a: number, b: number) => b - a);
  console.log(res);
  return res[0] * res[1];
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
