import getInput from "../../../utils/getInput";

const part1 = () => {
  const input = getInput(2021, 1)
    .split("\n")
    .map((e) => Number(e));

  return solvePart1(input);
};

function solvePart1(input: any): number {
  let depthIncreases = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      depthIncreases++;
    }
  }
  return depthIncreases;
}

function solvePart2(input: any): number {
  let depthIncreases = 0;
  for (let i = 2; i < input.length; i++) {
    const w0 = input[i - 3] - input[i - 1] - input[i - 2];
    const w1 = input[i] - input[i - 1] - input[i - 2];

    if (w1 > w0) {
      depthIncreases++;
    }
  }
  return depthIncreases;
}

class SubmarineFloor {}

const part2 = () => {
  const input = getInput(2021, 1)
    .split("\n")
    .map((e) => Number(e));

  return solvePart2(input);
};

const testPart1 = () => {
  const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  const expected = 7;
  console.assert(solvePart1(input) === expected);
};

const testPart2 = () => {
  const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  const expected = 5;
  console.assert(solvePart2(input) === expected);
};

testPart1();
testPart2();
console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
