import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: 1,
  expectedT1: 17,
  expectedT2: 16,
  part1Done: true,
  part2Done: false,
};

const coords = (i: number, j: number) => `${i},${j}`;
const coordNum = (coords: string) => coords.split(",").map(Number);


class Paper1 {
  mapa: Set<string>;
  constructor(input: number[][]) {
    this.mapa = new Set();
    for (let i = 0; i < input.length; i++) {
      const element = input[i];
      this.mapa.add(coords(element[0]!, element[1]!));
    }
  }

  getPoint() {
    return this.mapa.size;
  }
  fold(direction: string, i: number) {
    const d = (direction == 'x') ? 0 : 1,
      dd = (direction == 'x') ? 1 : 0;
    console.log({ direction, i });
    const newMapa = new Set<string>();
    for (let z of this.mapa.values()) {
      const e = coordNum(z);
      let fold = e[d];

      const keep = e[dd];
      if (fold > i) {
        fold = (2 * i) - fold;
        console.assert(fold >= 0, "Nooo!");
        fold >= 0 ? "" : console.log(fold, keep, i, e[d]);
      }
      newMapa.add(coords((direction == 'x') ? fold : keep, (direction == 'x') ? keep : fold));

    }
    this.mapa = newMapa;
  }
  print() {
    const points = []
    for (const x of this.mapa.values()) {
      points.push(coordNum(x));
    }
    const m = Math.max(...points.map(x => x[0])) + 1;
    const n = Math.max(...points.map(x => x[1])) + 1;
    const matriz = Array(n).fill(1).map(z => Array(m).fill('·'));
    for (const z of points) {
      console.log(z);
      matriz[z[1]][z[0]] = '#';
    }
    console.log(matriz.map(z => z.join("")).join("\n"));
    //RHALRCRA
    return points;
  }
}

const parseInput = (input: string) => {
  const [res, instructions] = input.split("\n\n");

  let res2 = res.split("\n").map(l => l.split(",").map(Number));
  console.log(res2);
  let instructions2 = instructions.split("\n").filter(x => x != "").map(l => l.split("=").map((x, i) => {
    if (i == 0) {
      return x[x.length - 1];
    } else {
      return Number(x);
    }
  }));
  console.log(instructions2);

  return [res2, instructions2];
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
  const [points, inst] = input;
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = points[0].length;
  console.info({ len, points });
  const p = new Paper1(points);
  p.fold(inst[0][0], inst[0][1]);

  let res = p.getPoint();
  //parseInt(gamma.join(""), 2)

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  const [points, inst] = input;
  console.info(`Solving part 2. ${problem.year}/12/${problem.day}`);
  const len = points[0].length;
  console.info({ len, points });
  const p = new Paper1(points);
  for (let i = 0; i < inst.length; i++) {
    const element = inst[i];
    console.log(element);
    p.fold(element[0], element[1]);
  }
  console.log(p.mapa);
  console.log(p.print());

  let res = p.getPoint();
  //parseInt(gamma.join(""), 2)

  return res;
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
