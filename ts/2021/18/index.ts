import { type } from "os";
import path from "path/posix";
import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 4140,
  expectedT2: 3993,
  part1Done: 1,
  part2Done: false,
};


type D = [number | D, number | D];


class SnailFish {
  original: string;
  value: D;
  constructor(original: string) {
    this.original = original;
    this.value = eval(original);
  }

  getMagnitud(): number {
    const mult = [3, 2];
    let m = 0;

    const getM = (v: D | number): number => {
      if (typeof v == "number") return v;
      return mult[0] * getM(v[0]) + mult[1] * getM(v[1]);
    }

    return getM(this.value);
  }

  getVofPath(path: number[]) {
    let v: D | number = this.value;
    for (const i of path) {
      if (typeof v != "number") {
        v = v[i];
      } else {
        //console.log('Not full path');
        return v;
      }
    }
    return v;
  }

  needsExplode(): number[] {
    const que = [
      [1],
      [0],
    ];
    while (que.length > 0) {
      const path = que.pop()!;
      let v: D | number = this.getVofPath(path);
      if (typeof v != "number") {
        if (path.length == 4) {
          return path;
        }
        que.push([...path, 1]);
        que.push([...path, 0]);
      }
    }
    return [];
  }

  replaceV(path: number[], newV: number | D) {
    let v: D | number = this.value;
    for (let i = 0; i < path.length; i++) {
      const element = path[i];
      if (typeof v != "number" && typeof v[element] == "number") {
        v[element] = newV;
        return;
      }

      if (i != path.length - 1) {
        if (typeof v != "number") {
          v = v[element];
        }
        else {
          console.error("No path2");
        }
      } else {
        if (typeof v != "number") {
          v[element] = newV;
        }
        else {
          console.error("No path3");
        }
      }
    }
  }

  getNumberOfV(v: number | D, isLeft?: boolean): number {
    if (typeof v == "number")
      return v;
    return this.getNumberOfV(v[isLeft ? 0 : 1], isLeft);
  }

  explode(t: number[]) {
    let toRigth = (parseInt(t.join(""), 2) + 1);
    if (toRigth < 16) {
      const pathF = toRigth.toString(2).padStart(4, '0').split("").map(Number);
      const vR = this.getVofPath(pathF);
      let valueR = this.getVofPath([...t, 1]);

      if (typeof vR != "number") {
        pathF.push(0);
      }
      this.replaceV(pathF, this.getNumberOfV(vR, true) + this.getNumberOfV(valueR, true));
    }

    let toLeft = (parseInt(t.join(""), 2) - 1);
    if (toLeft >= 0) {
      const pathF = toLeft.toString(2).padStart(4, '0').split("").map(Number);
      const vL = this.getVofPath(pathF);
      let valueL = this.getVofPath([...t, 0]);
      this.replaceV(pathF, this.getNumberOfV(vL, false) + this.getNumberOfV(valueL, false));
    }

    this.replaceV(t, 0);
  }

  split(t: number[]) {
    let v = this.getNumberOfV(this.getVofPath(t));
    const vl = Math.floor(v / 2), vr = Math.ceil(v / 2);
    this.replaceV(t, [vl, vr]);

  }

  needsSplit(): number[] {
    const que = [
      [1],
      [0],
    ];
    while (que.length > 0) {
      const path = que.pop()!;
      let v: D | number = this.getVofPath(path);
      if (typeof v != "number") {
        if (path.length == 4) {
          return path;
        }
        que.push([...path, 1]);
        que.push([...path, 0]);
      } else {
        if (v >= 10) {
          return path;
        }
      }
    }
    return [];
  }

  add(s: SnailFish): SnailFish {
    const ss = new SnailFish(`[${this.toString()},${s.toString()}]`);
    let et = [], es = [];
    do {
      et = ss.needsExplode();
      if (et.length > 0) {
        //console.log({ et });
        ss.explode(et);
        continue;
      }
      es = ss.needsSplit();
      if (es.length > 0) {
        //console.log({ es });
        ss.split(es);
        continue;
      }
    } while (et.length > 0 || es.length > 0);

    return ss;
  }

  toString() {
    const getS = (v: D | number): string => {
      if (typeof v == "number") return `${v}`;
      return `[${getS(v[0])
        },${getS(v[1])}]`;
    }
    return getS(this.value);
  }
}


