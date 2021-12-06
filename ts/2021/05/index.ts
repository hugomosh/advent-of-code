import getInput, { readTestInputFile } from "../../../utils/getInput";

const problem = {
  year: 2021,
  day: 5,
  part1Done: true,
  solution1: 5294,
  part2Done: false,
};

const part1 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart1(input);
};

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((e) => e != "")
    .map((l) => l.split(" -> ").map((s) => s.split(",").map(Number)));
};
const x = (a: [number, number]) => a.join(",");
function solvePart1(input: any): number {
  const len = input[0].length;
  console.log({ len });
  //console.log(input);
  let mapa = new Map<string, number>();
  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    let max, min;
    // Vertical line
    if (element[0][0] == element[1][0]) {
      max = Math.max(element[0][1], element[1][1]);
      min = Math.min(element[0][1], element[1][1]);
      const row = element[0][0];

      for (let i = min; i <= max; i++) {
        if (mapa.has(x([row, i]))) {
          mapa.set(x([row, i]), mapa.get(x([row, i]))! + 1);
        } else {
          mapa.set(x([row, i]), 1);
        }
      }
    }
    // Horizontal line
    if (element[0][1] == element[1][1]) {
      max = Math.max(element[0][0], element[1][0]);
      min = Math.min(element[0][0], element[1][0]);
      const col = element[0][1];
      //console.log(element);

      for (let i = min; i <= max; i++) {
        if (mapa.has(x([i, col]))) {
          mapa.set(x([i, col]), mapa.get(x([i, col]))! + 1);
        } else {
          mapa.set(x([i, col]), 1);
        }
      }
    }
  }

  //console.log(mapa);
  let res = Array.from(mapa.values()).filter((e) => e >= 2);
  //parseInt(gamma.join(""), 2)

  return res.length;
}

function solvePart2(input: any): number {
  const len = input[0].length;
  console.log({ len });
  //console.log(input);
  let mapa = new Map<string, number>();
  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    let max, min;
    // Vertical line
    if (element[0][0] == element[1][0]) {
      max = Math.max(element[0][1], element[1][1]);
      min = Math.min(element[0][1], element[1][1]);
      const row = element[0][0];

      for (let i = min; i <= max; i++) {
        if (mapa.has(x([row, i]))) {
          mapa.set(x([row, i]), mapa.get(x([row, i]))! + 1);
        } else {
          mapa.set(x([row, i]), 1);
        }
      }
    }
    // Horizontal line
    if (element[0][1] == element[1][1]) {
      max = Math.max(element[0][0], element[1][0]);
      min = Math.min(element[0][0], element[1][0]);
      const col = element[0][1];
      //console.log(element);

      for (let i = min; i <= max; i++) {
        if (mapa.has(x([i, col]))) {
          mapa.set(x([i, col]), mapa.get(x([i, col]))! + 1);
        } else {
          mapa.set(x([i, col]), 1);
        }
      }
    }
    //  Diagonal lines
    const orig = element[0];
    const end = element[1];
    const d1 = element[1][0] - element[0][0];
    const d2 = element[1][1] - element[0][1];
    if (Math.abs(d1) == Math.abs(d2)) {
      //4 directions :S !
      console.log(element);

      let direction = [1, 1];
      if (d1 > 0 && d2 > 0) {
        direction = [1, 1];
      } else if (d1 > 0 && d2 < 0) {
        direction = [1, -1];
      } else if (d1 < 0 && d2 > 0) {
        direction = [-1, 1];
      } else if (d1 < 0 && d2 < 0) {
        direction = [-1, -1];
      }

      let step = 0;
      while (
        (end[0] - (orig[0] + step * direction[0])) * direction[0] >= 0 &&
        (end[1] - (orig[1] + step * direction[1])) * direction[1] >= 0
      ) {
        // console.log(end, orig[0] + step * direction[0], orig[1] + step * direction[1]);
        const a = orig[0] + step * direction[0],
          b = orig[1] + step * direction[1];
        if (a < 0 || b < 0) {
          console.log({ a, b, orig, end, step, direction });
        }

        if (mapa.has(x([a, b]))) {
          mapa.set(x([a, b]), mapa.get(x([a, b]))! + 1);
        } else {
          mapa.set(x([a, b]), 1);
        }
        // console.log(end[0] - (orig[0] + step * direction[0]) * direction[0]);
        step++;
      }
    }
  }

  //console.log(mapa);
  let res = Array.from(mapa.values()).filter((e) => e >= 2);
  //parseInt(gamma.join(""), 2)

  return res.length;
}

const part2 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse);
  return solvePart2(input);
};

const testPart1 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  console.assert(input != "" && input.length > 0, "Empty test input");
  const parsed = parseInput(input);

  const expected = 5;
  const actual = solvePart1(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

const testPart2 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = 12;
  const actual = solvePart2(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

function main() {
  console.log(`----------------------------------------------------------`);
  console.log(`Running Advent of Code ${problem.year} Day: ${problem.day}`);
  if (!problem.part1Done) {
    testPart1();
    console.log(`Solution 1: ${part1()}`);
  } else if (!problem.part2Done) {
    //testPart2();
    console.log(`Solution 2: ${part2()}`);
  }
}

main();
