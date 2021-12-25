import { type } from "os";
import getInput, { readTestInputFile } from "../../../utils/getInput";
import { coordsToString } from "../../../utils/matrix";
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
        //console.log({ inter: inter.size, name, s1: s1.name });
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
      let s0: Scanner, sN: Scanner;
      // Obtain Scanner position relative to s0 
      if (s1.isFlippedToMatchS0) {
        s0 = s1; sN = s2;
      } else if (s2.isFlippedToMatchS0) {
        s0 = s2; sN = s1;
      } else {
        // If no information progagated with s0 send to que
        console.log("No S0")!;
        intersections.push({ s1, s2, inter });
        continue;
      }
      console.log({ s0: s0.name, sN: sN.name });

      const values = [...inter.values()];
      const commonPointsS0 = new Map();
      let i = 0;

      // This will get the 12 point and their coresponding number
      while (commonPointsS0.size < 12 || [...commonPointsS0.values()].filter(x => x.match).length < 12) {
        const magnitud = values[i];
        const indeces0 = s0.magnitudesMap.get(magnitud);
        const indicesN = sN.magnitudesMap.get(magnitud);
        // Get the 2 points foreach set that cause a matching magnitud.
        const [s0point1, s0point2] = [s0.detections[indeces0[0]], s0.detections[indeces0[1]]];
        let [sNpoint1, sNpoint2] = [sN.detections[indicesN[0]], sN.detections[indicesN[1]]];
        /*        console.log({
                 s0point1, s0point2, sNpoint1, sNpoint2
               }) */
        // Add poinst to list with options or with the match if it is available 
        commonPointsS0.set(coordsToString(s0point1),
          getOptionsOrMatch(s0point1, [sNpoint1, sNpoint2], commonPointsS0)
        );
        commonPointsS0.set(coordsToString(s0point2),
          getOptionsOrMatch(s0point2, [sNpoint1, sNpoint2], commonPointsS0)
        );
        i++;
      }
      console.log(new Array(30).fill("-").join(""));

      console.log(commonPointsS0);
      sN.isFlippedToMatchS0 = true;
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

type PointMatchFinder = { options?: Set<string>, match?: string };

function getOptionsOrMatch(
  point: triplet, possiblePoints: [triplet, triplet], commonPoints: Map<any, PointMatchFinder>): PointMatchFinder {
  if (commonPoints.has(coordsToString(point))) {
    const { options, match } = commonPoints.get(coordsToString(point))!;
    if (match) return { match };
    if (!options) throw new Error(`N options for ${coordsToString(point)}`);
    const newMatch =
      options.has(coordsToString(possiblePoints[0]!))
        ? coordsToString(possiblePoints[0]!) :
        options.has(coordsToString(possiblePoints[1]!)) ? coordsToString(possiblePoints[1]!) : undefined;
    console.assert(newMatch, `No match for ${coordsToString(point)}`);
    return { match: newMatch };
  } else {
    return { options: new Set(possiblePoints.map(coordsToString)) }
  }
}