const testMagnitud = () => {
  console.info("testMagnitud");
  const examples = [
    { s: "[[1,2],[[3,4],5]]", res: 143 },
    { s: "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]", res: 1384 },
    { s: "[[[[1,1],[2,2]],[3,3]],[4,4]]", res: 445 },
    { s: "[[[[3,0],[5,3]],[4,4]],[5,5]]", res: 791 },
    { s: "[[[[5,0],[7,4]],[5,5]],[6,6]]", res: 1137 },
    { s: "[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]", res: 3488 },
  ];
  for (const e of examples) {
    const s = new SnailFish(e.s);
    const actual = s.getMagnitud();
    const res = actual === e.res;
    res ? '' : console.log({ res, actual, s });
  }
}

const testExplode = () => {

  const examples = [
    { s: '[[[[0,[3,2]],[3,3]],[4,4]],[5,5]]', e: '[[[[3,0],[5,3]],[4,4]],[5,5]]' },
    { s: '[[[[[9,8],1],2],3],4]', e: '[[[[0,9],2],3],4]' },
    { s: '[[[[[9,8],[1,2]],2],3],4]', e: '[[[[0,[9,2]],2],3],4]' },
    { s: '[7,[6,[5,[4,[3,2]]]]]', e: '[7,[6,[5,[7,0]]]]' },
    { s: '[[6,[5,[4,[3,2]]]],1]', e: '[[6,[5,[7,0]]],3]' },
    { s: '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]', e: '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]' },
    { s: '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]', e: '[[3,[2,[8,0]]],[9,[5,[7,0]]]]' },
  ];
  for (const e of examples) {
    const s = new SnailFish(e.s);
    const t = s.needsExplode();
    s.explode(t);
    const actual = s.toString();
    const res = actual === e.e;
    res ? '' : console.log({ s, t, ex: e.e, ac: actual });
  }
}
//testExplode();

const testSplit = () => {
  const examples = [
    { s: '[[[[0,7],4],[15,[0,13]]],[1,1]]', e: '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]' },
    { s: '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]', e: '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]' },

  ];
  for (const e of examples) {
    const s = new SnailFish(e.s);
    const t = s.needsSplit();
    s.split(t);
    const actual = s.toString();
    const res = actual === e.e;
    res ? '' : console.log({ s, t, ex: e.e, ac: actual });
  }
}
const parseInput = (input: string) => {
  return input.split("\n").filter(x => x != "");
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
  console.info(`Solving part 1. ${problem.year} / 12 / ${problem.day} `);
  const len = input[0].length;

  console.info({ len, input });
  let currentS: SnailFish | undefined;
  for (let i = 0; i < input.length; i++) {
    const element = input[i];

    const s = new SnailFish(element);
    if (currentS == undefined) {
      currentS = s;
    } else {
      currentS = currentS.add(s);
    }

  }
  let res = currentS!.getMagnitud();
  //parseInt(gamma.join(""), 2)

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  console.info(`Solving part 2. ${problem.year} / 12 / ${problem.day} `);
  const len = input[0].length;

  console.info({ len, input });
  let currentS: SnailFish | undefined, max = 0;
  for (let i = 0; i < input.length; i++) {
    const element = input[i];

    const s = new SnailFish(element);
    for (let j = 0; j < input.length; j++) {
      if (i == j) continue;
      const element = input[j];
      const s2 = new SnailFish(element);
      const m = s.add(s2).getMagnitud();
      if (m > max) {
        max = m;
      }


    }

  }
  //parseInt(gamma.join(""), 2)

  return max;
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
    : console.assert(result, `T1️⃣  ${actual} vs the expected: ${expected} `);
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
    : console.assert(result, `T2️⃣: ${actual} vs the expected: ${expected} `);
  return result;
};

function main() {
  console.info(`------------------------------------------------------------`);
  console.info(`🎄 Running Advent of Code ${problem.year} Day: ${problem.day} `);
  if (!problem.part1Done) {
    if (!problem.doTest || testPart1()) {
      console.info(`Solution 1️⃣: ${part1()} `);
    }
  } else if (!problem.part2Done) {
    if (!problem.doTest || testPart2()) {
      console.info(`Solution 2️⃣: ${part2()} `);
    }
  }
}

main();
