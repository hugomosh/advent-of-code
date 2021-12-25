import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: 0,
  expectedT1: 35,
  expectedT2: 3351,
  part1Done: true,
  part2Done: false,
};

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
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input[0].length;
  console.info({ len, input });
  const [enhancment, ...image] = input;
  const neighboards = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  function setCharAt(str: string, index: number, chr: string) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
  }

  const getValidNeighboards = (i: number, j: number, current: string[], charExtra = '.') => {
    let res = "";
    for (const x of neighboards) {
      const ii = i + x[0], jj = j + x[1];
      if (ii >= 0 && jj >= 0 && ii < current.length && jj < current[0].length) {
        res += current[ii][jj];
      } else {
        res += charExtra;
      }
    }
    return res;
  }

  const codeToBin = (code: string): number => {
    return parseInt(code.replace(/#/g, '1').replace(/\./g, '0'), 2);
  }

  let newImage = [], oldImage = image;
  console.log(oldImage.join("\n"));

  for (let k = 0; k < 2; k++) {
    newImage = [];
    for (let i = -3; i < oldImage.length + 3; i++) {
      let newL = '';
      for (let j = -3; j < oldImage[0].length + 3; j++) {
        const code = getValidNeighboards(i, j, oldImage, oldImage[0].charAt(0));
        const index = codeToBin(code);
        //console.log({ i, j, code, index });
        newL += enhancment.charAt(index);
      }
      newImage.push(newL)
    }
    oldImage = newImage;
    console.log("----", k);

    // console.log(newImage.join("\n"));
  }
  let res = newImage.map(l => (l.match(/#/g) || []).length).reduce((a, b) => a + b, 0);
  //parseInt(gamma.join(""), 2)

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input[0].length;
  console.info({ len, input });
  const [enhancment, ...image] = input;
  const neighboards = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  function setCharAt(str: string, index: number, chr: string) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
  }

  const getValidNeighboards = (i: number, j: number, current: string[], charExtra = '.') => {
    let res = "";
    for (const x of neighboards) {
      const ii = i + x[0], jj = j + x[1];
      if (ii >= 0 && jj >= 0 && ii < current.length && jj < current[0].length) {
        res += current[ii][jj];
      } else {
        res += charExtra;
      }
    }
    return res;
  }

  const codeToBin = (code: string): number => {
    return parseInt(code.replace(/#/g, '1').replace(/\./g, '0'), 2);
  }

  let newImage = [], oldImage = image;
  console.log(oldImage.join("\n"));

  for (let k = 0; k < 50; k++) {
    newImage = [];
    for (let i = -3; i < oldImage.length + 3; i++) {
      let newL = '';
      for (let j = -3; j < oldImage[0].length + 3; j++) {
        const code = getValidNeighboards(i, j, oldImage, k % 2 == 0 ? '.' : '#');
        const index = codeToBin(code);
        //console.log({ i, j, code, index });
        newL += enhancment.charAt(index);
      }
      newImage.push(newL)
    }
    oldImage = newImage;
    console.log("----", k);

    //console.log(newImage.join("\n"));
  }
  let res = newImage.map(l => (l.match(/#/g) || []).length).reduce((a, b) => a + b, 0);
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
