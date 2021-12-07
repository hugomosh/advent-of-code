import getInput, { readTestInputFile } from "../../../utils/getInput";

const problem = {
  year: 2021,
  day: 6,
  part1Done: true,
  part2Done: false,
};

const part1 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart1(input);
};

const parseInput = (input: string) => {
  return input.split("\n")[0].split(",").map(Number);
};

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  let len = input.length;
  console.log({ len, input });
  let res = 987;
  for (let i = 0; i < 80; i++) {
    //console.log("day", i, input);

    for (let j = 0; j < len; j++) {
      const element = input[j];
      input[j] -= 1;
      if (input[j] < 0) {
        input[j] = 6;
        input.push(8);
      }
    }
    len = input.length;
  }
  //console.log(input);
  //parseInt(gamma.join(""), 2)

  return input.length;
}

function solvePart2(input: any): number {
  console.info(`Solving part 222. ${problem.year}/12/${problem.day}`);
  let len = input.length;
  console.log({ len, input }); /// I need a better structure

  let cuenta = new Map<number, number>();

  for (let k = 0; k < input.length; k++) {
    const element = input[k];
    cuenta.set(element, 1 + (cuenta.get(element) ?? 0));
  }

  for (let i = 0; i < 256; i++) {
    //console.log("day", i, input);
    const newCuenta = new Map<number, number>();

    for (let [a, b] of cuenta.entries()) {
      //console.log(i, a, b);
      if (a > 0) {
        newCuenta.set(a - 1, cuenta.get(a)!);
      } else {
        newCuenta.set(8, b!);
      }
    }
    newCuenta.set(6, (cuenta.get(0) ?? 0) + (newCuenta.get(6) ?? 0));
    cuenta = newCuenta;
  }
  //console.log(cuenta);
  //parseInt(gamma.join(""), 2)\
  let res = 0;
  for (let y of cuenta.values()) {
    console.log({ y });
    res += y;
  }
  return res;
}

const part2 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart2(input);
};

const testPart1 = (): boolean => {
  const input = readTestInputFile(problem.year, problem.day);
  console.info("test 1");
  console.assert(input != "" && input.length > 0, "Empty test input part1 !");
  if (input == "") return true; // Skip test and try problem
  const parsed = parseInput(input);

  const expected = 5934;
  const actual = solvePart1(parsed);
  const result = actual === expected;
  console.assert(result, `T1: ${actual} vs the expected: ${expected}`);
  return result;
};

const testPart2 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = 26984457539;
  const actual = solvePart2(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

function main() {
  console.log(`----------------------------------------------------------`);
  console.log(`Running Advent of Code ${problem.year} Day: ${problem.day}`);
  if (!problem.part1Done) {
    if (testPart1()) {
      console.log(`Solution 1: ${part1()}`);
    }
  } else if (!problem.part2Done) {
    //testPart2();
    console.log(`Solution 2: ${part2()}`);
  }
}

main();
