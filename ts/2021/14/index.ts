import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 1588,
  expectedT2: 2188189693529,
  part1Done: 1,
  part2Done: false,
};

const parseInput = (input: string) => {
  let [template, trash, ...rules] = input.split("\n");
  let rules2 = rules.filter(z => z != "").map(x => x.split(" -> "));
  return [template.split(""), rules2];
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

class Node {
  c: string;
  prev: Node | null;
  next: Node | null;

  constructor(c: string) {
    this.c = c;
    this.prev = null;
    this.next = null;
  }
  equals = (a: Node, b: Node) => a.c === b.c;
}

class Polymer {
  count = new Map<string, number>();
  firstPolymer: Node | null = null;
  rules = new Map<string, string>();
  constructor(template: string[], rules: any[]) {

    let prev: Node | null = null;
    for (const t of template) {
      const n = new Node(t);
      if (this.firstPolymer == null) {
        this.firstPolymer = n;
      }
      this.count.set(t, (this.count.get(t) ?? 0) + 1);
      n.prev = prev;
      if (prev != null) {
        prev!.next = n;
      }
      prev = n;
    }

    for (const r of rules) {
      const [ab, newN] = r;
      //const [a, b] = ab.split("");
      this.rules.set(ab, newN);
    }
  }

  expandNextGen() {
    let next: Node | null = this.firstPolymer!.next!;
    let code = [null, this.firstPolymer!.c];
    while (next != null) {
      code.shift();
      code.push(next.c);
      const toInsert = this.rules.get(code.join(""));
      if (toInsert != null) {
        this.instertBetween(next, new Node(toInsert));
        this.count.set(toInsert, (this.count.get(toInsert) ?? 0) + 1);
      }
      next = next!.next;
    }
  }


  instertBetween(b: Node, newNode: Node) {
    const a = b.prev;
    if (a != null) {
      a.next = newNode;
    }
    newNode.prev = a;
    newNode.next = b;
    b.prev = newNode;
  }

  printChain() {
    let next = this.firstPolymer;
    let chain = '';
    while (next != null) {
      chain += next.c;
      next = next.next;
    }
    console.log({ chain });
    return chain;
  }

}

class Polymers {
  count = new Map<string, number>();
  chains = new Map<string, number>();
  rules = new Map<string, [string, string, string]>();
  constructor(template: string[], rules: any[]) {

    let prev: Node | null = null;

    for (let i = 0; i < template.length; i++) {
      const t = template[i];
      this.count.set(t, (this.count.get(t) ?? 0) + 1);
      if (i + 1 < template.length) {
        const chain = t + template[i + 1];
        this.chains.set(chain, (this.chains.get(chain) ?? 0) + 1);
      }
    }

    for (const r of rules) {
      const [ab, newN] = r;
      const [a, b] = ab.split("");
      this.rules.set(ab, [newN, a + newN, newN + b]);
    }
  }

  expandNextGen() {
    //this.count.set(toInsert, (this.count.get(toInsert) ?? 0) + 1);
    const newChains = new Map<string, number>();

    for (const chain of this.chains) {
      const toInsert: [string, string, string] = this.rules.get(chain[0])!;
      this.count.set(toInsert[0], (this.count.get(toInsert[0]) ?? 0) + chain[1]);


      newChains.set(toInsert[1], (newChains.get(toInsert[1]) ?? 0) + chain[1]);
      newChains.set(toInsert[2], (newChains.get(toInsert[2]) ?? 0) + chain[1]);

    }
    this.chains = newChains;
  }

  printChain() {
    console.log(this.chains);
    console.log(this.count);

  }
}

function solvePart1(input: any): number {
  console.info(`Solving part 1. ${problem.year}/12/${problem.day}`);
  const [template, rules] = input;
  console.log({ rules: rules })


  const p = new Polymer(template, rules);
  for (let i = 0; i < 10; i++) {
    p.expandNextGen();
    //p.printChain();

  }

  console.log(p.count);
  const v = [...p.count.values()];

  //parseInt(gamma.join(""), 2)
  let res = Math.max(...v) - Math.min(...v);

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  console.info(`Solving part 2. ${problem.year}/12/${problem.day}`);
  const [template, rules] = input;
  console.log({ rules: rules })


  //const p = new Polymer(template, rules);
  const pp = new Polymers(template, rules);

  for (let i = 0; i < 40; i++) {
    // p.expandNextGen();
    pp.expandNextGen();
    //p.printChain();
    // pp.printChain();

  }

  console.log(pp.count);
  const v = [...pp.count.values()];

  //parseInt(gamma.join(""), 2)
  let res = Math.max(...v) - Math.min(...v);

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
