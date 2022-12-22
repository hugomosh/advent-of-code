import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 6032,
  expectedT2: 5031,
  part1Done: 55244,
  part2Done: false,
};

const testCases = [
  [``, 0],
  [``, 0],
];

const parseInput = (input: string) => {
  const [a, b] = input.split("\n\n").filter((l) => l != "");
  const m = a.split("\n").map((l) => l.split(""));
  return [m, b.split(/([RL])/)];
};

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  const m = input[0];
  const ins = input[1];
  console.info({ m, ins });

  let pos: [number, number] = [0, m[0].findIndex((e: any) => e == ".")];
  let cdir = "R"; // T,R,D,L
  let dirs: any = {
    T: [-1, 0],
    R: [0, 1],
    D: [1, 0],
    L: [0, -1],
  };
  let nextDirs: any = {
    T: { R: "R", L: "L" },
    R: { R: "D", L: "T" },
    D: { R: "L", L: "R" },
    L: { R: "T", L: "D" },
  };

  for (let i = 0; i < ins.length; i = i + 2) {
    console.log({ pos });
    const steps = Number(ins[i]);
    const dir = ins[i + 1];
    let j = 0;
    let nextPos: [number, number] = pos;
    while (j < steps) {
      nextPos = [
        (nextPos[0] + dirs[cdir][0] + m.length) % m.length,
        (nextPos[1] + dirs[cdir][1] + m[0].length) % m[0].length,
      ];
      switch (m[nextPos[0]][nextPos[1]]) {
        case "#":
          j = steps;
          break;
        case " ":
          break;
        case ".":
          pos = nextPos;
          console.log(pos);
          j++;
          break;
      }
    }
    if (dir) {
      cdir = nextDirs[cdir][dir];
    }
    console.log({ steps, dir, pos, cdir });
  }
  let w: any = { R: 0, D: 1, L: 2, T: 3 };
  let res = (pos[0] + 1) * 1000 + (pos[1] + 1) * 4 + w[cdir];

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/

function solvePart2(input: any): number {
  console.info(
    `One ⭐️ to go. Solving part 2. ${problem.year}/12/${problem.day}`
  );
  const len = input.length;
  const m = input[0];
  const ins = input[1];
  const size = m.length / 3;
  console.info({ m, ins, size });

  let pos: [number, number] = [0, m[0].findIndex((e: any) => e == ".")];
  let cdir = "R"; // T,R,D,L
  let dirs: any = {
    T: [-1, 0],
    R: [0, 1],
    D: [1, 0],
    L: [0, -1],
  };
  let nextDirs: any = {
    T: { R: "R", L: "L" },
    R: { R: "D", L: "T" },
    D: { R: "L", L: "R" },
    L: { R: "T", L: "D" },
  };

  for (let i = 0; i < ins.length; i = i + 2) {
    //console.log({ pos });
    const steps = Number(ins[i]);
    const dir = ins[i + 1];
    let j = 0;
    let nextPos: [number, number] = pos;
    let changeSide = false;
    while (j < steps) {
      nextPos = [nextPos[0] + dirs[cdir][0], nextPos[1] + dirs[cdir][1]];
      changeSide = true;
      if (nextPos[0] < 0) {
      } else if (nextPos[0] >= m.length) {
        j++;
      } else if (nextPos[1] < 0) {
      } else if (nextPos[1] >= m[0].length) {
        nextPos= 
        j++;
      } else {
        changeSide = false;
      }

      if (changeSide) {
        console.log({ nextPos });
      }
      switch (m[nextPos[0]][nextPos[1]]) {
        case "#":
          j = steps;
          break;
        case " ":
          console.log("o", nextPos, dir);
          //Hitting an edge of the cube :X
          break;
        case ".":
          pos = nextPos;
          console.log(pos);
          j++;
          break;
      }
    }
    if (dir) {
      cdir = nextDirs[cdir][dir];
    }
    console.log({ steps, dir, pos, cdir });
  }
  let w: any = { R: 0, D: 1, L: 2, T: 3 };
  let res = (pos[0] + 1) * 1000 + (pos[1] + 1) * 4 + w[cdir];

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
