import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: false,
  expectedT1: 123,
  expectedT2: 789,
  part1Done: true,
  part2Done: false,
};

const parseInput = (input: string) => {
  return input.split("\n").map(x=>x.split(" "));
  // .filter(l=>l!="");
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

const score:any = { 'X' : 1, 'Y':2,'Z':3};
const score2:any = { 'X' : 0, 'Y':3,'Z':6};
const r:any = { 'A' : { 'X' : 3, 'Y':6,'Z':0}, 'B':{ 'X' : 0, 'Y':3,'Z':6},'C':{ 'X' : 6, 'Y':0,'Z':3}};
const r2:any = { 'A' : { 'X' : 3, 'Y':1,'Z':2}, 'B':{ 'X' : 1, 'Y':2,'Z':3},'C':{ 'X' : 2, 'Y':3,'Z':1}};


const result = (a:any,b:any) => {
  
return r[a][b];
}
const result2 = (a:any,b:any ) =>  r2[a][b];

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  console.info({ len, input });
  let res = input.reduce((a:any,b: [String,any])=>a+ result(...b) + score[b[1]],0);
  //parseInt(gamma.join(""), 2)
  
  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  const len = input[0].length;
  console.info({ len, input });
  let res2 = input.reduce((a:any,b: [String,any])=>a+ result2(...b) + score2[b[1]],0);

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
