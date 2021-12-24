import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 123,
  expectedT2: 789,
  part1Done: false,
  part2Done: false,
};

const parseInput = (input: string) => {
  return input.split("\n").filter((x) => x != "");
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

function evaluate(m: number[]): number | [number] | null {
  let w = 0,
    x = 0,
    y = 0,
    z = 0;
  w = m[0];
  x *= 0;
  x += z;
  x = x % 26;
 // z = Math.floor(z / 1);
  x += 13;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 15;
  y *= x;
  z += y;
  w = m[1];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 1);
  x += 13;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 16;
  y *= x;
  z += y;
  w = m[2];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 1);
  x += 10;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 4;
  y *= x;
  z += y;
  w = m[3];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 1);
  x += 15;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 14;
  y *= x;
  z += y;
  w = m[4];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 26);
  x += -8;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 1;
  y *= x;
  z += y;
  w = m[5];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 26);
  x += -10;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 5;
  y *= x;
  z += y;
  w = m[6];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 1);
  x += 11;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 1;
  y *= x;
  z += y;
  w = m[7];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 26);
  x += -3;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 3;
  y *= x;
  z += y;
  w = m[8];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 1);
  x += 14;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 3;
  y *= x;
  z += y;
  w = m[9];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 26);
  x += -4;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 7;
  y *= x;
  z += y;
  w = m[10];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 1);
  x += 14;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 5;
  y *= x;
  z += y;
  w = m[11];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 26);
  x += -5;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 13;
  y *= x;
  z += y;
  w = m[12];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 26);
  x += -8;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 3;
  y *= x;
  z += y;
  w = m[13];
  x *= 0;
  x += z;
  x = x % 26;
  z = Math.floor(z / 26);
  x += -11;
  x = x == w ? 1 : 0;
  x = x == 0 ? 1 : 0;
  y *= 0;
  y += 25;
  y *= x;
  y += 1;
  z *= y;
  y *= 0;
  y += w;
  y += 10;
  y *= x;
  z += y;
  if (z != 0) return [z];
  return z;
  return Number(m.join(""));
}
function readInstructions(input: any[]) {
  const instructions = [];

  let index = 0;
  for (let i = 0; i < input.length; i++) {
    const e = input[i].split(" ");
    const op = e[0];
    //console.log({ i, e, op, variable, second });
    switch (op) {
      case "inp":
        console.log(`${e[1]} = m[${index}];`);
        instructions.push(`${e[1]} = m[${index}]`);
        index = index + 1;
        break;
      case "add":
        console.log(`${e[1]} += ${e[2]};`);
        instructions.push(`${e[1]} += ${e[2]}`);
        break;
      case "mul":
        console.log(`${e[1]} *= ${e[2]};`);
        instructions.push(`${e[1]} *= ${e[2]}`);
        break;
      case "div":
        console.log(`if( ${e[2]} ==0) return null;;`);
        instructions.push(`if( ${e[2]} ==0) return null;`);

        console.log(`${e[1]} =  Math.floor(${e[1]}/${e[2]});`);
        instructions.push(`${e[1]} *=  Math.floor(${e[1]}/${e[2]})`);
        break;
      case "mod":
        // console.log(`if( ${e[1]} < 0 || ${e[2]} <=0) return null;;`);

        console.log(`${e[1]} =  ${e[1]}% ${e[2]};`);
        instructions.push(`${e[1]} =  ${e[1]}% ${e[2]}`);
        break;
      case "eql":
        console.log(`${e[1]} =  ${e[1]} == ${e[2]} ? 1 : 0;`);
        instructions.push(`${e[1]} =  ${e[1]} == ${e[2]} ? 1 : 0`);
        break;
      default:
        break;
    } // Switch
  } //instructions
}
function solvePart1(input: any): any {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  console.info({ len, input });
  const validNumber: number[] = [];
  function isValid(): boolean {
    return true;
  }
  let res;
 // readInstructions(input);
  //return 0;
  for (let k = 99999999687247; k >= 1111111111111; k--) {
    let t = k.toString().split("").map(Number);
    if (k.toString().match(/0/g) != null) {
      continue;
    }
    res = evaluate(t);
    if (res == null) continue;
    if (typeof res === "number") {
      return k;
      return res;
    }
  }
  let min = Infinity;
  while (true) {
    const k = Math.floor(Math.random() * 100000000000000);
    let t = k.toString().split("").map(Number);
    if (k.toString().match(/0/g) != null) {
      continue;
    }
    res = evaluate(t);
    if (res == null) continue;
    if (typeof res === "number") {
      return res;
    } else {
      if (min > res[0]) {
        min = res[0];
        console.log(k, min);
      }
    }
  }
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  const len = input[0].length;
  console.info({ len, input });
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
