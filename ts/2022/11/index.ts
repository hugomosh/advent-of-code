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

const modularMultiplicativeInverse = (a: bigint, modulus: bigint) => {
  // Calculate current value of a mod modulus
  const b = BigInt(a % modulus);

  // We brute force the search for the smaller hipothesis, as we know that the number must exist between the current given modulus and 1
  for (let hipothesis = 1n; hipothesis <= modulus; hipothesis++) {
    if ((b * hipothesis) % modulus == 1n) return hipothesis;
  }
  // If we do not find it, we return 1
  return 1n;
};

const solveCRT = (remainders: bigint[], modules: bigint[]) => {
  // Multiply all the modulus
  const prod: bigint = modules.reduce((acc: bigint, val) => acc * val, 1n);

  return (
    modules.reduce((sum, mod, index) => {
      // Find the modular multiplicative inverse and calculate the sum
      // SUM( remainder * productOfAllModulus/modulus * MMI ) (mod productOfAllModulus)
      const p = prod / mod;
      return sum + remainders[index] * modularMultiplicativeInverse(p, mod) * p;
    }, 0n) % prod
  );
};

const testCases = [
  [``, 0],
  [``, 0],
];

const mRegex =
  /Monkey (\d+):\n[\s]+Starting items: (.*)\n[\s]+Operation: (.*)\n[\s]+Test: divisible by (\d+)\n[\s]+If true: throw to monkey (\d+)\n[\s]+If false: throw to monkey (\d+)/;

class Item {
  level: bigint;
  constructor(level: number) {
    this.level = BigInt(level);
  }
}
class Monkey {
  id: number;
  items: Item[];
  operation: (x: bigint) => bigint;
  test: (x: bigint) => number;
  inspected = 0;
  div: bigint;

  constructor(m: string) {
    console.log({ m });
    const match = m.match(mRegex)!;
    console.log(m.match(mRegex));
    m.split("\n");
    this.id = Number(match[1]);
    this.div = BigInt(match[4]);
    this.items = match[2]
      .split(",")
      .map(Number)
      .map((x) => new Item(x));
    const op = match[3].replace("new", "res").split(" ");
    console.log({ op });
    this.operation = (old: bigint) => {
      let res = old;
      let second = op[4] == "old" ? res : BigInt(op[4]);
      if (op[3] == "*") {
        res = old * second;
      } else {
        res = old + second;
      }

      return res;
    };
    this.test = (x: bigint): number => {
      if (x % this.div == BigInt(0)) {
        return Number(match[5]);
      } else {
        return Number(match[6]);
      }
    };
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

  const len = input.length;
  /* const mm = solveCRT(
    input.map((x: Monkey) => 0n),
    input.map((x: Monkey) => x.div)
  ); */
  const mm: bigint = input
    .map((x: Monkey) => x.div)
    .reduce((acc: bigint, val: bigint) => acc * val, 1n);
  console.log({ mm });
  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < input.length; j++) {
      const monkey = input[j];

      while (monkey.items.length) {
        monkey.inspected++;
        const item = monkey.items.shift();
        item.level = monkey.operation(item.level);
        item.level = item.level % mm;
        const nextMonkey = monkey.test(item.level);
        input[nextMonkey].items.push(item);
      }
    }
    console.log(
      i,
      input.map((x: Monkey) => x.inspected)
    );
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
