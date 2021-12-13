import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 10,
  expectedT2: 36,
  part1Done: true,
  part2Done: false,
};

class Node {
  name: string;
  isStart: boolean;
  isEnd: boolean;
  isMinor: boolean;
  neighboards: Map<string, Node>;

  equals = (a: Node, b: Node) => a.name === b.name;

  constructor(name: string) {
    this.name = name;
    this.isStart = name === 'start';
    this.isEnd = name === 'end';
    this.isMinor = name === name.toLowerCase();
    this.neighboards = new Map();
  }
}

class Caves {
  mapa: Map<string, Node>;
  constructor() {
    this.mapa = new Map;

  }

  initFromInput(input: string[]) {
    for (let line = 0; line < input.length; line++) {
      const [a, b] = input[line].split("-");
      const nodeA = this.mapa.get(a) ?? new Node(a);
      const nodeB = this.mapa.get(b) ?? new Node(b);
      this.mapa.set(nodeA.name, nodeA);
      this.mapa.set(nodeB.name, nodeB);
      this.connectNodes(nodeA, nodeB);
    }
  }

  connectNodes(a: Node, b: Node) {
    a.neighboards.set(b.name, b);
    b.neighboards.set(a.name, a);
  }

  getPossiblePaths() {
    let nodeStart = this.mapa.get('start')!;
    console.assert(nodeStart != null, "No node start!");
    let paths: Node[][] = [];
    paths.push([nodeStart]);
    let possiblePaths: Node[][] = [];

    while (paths.length > 0) {
      const explore: Node[] = paths.pop()!;
      const lastE = explore[explore.length - 1];
      for (const n of lastE.neighboards.values()) {
        if (n.isEnd) {
          possiblePaths.push(explore);
          continue;
        }
        if ((n.isMinor && explore.indexOf(n) == -1) || !n.isMinor) {
          paths.push([...explore, n]);
        }
      }
      //console.log(paths.map(l => l.map(n => n.name)));
    }

    return possiblePaths.length;
  }

  getPossiblePathsTwice() {
    let nodeStart = this.mapa.get('start')!;
    console.assert(nodeStart != null, "No node start!");
    let paths: Node[][] = [];
    paths.push([nodeStart]);
    let possiblePaths: Node[][] = [];

    while (paths.length > 0) {
      const explore: Node[] = paths.pop()!;
      const lastE = explore[explore.length - 1];
      for (const n of lastE.neighboards.values()) {
        if (n.isEnd) {
          possiblePaths.push(explore);
          continue;
        }
        if (n.isStart) {
          continue;
        }
        if (!n.isMinor) {
          paths.push([...explore, n]);
        } else if (n.isMinor) {
          const i = explore.indexOf(n);
          if (i == -1) {
            paths.push([...explore, n]);
          } else {
            const minors = explore.filter(x => x.isMinor);
            // Se repite una vez y no hay otras menores repetidas
            const occurrences = minors.reduce(function (acc: any, curr: Node) {
              return acc[curr.name] ? ++acc[curr.name] : acc[curr.name] = 1, acc
            }, {});
            // console.log(occurrences);
            if (Object.values(occurrences).filter((x: any) => x >= 2).length == 0) {
              paths.push([...explore, n]);
            }
          }
        }
      }
      //console.log(paths.map(l => l.map(n => n.name)));
    }

    return possiblePaths.length;
  }
}

const parseInput = (input: string) => {
  return input.split("\n").filter(l => l != "");
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

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input[0].length;
  console.info({ len, input });
  const cuevas = new Caves();
  cuevas.initFromInput(input);
  let res = cuevas.getPossiblePaths();
  //parseInt(gamma.join(""), 2)

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  const len = input[0].length;
  console.info({ len, input });
  const cuevas = new Caves();
  cuevas.initFromInput(input);
  let res = cuevas.getPossiblePathsTwice();
  //parseInt(gamma.join(""), 2)

  return res;
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
