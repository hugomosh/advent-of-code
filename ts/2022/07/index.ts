import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 95437,
  expectedT2: 24933642,
  part1Done: 1644735,
  part2Done: false,
};

const testCases = [
  [``, 0],
  [``, 0],
];

const parseInput = (input: string) => {
  return input.split("\n").filter((l) => l != "");
};

class Folder {
  path: string = "";
  files: Map<string, number> = new Map();
  parent?: Folder;
  children: Set<Folder> = new Set();
  size: number = 0;
  fullSize?: number;
  constructor(path: string) {
    this.path = path;
  }
}

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  console.info({ len, input });
  const folders: Map<string, Folder> = new Map();
  function getSize(f?: Folder): number {
    if (f == undefined) {
      return 0;
    }
    if (f.fullSize == null) {
      f.fullSize =
        f.size +
        Array.from(f.children.values()).reduce((a, c) => a + getSize(c), 0);
    }
    return f?.fullSize! ?? 0;
  }
  let currentPath: Folder | undefined;
  let ls = false;
  for (let i = 0; i < input.length; i++) {
    const [s, e, d] = input[i].split(" ");
    //console.log({ s, e, d });
    if (s == "$") {
      ls = false;
    }

    if (ls) {
      const fullPath = currentPath?.path + "/" + e;
      switch (s) {
        case "dir":
          const dir = folders.has(currentPath?.path + "/" + e)
            ? folders.get(currentPath?.path + "/" + e)
            : new Folder(currentPath?.path + "/" + e);
          folders.set(fullPath, dir!);
          if (fullPath == currentPath?.path) {
            console.warn({ currentPath });
          }
          currentPath!.children.add(dir!);
          break;
        default:
          let size = Number(s);
          currentPath!.files.set(e, size);
          currentPath!.size += size;
          break;
      }
    }
    const fullPath = (currentPath?.path ?? "") + "/" + d;
    switch (e) {
      case "cd":
        if (d == "..") {
          currentPath = currentPath!.parent!;
        } else {
          const dir = folders.has(fullPath)
            ? folders.get(fullPath)
            : new Folder(fullPath);
          folders.set(fullPath, dir!);
          dir!.parent = currentPath;
          currentPath = dir!;
        }
        break;
      case "ls":
        ls = true;
        break;

      default:
        break;
    }
  }

  const f = folders.get("//");
  let q = [f];
  let visited = new Set("/");
  while (q.length) {
    const c = q.shift();
    if (visited.has(c!.path)) {
      console.log(c, getSize(c));
    }
    visited.add(c?.path!);
    console.log(c?.path, getSize(c), c?.size);
    q.unshift(...c!.children);
  }

  let res = Array.from(folders.values())
    //.filter((f) => f.size >= 100000)
    .map(getSize);
  //1046278

  return res.filter((s) => s <= 100000).reduce((a, b) => a + b, 0);
}
/* ----------------------------   Part 2  ------------------------------*/

function solvePart2(input: any): number {
  console.info(`Solving part 2. ${problem.year}/12/${problem.day}`);
  const len = input.length;
  console.info({ len, input });
  const folders: Map<string, Folder> = new Map();
  function getSize(f?: Folder): number {
    if (f == undefined) {
      return 0;
    }
    if (f.fullSize == null) {
      f.fullSize =
        f.size +
        Array.from(f.children.values()).reduce((a, c) => a + getSize(c), 0);
    }
    return f?.fullSize! ?? 0;
  }
  let currentPath: Folder | undefined;
  let ls = false;
  for (let i = 0; i < input.length; i++) {
    const [s, e, d] = input[i].split(" ");
    //console.log({ s, e, d });
    if (s == "$") {
      ls = false;
    }

    if (ls) {
      const fullPath = currentPath?.path + "/" + e;
      switch (s) {
        case "dir":
          const dir = folders.has(currentPath?.path + "/" + e)
            ? folders.get(currentPath?.path + "/" + e)
            : new Folder(currentPath?.path + "/" + e);
          folders.set(fullPath, dir!);
          if (fullPath == currentPath?.path) {
            console.warn({ currentPath });
          }
          currentPath!.children.add(dir!);
          break;
        default:
          let size = Number(s);
          currentPath!.files.set(e, size);
          currentPath!.size += size;
          break;
      }
    }
    const fullPath = (currentPath?.path ?? "") + "/" + d;
    switch (e) {
      case "cd":
        if (d == "..") {
          currentPath = currentPath!.parent!;
        } else {
          const dir = folders.has(fullPath)
            ? folders.get(fullPath)
            : new Folder(fullPath);
          folders.set(fullPath, dir!);
          dir!.parent = currentPath;
          currentPath = dir!;
        }
        break;
      case "ls":
        ls = true;
        break;

      default:
        break;
    }
  }

  const f = folders.get("//");

  const o = 70000000;
  const objective = 30000000 - (o - getSize(f));
  console.log({ o, objective, f });

  let res = Array.from(folders.values())
    //.filter((f) => f.size >= 100000)
    .map(getSize);
  res.sort((a, b) => a - b);

  //1046278
  console.log(JSON.stringify(res));
  // Not 41272621
  return res.filter((s) => s >= objective)[0];
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
