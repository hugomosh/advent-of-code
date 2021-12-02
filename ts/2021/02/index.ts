import getInput, { readTestInputFile } from "../../../utils/getInput";

const problem = {
  year: 2021,
  day: 2,
};

class Submarine {
  depth: number = 0;
  horizontal: number = 0;

  advance(direction: string, amount: number) {
    switch (direction) {
      case "forward":
        this.horizontal += amount;
        break;
      case "down":
        this.depth += amount;

        break;
      case "up":
        this.depth -= amount;

        break;

      default:
        break;
    }
  }

  getPosition() {
    const { depth, horizontal } = this;
    return { depth, horizontal };
  }
}

class Submarine2 {
  depth: number = 0;
  horizontal: number = 0;
  aim = 0;

  advance(direction: string, amount: number) {
    switch (direction) {
      case "forward":
        this.horizontal += amount;
        this.depth += this.aim * amount;
        break;
      case "down":
        //this.depth += amount;
        this.aim += amount;

        break;
      case "up":
        //  this.depth -= amount;
        this.aim -= amount;

        break;

      default:
        break;
    }
  }

  getPosition() {
    const { depth, horizontal } = this;
    return { depth, horizontal };
  }
}

const parseInput = (input: string) => {
  return input.split("\n").map((e) => {
    const t = e.split(" ");
    return [t[0], Number(t[1])];
  });
};

const part1 = () => {
  const input = getInput(problem.year, problem.day);
  const parsed = parseInput(input);

  return solvePart1(parsed);
};

function solvePart1(input: any): number {
  const submarine = new Submarine();
  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    submarine.advance(element[0], element[1]);
  }
  const res = submarine.getPosition();
  console.log(res);
  return res.depth * res.horizontal;
}

function solvePart2(input: any): number {
  const submarine = new Submarine2();
  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    submarine.advance(element[0], element[1]);
  }
  const res = submarine.getPosition();
  console.log(res);
  return res.depth * res.horizontal;
}

const part2 = () => {
  const input = getInput(problem.year, problem.day)
    .split("\n")
    .map((e) => {
      const t = e.split(" ");
      return [t[0], Number(t[1])];
    });

  return solvePart2(input);
};
const testPart1 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = 150;
  const actual = solvePart1(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

const testPart2 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = 900;
  const actual = solvePart2(parsed);
  console.assert(actual === expected, `T2: ${actual} vs the expected: ${expected}`);
};

testPart1();
testPart2();
console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
