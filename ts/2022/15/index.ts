import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: false,
  expectedT1: 26,
  expectedT2: 56000011,
  part1Done: 5142231,
  part2Done: false,
};

const testCases = [
  [``, 0],
  [``, 0],
];

const reg =
  /Sensor at x=([-]?\d+), y=([-]?\d+): closest beacon is at x=([-]?\d+), y=([-]?\d+)/;
const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((l) => l != "")
    .map((l) => {
      let x = l.match(reg);
      return x?.slice(1, 5).map(Number);
    });
};
type coord = [number, number];
function manhattan(a: [number, number], b: [number, number]): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  //console.info({ len, input });
  const col = 2000000;
  const m: Set<string> = new Set();
  const beacons: Set<string> = new Set();
  for (const o of input) {
    const s: coord = [o[0], o[1]];
    const b: coord = [o[2], o[3]];
    beacons.add(b.toString());
    const d = manhattan(s, b);
    // console.log(s, b, d);
    let c = 1;

    if (col < s[1] + d || s[1] - d < col) {
      for (let i = 0; i < d * 2; i++) {
        const e: coord = [s[0] - d + i, col];
        const nd = manhattan(s, e);
        if (nd <= d) {
          m.add(e.join(","));
        }
      }
    }
  }
  //console.log(m);
  console.log("m");

  let res = [...m]
    .filter((x) => !beacons.has(x))
    .filter((x) => x.endsWith(`,${col}`));
  res.sort();
  console.log("res");

  return res.length;
}

/* ----------------------------   Part 2  ------------------------------*/

/* Your handheld device indicates that the distress signal is coming from a beacon nearby. 
The distress beacon is not detected by any sensor, but the distress beacon must have x and y coordinates each no lower than 0 and no larger than 4000000.

To isolate the distress beacon's signal, you need to determine its tuning frequency,
 which can be found by multiplying its x coordinate by 4000000 and then adding its y coordinate.

In the example above, the search space is smaller: instead, 
the x and y coordinates can each be at most 20. With this reduced search area, 
there is only a single position that could have a beacon: x=14, y=11. The tuning frequency for this distress beacon is 56000011.
 */
function solvePart2(input: any): number {
  console.info(
    `One ⭐️ to go. Solving part 2. ${problem.year}/12/${problem.day}`
  );
  const signal = 4000000;

  const m: Set<string> = new Set();

  const r = input.map((o: any) => {
    const s: coord = [o[0], o[1]];
    const b: coord = [o[2], o[3]];
    // beacons.add(b.toString());
    const d = manhattan(s, b);
    return [s, b, d];
  });
  console.log(r);
  for (let x = 0; x <= signal; x++) {
    for (let y = 0; y <= signal; y++) {}
  }
  const beacons: Set<string> = new Set();

  // console.log(s, b, d);

  /*   let c = 1;

    for (let j = Math.min(s[1] - d, 0); j <= Math.max(s[1] + d, signal); j++) {
      for (
        let i = Math.min(s[0] - d, 0);
        i <= Math.max(s[0] + d, signal);
        i++
      ) {
        const e: coord = [s[0] - d + i, s[1] - d + j];
        const nd = manhattan(s, e);
        if (nd <= d) {
          m.delete(e.join(","));
        }
      }
    } 
  }*/
  console.log("m");
  console.log(m);

  let res = [...m];
  res.sort();
  console.log("res");

  return res.length;
}

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

/* ----------------------------   Tests   ------------------------------*/

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
