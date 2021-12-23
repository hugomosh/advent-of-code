import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: 0,
  expectedT1: 590784,
  expectedT2: 2758514936282235,
  part1Done: 1,
  part2Done: false,
};

const parseInput = (input: string) => {
  //on x=-20..26,y=-36..17,z=-47..7
  //  (-?\d+)
  const a = input
    .split("\n")
    .filter((x) => x != "")
    .map((ol) => {
      const [o, l] = ol.split(" ");
      const [x, xx, y, yy, z, zz] = l.match(/(-?\d+)/g) ?? [];
      return [o, ...[x, xx, y, yy, z, zz].map(Number)];
    });

  return a;
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

class Volume {
  volume: number;
  ranges: number[][];
  constructor(...rangesVector: number[]) {
    this.ranges = [];
    let v = 1;
    if (rangesVector.length % 2 != 0) {
      throw new Error("Bad ranges");
    }
    for (let i = 0; i < rangesVector.length; i = i + 2) {
      this.ranges.push([rangesVector[i], rangesVector[i + 1]]);
      v = v * Math.abs(rangesVector[i + 1] + 1 - rangesVector[i]);
    }
    this.volume = v;
  }

  splitCube(a: number[]) {}
}

function getIntersection(a: Volume, b: Volume): null | number[] {
  const intersection = [];
  for (let i = 0; i < a.ranges.length; i++) {
    const [r1, l1] = a.ranges[i];
    const [r2, l2] = b.ranges[i];
    const min = Math.min(l1, l2);
    const max = Math.max(r1, r2);
    if (max > min) {
      return null;
    }
    if (r1 <= r2) {
      intersection.push(r2, min);
    } else {
      intersection.push(r1, min);
    }
  }
  return intersection;
}

// Assumption: the intersection is fully contained in the volume.
// This is r1<=r2 && l2<=l1 for each coordinate.
function getVolumesWithoutIntersection(v: Volume, intersection: Volume | number[]): Volume[] {
  if (!(intersection instanceof Volume)) intersection = new Volume(...intersection);
  const volumes: Volume[] = [],
    // The
    segments: number[][][] = [];
  for (let i = 0; i < v.ranges.length; i++) {
    const [r1, l1] = v.ranges[i];
    const [r2, l2] = intersection.ranges[i];
    segments.push(
      [
        [r1, r2 - 1],
        [r2, l2],
        [l2 + 1, l1],
      ].filter((r) => r[0] <= r[1])
    );
  }
  const intersectionStr = intersection.ranges.join(",");
  for (let i = 0; i < segments[0].length; i++) {
    const xr = segments[0][i];
    for (let j = 0; j < segments[1].length; j++) {
      const yr = segments[1][j];
      for (let k = 0; k < segments[2].length; k++) {
        const zr = segments[2][k];
        const newRange = [...xr, ...yr, ...zr];
        if (newRange.join(",") !== intersectionStr) {
          volumes.push(new Volume(...newRange));
        }
      }
    }
  }
  return volumes;
}

const tests = () => {
  const cube1 = new Volume(-1, 10, -5, 5, -3, 3);
  const cube2 = new Volume(0, 2, -5, 5, -3, 3);
  const cube3 = new Volume(20, 200, 30, 300, 40, 400);
  const cube4 = new Volume(25, 100, -30, 100, 40, 400);

  const i12 = getIntersection(cube1, cube2);
  const i13 = getIntersection(cube1, cube3);
  const i34 = getIntersection(cube3, cube4);
  const i43 = getIntersection(cube4, cube3);
  function testIntersection() {
    console.info("Do tests");

    console.log({ cube1, cube2, cube3 });

    console.log({ i12 });
    console.log({ i13 });
    console.log({ i34, i43 });
  }

  function testVolumesWithoutIntersection() {
    const v12 = getVolumesWithoutIntersection(cube1, i12!);
    const v34 = getVolumesWithoutIntersection(cube3, i34!);
    const v = new Volume(10, 12, 10, 12, 10, 12);
    const t = getVolumesWithoutIntersection(v, [11, 12, 11, 12, 11, 12]);

    console.dir({ t }, { depth: null });
    const tVol = t.reduce((a, t) => t.volume + a, 0);
    console.log(`Vol ${tVol} vs ${v.volume}`);
    console.assert(tVol < v.volume);
  }

  console.assert(1 == new Volume(10, 10, 10, 10, 10, 10).volume, "Volume 1");
  console.assert(2 == new Volume(10, 11, 10, 10, 10, 10).volume, "Volume 2");

  testIntersection();
  testVolumesWithoutIntersection();
};

//tests();

function range(size: number, startAt: number = 0): ReadonlyArray<number> {
  return [...Array(size).keys()].map((i) => i + startAt);
}
function coords(...args: number[]) {
  return args.join(",");
}
function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  let i = 0;
  // const onVolume, offVolume;
  //Add area to onVolume and remove overlapping volume from offVolume;
  //Add area to offVolume;
  let coordsOn: Volume[] = [];
  for (let i = 0; i < input.length; i++) {
    console.log(input);

    const [o, x, xx, y, yy, z, zz] = input[i];
    if (Math.abs(x) > 50) break;
    const c = new Volume(x, xx, y, yy, z, zz);
    console.dir(c, { depth: null });
    // Get intersections with current cubes,
    const newCoordsOn = [];
    for (const v of coordsOn) {
      const inter = getIntersection(v, c);
      if (!inter) {
        newCoordsOn.push(v);
      } else {
        newCoordsOn.push(...getVolumesWithoutIntersection(v, inter));
      }
    }
    if (o == "on") {
      newCoordsOn.push(c);
    }
    console.info(newCoordsOn.reduce((a, v: Volume) => v.volume + a, 0));
    coordsOn = newCoordsOn;
    console.log("----");
  }
  return coordsOn.reduce((a, v: Volume) => v.volume + a, 0);
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  console.info(`Solving part 2. ${problem.year}/12/${problem.day}`);
  let i = 0;
  // const onVolume, offVolume;
  //Add area to onVolume and remove overlapping volume from offVolume;
  //Add area to offVolume;
  let coordsOn: Volume[] = [];
  for (let i = 0; i < input.length; i++) {
    console.log(input);

    const [o, x, xx, y, yy, z, zz] = input[i];
    const c = new Volume(x, xx, y, yy, z, zz);
    console.dir(c, { depth: null });
    // Get intersections with current cubes,
    const newCoordsOn = [];
    for (const v of coordsOn) {
      const inter = getIntersection(v, c);
      if (!inter) {
        newCoordsOn.push(v);
      } else {
        newCoordsOn.push(...getVolumesWithoutIntersection(v, inter));
      }
    }
    if (o == "on") {
      newCoordsOn.push(c);
    }
    console.info(newCoordsOn.reduce((a, v: Volume) => v.volume + a, 0));
    coordsOn = newCoordsOn;
    console.log("----");
  }
  return coordsOn.reduce((a, v: Volume) => v.volume + a, 0);
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
