import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: 1,
  expectedT1: 79,
  expectedT2: 789,
  part1Done: false,
  part2Done: false,
};

type triplet = [number, number, number];

class Beacon {
  relativePositions: Map<Scanner, triplet> = new Map();
  constructor(s: Scanner, t: triplet) {
    this.relativePositions.set(s, t);
  }
}

function getMagnitud(t1: triplet, t2: triplet) {
  const r = Math.sqrt(
    ((t1[0] - t2[0]) ** 2) +
    ((t1[1] - t2[1]) ** 2) +
    ((t1[2] - t2[2]) ** 2)
  );
  return r;
}

class Scanner {


  name: string; detections: triplet[];
  detections0: triplet[] = [];
  magnitudes: Set<number> = new Set();
  magnitudesMap = new Map();
  isFlippedToMatchS0 = false;
  relativePos?: triplet;
  // beacons: Beacon[];
  constructor(name: string, detections: triplet[]) {
    this.name = name;
    if (name === '--- scanner 0 ---') {
      this.isFlippedToMatchS0 = true;
      this.relativePos = [0, 0, 0];
    }
    this.detections = detections;
    //this.beacons = detections.map(d => new Beacon(this, d));
    this.getMagnitudes();
  }

  getMagnitudes() {
    for (let i = 0; i < this.detections.length; i++) {
      const ei = this.detections[i];
      for (let j = i + 1; j < this.detections.length; j++) {
        const ej = this.detections[j];
        const m = getMagnitud(ei, ej);
        this.magnitudes.add(m)
        if (this.magnitudesMap.has(m)) {
          console.log("Repeted magnitud");
        }
        this.magnitudesMap.set(m, [i, j]);
      }
    }
  }

  equals = (a: Scanner, b: Scanner) => a.name === b.name;

  orientateRelativeToS0(pos: triplet, sign: triplet) {
    this.detections0 = this.detections
      .map(d => (d.map((x, i) => x * sign[i]) as triplet))
      .map(d => (pos.map(p => d[p]) as triplet))
  }

  updateWithD0(delta0: triplet) {
    this.isFlippedToMatchS0 = true;
    this.relativePos = delta0; //diff([0, 0, 0], delta0) as triplet;
    this.detections0 = this.detections
      .map(d => diff(d, delta0) as triplet);
  }
}

const parseInput = (input: string) => {
  return input.split("\n\n")
    .map(scanner => scanner.split("\n"));
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

function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter(x => b.has(x)));
}

// |a-b|_i
const deltas = (a: triplet, b: triplet): number[] => {
  return (a.map((x, i) => Math.abs(x - b[i])));
}

//a-b
const diff = (a: triplet, b: triplet): number[] => {
  return (a.map((x, i) => (x - b[i])));
}
const equal = (a: triplet | number[], b: triplet | number[]): boolean => {
  return (a.map((x, i) => (x === b[i]))).reduce((ta, tb) => ta && tb, true);
}
function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const scanners: Scanner[] = [];
  const intersections: { inter: Set<number>, s1: Scanner, s2: Scanner }[] = [];
  for (const s of input) {
    const name = s[0];
    const detections: triplet[] = [];
    for (let i = 1; i < s.length; i++) {
      const element: triplet = s[i].split(",").map(Number);
      detections.push(element);
    }
    const scanner = new Scanner(name, detections);
    for (let i = 0; i < scanners.length; i++) {
      const s1 = scanners[i];
      const inter = intersection(scanner.magnitudes, s1.magnitudes);
      if (inter.size >= 0) {
        // Handshakes 12 -> 66 
        // Handshakes 6 -> 15
        // Handshakes n -> n*(n-1)/2
        intersections.push({ inter, s1, s2: scanner });
        console.log({ inter: inter.size, name, s1: s1.name });
      }
    }
    scanners.push(scanner);
  }
  intersections.sort((x, y) => x.s1.name.localeCompare(y.s1.name));

  const visited = new Set(), beacons = new Set();
  while (intersections.length > 0) {
    const { s1, s2, inter } = intersections.shift()!;
    // It has 12 points in common
    if (inter.size >= 66) {
      let s0: Scanner, sR: Scanner;
      // Obtain Scanner position relative to s0 
      if (s1.isFlippedToMatchS0) {
        s0 = s1; sR = s2;
      } else if (s2.isFlippedToMatchS0) {
        s0 = s2; sR = s1;
      } else {
        // If no information progagated with s0 send to que
        console.log("No S0")!;
        intersections.push({ s1, s2, inter });
        continue;
      }

      const values = [...inter.values()];
      const m0 = values[0];

      const indeces0 = s0.magnitudesMap.get(m0);
      const indicesR = sR.magnitudesMap.get(m0);

      // Get the 2 points foreach set that cause a matching magnitud.
      const [s0point1, s0point2] = [s0.detections[indeces0[0]], s0.detections[indeces0[1]]].sort((a, b) => a[0] - b[0]);
      let [sRpoint1, sRpoint2] = [sR.detections[indicesR[0]], sR.detections[indicesR[1]]].sort((a, b) => a[0] - b[0]);
      let d1 = diff(s0point1, s0point2),
        d2 = diff(sRpoint1, sRpoint2);
      console.log({ sRpoint1, sRpoint2, d1, d2 });

      const transform = [d2.indexOf(d1[0]), d2.indexOf(d1[1]), d2.indexOf(d1[2])];
      const pos = (transform.map((x, i) => x != -1 ? x : (d2.indexOf(-1 * d1[i]))) as triplet);
      const sign = transform.map((x, i) => Math.sign(transform[pos.indexOf(i)] + 0.5));
      console.log({ pos, sign, transform });
      sR.orientateRelativeToS0(pos, sign as triplet);
      // Align the beacon to match the s0 orientation

      // Align the coordinates system (a,b,c) -> (x,y,z)
      // Algin the directions (-a,b,c) -> (x,y,z)

      //Verify 
      [sRpoint1, sRpoint2] = [sR.detections[indicesR[0]], sR.detections[indicesR[1]]].sort((a, b) => a[0] - b[0]);
      let delta0 = diff(s0point1, sRpoint1);
      console.log({ sRpoint1, sRpoint2, delta0, delta1: diff(s0point1, sRpoint2) });

      if (!isNaN(delta0[0]) && !equal(diff(s0point1, sRpoint1), diff(s0point2, sRpoint2))) {
        delta0 = diff(s0point1, sRpoint2);
      }

      sR.updateWithD0(delta0 as triplet);

      console.log("------------------");

      // Because there are no repetead magnitud it should help identify the orientation
      if (!visited.has(s0.name)) {
        s0.detections0.sort((a, b) => a[0] - b[0]).forEach(d => beacons.add(d.join(",")));
        visited.add(s0.name);
      }
      if (!visited.has(s1.name)) {
        sR.detections0.sort((a, b) => a[0] - b[0]).forEach(d => beacons.add(d.join(",")));
        visited.add(s1.name);
      }


      // Register all Beacons   console.log(...beacons.values());
    }


  }


  let res = beacons.size;
  console.log(beacons);
  //parseInt(gamma.join(""), 2)
  return res;
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
