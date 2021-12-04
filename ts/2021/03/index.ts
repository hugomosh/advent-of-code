import { count } from "console";
import getInput, { readTestInputFile } from "../../../utils/getInput";

const problem = {
  year: 2021,
  day: 3,
};

const part1 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  // console.log(input);
  return solvePart1(input);
};

const parseInput = (input: string) => {
  return input.split("\n");
};

function solvePart1(input: any): number {
  const len = input[0].length;
  console.log({ len, input });
  let gamma = [],
    epsilon = [];

  for (let i = 0; i < len; i++) {
    let count1 = 0,
      count0 = 0;
    for (let j = 0; j < input.length; j++) {
      const e = input[j];
      //console.log(e, i, e[i]);
      if (e[i] == "1") {
        count1++;
      } else {
        count0++;
      }
    }
    if (count1 >= count0) {
      gamma.push("1");
      epsilon.push("0");
    } else {
      gamma.push("0");
      epsilon.push("1");
    }
  }

  console.log({ gamma: gamma.join(""), epsilon: epsilon.join("") });
  console.log(parseInt(gamma.join(""), 2), parseInt(epsilon.join(""), 2));
  return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
}

function solvePart2(input: any): number {
  const len = input[0].length;
  console.log({ len, input });

  let oxygen = [...input];
  let carbon = [...input];

  for (let i = 0; i < len; i++) {
    let count1 = 0,
      count0 = 0;
    for (let j = 0; j < oxygen.length; j++) {
      const e = oxygen[j];
      //console.log(e, i, e[i]);
      if (e[i] == "1") {
        count1++;
      } else {
        count0++;
      }
    }
    oxygen = oxygen.filter((x) => x[i] == (count1 >= count0 ? "1" : "0"));
    if (oxygen.length == 1) break;
  }

  for (let i = 0; i < len; i++) {
    let count1 = 0,
      count0 = 0;
    for (let j = 0; j < carbon.length; j++) {
      const e = carbon[j];
      //console.log(e, i, e[i]);
      if (e[i] == "1") {
        count1++;
      } else {
        count0++;
      }
    }
    carbon = carbon.filter((x) => x[i] == (count0 <= count1 ? "0" : "1"));
    if (carbon.length == 1) break;
  }

  console.log({ oxygen, carbon });

  return parseInt(oxygen[0], 2) * parseInt(carbon[0], 2);
}

const part2 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  // console.log(input);
  return solvePart2(input);
};

const testPart1 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = 198;
  const actual = solvePart1(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

const testPart2 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = 230;
  const actual = solvePart2(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

//testPart1();
testPart2();
//console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
