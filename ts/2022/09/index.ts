import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 13,
  expectedT2: 1,
  part1Done: 6337,
  part2Done: false,
};

const testCases = [
  [``, 0],
  [``, 0],
];

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((l) => l != "")
    .map((l) => {
      const [a, b] = l.split(" ");
      return [a, Number(b)];
    });
};

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  console.info({ len, input });
  const posH: [number, number] = [0, 0];
  let posT: [number, number] = [0, 0];
  const tmap: Set<string> = new Set();
  for (let i = 0; i < input.length; i++) {
    const [d, s] = input[i];
    for (let x = 0; x < s; x++) {
      switch (d) {
        case "R":
          posH[0]++;
          break;
        case "L":
          posH[0]--;

          break;
        case "U":
          posH[1]++;

          break;
        case "D":
          posH[1]--;

          break;

        default:
          break;
      }
      posT = followH(posH, posT);
      tmap.add(posT.join(","));
    }
  }

  let res = 987;

  return tmap.size;
}

/* ----------------------------   Part 2  ------------------------------*/

function solvePart2(input: any): number {
  console.info(
    `One ⭐️ to go. Solving part 2. ${problem.year}/12/${problem.day}`
  );
  const len = input.length;
  console.info({ len, input });
  const posH: [number, number] = [0, 0];
  let posT: [number, number][] = Array(9)
    .fill(null)
    .map(() => [0, 0]);
  console.log(posT);

  const tmap: Set<string> = new Set();
  for (let i = 0; i < input.length; i++) {
    const [d, s] = input[i];
    for (let x = 0; x < s; x++) {
      switch (d) {
        case "R":
          posH[0]++;
          break;
        case "L":
          posH[0]--;

          break;
        case "U":
          posH[1]++;

          break;
        case "D":
          posH[1]--;
          break;
        default:
          break;
      }
      let prev = posH;
      for (let j = 0; j < posT.length; j++) {
        posT[j] = followH(prev, posT[j]);
        prev = posT[j];
      }

      tmap.add(posT[8].join(","));
    } //for
    console.log(posH, posT);
  }
  //console.log(tmap);

  return tmap.size;
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
function followH(
  posH: [number, number],
  posT: [number, number]
): [number, number] {
  const dH = posH[0] - posT[0];
  const dV = posH[1] - posT[1];
  //Diagonal
  if (Math.abs(dH) == 1 && Math.abs(dV) == 1) return [...posT];
  if (Math.abs(dH) == 2 && Math.abs(dV) == 2)
    return [posH[0] - dH / 2, posH[1] - dV / 2];
  if (dV == 0) {
    if (Math.abs(dH) == 2) {
      return [posH[0] - dH / 2, posT[1]];
    }
  } else if (dH == 0) {
    if (Math.abs(dV) == 2) {
      return [posT[0], posH[1] - dV / 2];
    }
  } else if (Math.abs(dV) == 2) {
    if (Math.abs(dH) == 1) {
      return [posT[0] + dH, posT[1] + dV / 2];
    }
  } else if (Math.abs(dH) == 2) {
    if (Math.abs(dV) == 1) {
      return [posT[0] + dH / 2, posT[1] + dV];
    }
  }
  //  console.log({ posH, posT, dH, dV });
  return [...posT];
}
