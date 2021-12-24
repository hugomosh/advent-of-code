import { match } from "assert";
import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 12521,
  expectedT2: 789,
  part1Done: false,
  part2Done: false,
};
type options = "A" | "B" | "C" | "D";
class Amphipod {
  letter: options;
  constructor(letter: options) {
    this.letter = letter;
  }
}
//.map((x) => x as options);
type Place = {
  isHallway: boolean;
  isFinal: boolean;
  isEntrance: boolean;
  right?: Place;
  left?: Place;
  bottom?: Place;
  up?: Place;
  occupied?: Amphipod;
};

class HallwayGame {
  R1: Place = { isEntrance: false, isHallway: true, isFinal: false };
  R2: Place = { isEntrance: false, isHallway: true, isFinal: false };
  E1: Place = { isEntrance: true, isHallway: true, isFinal: false };
  A1: Place = { isEntrance: false, isHallway: false, isFinal: true };
  A2: Place = { isEntrance: false, isHallway: false, isFinal: true };
  H1: Place = { isEntrance: false, isHallway: true, isFinal: false };
  E2: Place = { isEntrance: true, isHallway: true, isFinal: false };
  B1: Place = { isEntrance: false, isHallway: false, isFinal: true };
  B2: Place = { isEntrance: false, isHallway: false, isFinal: true };
  H2: Place = { isEntrance: false, isHallway: true, isFinal: false };
  E3: Place = { isEntrance: true, isHallway: true, isFinal: false };
  C1: Place = { isEntrance: false, isHallway: false, isFinal: true };
  C2: Place = { isEntrance: false, isHallway: false, isFinal: true };
  H3: Place = { isEntrance: false, isHallway: true, isFinal: false };
  E4: Place = { isEntrance: true, isHallway: true, isFinal: false };
  D1: Place = { isEntrance: false, isHallway: false, isFinal: true };
  D2: Place = { isEntrance: false, isHallway: false, isFinal: true };
  L1: Place = { isEntrance: false, isHallway: true, isFinal: false };
  L2: Place = { isEntrance: false, isHallway: true, isFinal: false };

  // R1,R2,E1,A1,A2,H1,E2,B1,B2,H2,E3,C1,C2,H3,E4,D1,D2,L1,L2,
  constructor(input: string[][]) {
    this.R1.right = this.R2;
    this.R2.left = this.R1;
    this.R2.right = this.E1;
    this.E1.left = this.R2;
    this.E1.bottom = this.A1;
    this.A1.up = this.E1;
    this.A1.bottom = this.A2;
    this.A2.up = this.A1;
    this.E1.right = this.H1;
    this.H1.left = this.E1;
    this.H1.right = this.E2;

    this.E2.left = this.H1;
    this.E2.bottom = this.B1;
    this.B1.up = this.E2;
    this.B1.bottom = this.B2;
    this.B2.up = this.B1;
    this.E2.right = this.H2;
    this.H2.left = this.E2;
    this.H2.right = this.E3;

    this.E3.left = this.H2;
    this.E3.bottom = this.C1;
    this.C1.up = this.E3;
    this.C1.bottom = this.C2;
    this.C2.up = this.C1;
    this.E3.right = this.H3;
    this.H3.left = this.E3;
    this.H3.right = this.E4;

    this.E4.left = this.H3;
    this.E4.bottom = this.D1;
    this.D1.up = this.E4;
    this.D1.bottom = this.D2;
    this.D2.up = this.D1;
    this.E4.right = this.L1;
    this.L1.left = this.E4;
    this.L1.right = this.L2;
    this.L2.left = this.L1;

    const [a1, b1, c1, d1] = input[0],
      [a2, b2, c2, d2] = input[1];
    this.A1.occupied = new Amphipod(a1 as options);
    this.A2.occupied = new Amphipod(a2 as options);
    this.B1.occupied = new Amphipod(b1 as options);
    this.B2.occupied = new Amphipod(b2 as options);
    this.C1.occupied = new Amphipod(c1 as options);
    this.C2.occupied = new Amphipod(c2 as options);
    this.D1.occupied = new Amphipod(d1 as options);
    this.D2.occupied = new Amphipod(d2 as options);
  }
}

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((x) => x != "")
    .slice(2, 4)
    .map((l) => {
      const a = l.match(/([ABCD])/g);
      return a;
    });
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
  console.info({ input });
  const game = new HallwayGame(input);
  let res = 987;
  //parseInt(gamma.join(""), 2)

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
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
