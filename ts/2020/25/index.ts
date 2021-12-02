import getInput from "../../../utils/getInput";

const problem = {
  year: 2020,
  day: 25,
};

const part1 = () => {
  const input = getInput(problem.year, problem.day)
    .split("\n")
    .map((e) => Number(e));

  return solvePart1(input);
};

function solvePart1(input: any): number {
  let result = 0;

  return result;
}

function solvePart2(input: any): number {
  let result2 = 0;

  return result2;
}

const part2 = () => {
  const input = getInput(2021, 1)
    .split("\n")
    .map((e) => Number(e));

  return solvePart2(input);
};

const testPart1 = () => {
  const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  const expected = 7;
  const actual = solvePart1(input);
  console.assert(actual === expected, `${actual} vs the expected: ${expected}`);
};

const testPart2 = () => {
  const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  const expected = 5;
  const actual = solvePart1(input);
  console.assert(actual === expected, `${actual} vs the expected: ${expected}`);
};

testPart1();
testPart2();
console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
