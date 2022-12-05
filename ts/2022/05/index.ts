import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: "CMZ",
  expectedT2: "MCD",
  part1Done: "ZSQVCCJLL",
  part2Done: "QZFJRWHGS",
};

const parseInput = (input: string) => {
  let [cargoSt, movesSt] = input.split("\n\n");
  let cargo = cargoSt.split("\n");
  cargo.pop();
  let containers: any[][] = [...Array(9)].map((x) => []);
  cargo.forEach((l) => {
    let i = 0;
    for (let w = 0; w < l.length; w = w + 4) {
      const element = l.slice(w + 1, w + 2);
      if (element != " ") {
        containers[i].push(element);
      }
      i++;
    }
  });
  const myRe = /move (\d+) from (\d+) to (\d+)/;
  const moves = movesSt
    .split("\n")
    .filter((l) => l != "")
    .map((m) => m.match(myRe)?.slice(1, 4).map(Number));
  console.log(JSON.stringify(containers));
  console.log(moves);

  return [containers, moves];
  // .filter(l=>l!="");
};

const part1 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart1(input);
};

function solvePart1(input: any): string {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  const [containers, moves]: [any[][], [number, number, number][]] = input;
  console.log({ containers });

  moves.forEach((m: [number, number, number]) => {
    console.log(m);
    for (let i = 0; i < m[0]; i++) {
      const element = containers[m[1] - 1].shift();
      containers[m[2] - 1].unshift(element);
    }
  });
  console.log({ containers });

  let res = containers.map((l) => l[0]);
  console.log(res.join(""));
  //parseInt(gamma.join(""), 2)

  return res.join("");
}

/* ----------------------------   Part 2  ------------------------------*/
const part2 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart2(input);
};

function solvePart2(input: any): string {
  const len = input.length;
  const [containers, moves]: [any[][], [number, number, number][]] = input;
  console.log({ containers });

  moves.forEach((m: [number, number, number]) => {
    const element = containers[m[1] - 1].splice(0, m[0]);
    containers[m[2] - 1] = [...element, ...containers[m[2] - 1]];
  });
  console.log({ containers });

  let res = containers.map((l) => l[0]);
  console.log(res.join(""));
  //parseInt(gamma.join(""), 2)

  return res.join("");
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
