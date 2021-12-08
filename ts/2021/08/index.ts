import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  part1Done: true,
  part2Done: false,
};

const part1 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart1(input);
};

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((e) => e != "")
    .map((l) => l.split(" | ").map((x) => x.split(" ")));
};

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input[0].length;
  console.info({ len, input });
  let res = 0;

  for (let i = 0; i < input.length; i++) {
    const element = input[i][1];
    for (let e = 0; e < element.length; e++) {
      const x = element[e];
      const xLen = x.length;
      switch (xLen) {
        case 2:
        case 3:
        case 4:
        case 7:
          res++;
          break;

        default:
          break;
      }
    }
  }
  //parseInt(gamma.join(""), 2)

  return res;
}

/**
 * Is set b a subset of set a
 * @param a set a
 * @param b set b
 * @return is b a subset of a
 */
export function subset<T>(a: Set<T>, b: Set<T>): boolean {
  for (const item of b) {
    if (!a.has(item)) {
      return false;
    }
  }

  return true;
}

/**
 * Does set a and b contain the same elements
 * @param a set a
 * @param b set b
 * @returns is a value equal to b
 */
export function setEqual<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size != b.size) {
    return false;
  }

  return subset(a, b);
}

class Digits {
  guide: string[];
  output: Set<string>[];
  res = new Array(10).fill(1);

  constructor(guide: string[], output: string[]) {
    this.guide = guide;
    this.output = output.map((o) => new Set(o.split("")));
    // console.log({ guide });
    let option069 = [],
      option235 = [];
    for (let g of guide) {
      const a = g.split("");
      switch (g.length) {
        case 2:
          this.res[1] = g;
          break;
        case 3:
          this.res[7] = g;
          break;
        case 4:
          this.res[4] = g;
          break;
        case 7:
          this.res[8] = g;
          break;
        case 6:
          option069.push(g);
          break;

        case 5:
          option235.push(g);
          break;

        default:
          // console.log(g);
          break;
      }
    }

    let s7 = new Set(this.res[7].split(""));

    for (let q = 0; q < option069.length; q++) {
      const car6 = option069[q];
      let sCar6 = new Set(car6.split(""));
      if (difference(s7, sCar6).size == 1) {
        this.res[6] = car6;
        break;
      }
    }

    option069 = option069.filter((x) => x != this.res[6]);

    let s1 = new Set(this.res[1].split(""));
    let s6 = new Set(this.res[6].split(""));
    let Sc = difference(s1, s6);
    const f: string = [...difference(s1, Sc)][0] as string;
    const c: string = [...Sc][0] as string;
    // console.log({ f, c, s6, s1, option235 });
    for (let w = 0; w < option235.length; w++) {
      const element = option235[w];
      if (element.indexOf(c) == -1) {
        // 2
        this.res[5] = element;
      } else if (element.indexOf(f) == -1) {
        this.res[2] = element;
      } else {
        this.res[3] = element;
      }
    }
    const s0o9 = new Set(option069[0].split(""));
    if (difference(s0o9, new Set(this.res[5].split(""))).size == 1) {
      this.res[0] = option069[1];
      this.res[9] = option069[0];
    } else {
      this.res[0] = option069[0];
      this.res[9] = option069[1];
    }

    // console.log(this.res);
    this.res = this.res.map((r) => new Set(r.split("")));

    // S7 intersection with one of option069 => S6 if 2 instead of 3;
  }

  getDigit(output: Set<string>) {
    for (let i = 0; i < this.res.length; i++) {
      if (setEqual(this.res[i], output)) return i;
    }
    return -1;
  }

  digit(): string {
    return `${this.getDigit(this.output[0])}${this.getDigit(this.output[1])}${this.getDigit(
      this.output[2]
    )}${this.getDigit(this.output[3])}`;
  }
}

const difference = <T>(a: Set<T>, b: Set<T>): Set<T> => new Set([...a].filter((x: T) => !b.has(x)));

function solvePart2(input: any): number {
  const len = input[0].length;
  console.info({ len, input });
  let res2 = 0;
  for (let i = 0; i < input.length; i++) {
    const element = new Digits(input[i][0], input[i][1]);
    console.log(element.digit());
    res2 += Number(element.digit());
  }

  return res2;
}

const part2 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart2(input);
};

const testPart1 = (): boolean => {
  const input = readTestInputFile(problem.year, problem.day);
  console.assert(input != "" && input.length > 0, "Empty test input part1 !");
  if (input == "") return true; // Skip test and try problem
  console.info("Running test 1");
  const parsed = parseInput(input);

  const expected = 26;
  const actual = solvePart1(parsed);
  const result = actual === expected;
  result ?? console.info("1️⃣✅", actual);
  console.assert(result, `T1: ${actual} vs the expected: ${expected}`);
  return result;
};

const testPart2 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = 61229;
  const actual = solvePart2(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

function main() {
  console.info(`------------------------------------------------------------`);
  console.info(`🎄 Running Advent of Code ${problem.year} Day: ${problem.day}`);
  if (!problem.part1Done) {
    if (testPart1()) {
      console.info(`Solution 1️⃣: ${part1()}`);
    }
  } else if (!problem.part2Done) {
    testPart2();
    console.info(`Solution 2: ${part2()}`);
  }
}

main();
