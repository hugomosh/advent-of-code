import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 31,
  expectedT2: 789,
  part1Done: 1,
  part2Done: false,
};

function hex2bin(hex: string) {
  return (parseInt(hex, 16).toString(2)).padStart(4, '0');
}

class Decoder {
  bin: string;
  packages: Package[] = [];
  constructor(bin: string) {
    this.bin = bin;
  }

  decode() {
    let i = 0;
    while (i < this.bin.length) {
      const p = new Package(this.bin, i);
      if (p.isValid) {
        this.packages.push(p);
      }
      i = p.getNextI();
    }
  }

  getVersions(): number[] {
    return this.packages[0].versions;
  }

  solve(): number {
    return this.packages[0].solve();
  }

}


class Package {
  version: number;
  type: number;
  lengthTypeId?: '1' | '0' | undefined;
  length?: number;
  numberSubPackages?: number;
  subPackages: Package[] = [];
  bin: string;
  startI: number;
  nextI: number;
  literal?: number;
  versions: number[] = [];
  isValid = true;

  constructor(bin: string, startI: number) {
    this.bin = bin;
    this.startI = startI;
    let i = startI;
    const vBin = bin.slice(i, i = i + 3);
    const tBin = bin.slice(i, i = i + 3);
    this.version = parseInt(vBin, 2);
    this.type = parseInt(tBin, 2);
    this.nextI = i;
    this.isValid = this.nextI < bin.length;
    console.log({ version: this.version, type: this.type });
    this.handleType(this.type, i);
    this.versions.push(this.version);

  }

  solve(): number {
    switch (this.type) {
      case 4:
        return this.literal ?? 0;
      case 0: //sum
        return this.subPackages.map(s => s.solve()).reduce((a, b) => a + b, 0);
      case 1: //product
        return this.subPackages.map(s => s.solve()).reduce((a, b) => a * b, 1);
      case 2: //minimun
        return Math.min(...this.subPackages.map(s => s.solve()));
      case 3: //max
        return Math.max(...this.subPackages.map(s => s.solve()));
      case 5: //greater than
        const s = this.subPackages.map(s => s.solve());
        return s[0] > s[1] ? 1 : 0;
      case 6: //less than
        const ss = this.subPackages.map(s => s.solve());
        return ss[0] < ss[1] ? 1 : 0;
      case 7: //equals to
        const sss = this.subPackages.map(s => s.solve());
        return sss[0] == sss[1] ? 1 : 0;
      default:
        return 10000;
    }

  }

  handleType(type: number, i: number) {
    switch (type) {
      case 4:
        //Literal
        const [literal, nextI] = this.getLiteral(i);
        this.nextI = nextI;
        console.log({ literal });
        this.literal = literal;
        break;
      default:
        const [operator, nextII] = this.getOperator(i);
        this.nextI = nextII;
        break;
    }
  }

  getLiteral(currenI: number): [number, number] {
    let block = "", value = "", i = currenI;
    do {
      block = this.bin.slice(i, i = i + 5);
      value += block.slice(1);
    } while (block[0] == '1');
    return [parseInt(value, 2), i];
  }

  getOperator(currentI: number): [number, number] {
    let i = currentI, lengthTypeId = this.bin[i++];
    const length = lengthTypeId === '1' ? 11 : 15;
    const L = this.bin.slice(i, i = i + length);
    const LL = parseInt(L, 2);
    if (lengthTypeId === '1') {
      const goal = this.subPackages.length + LL;
      let s = 0;
      while (s < goal) {
        const subP = new Package(this.bin, i);
        s++;
        this.subPackages.push(subP);
        this.versions.push(...subP.versions);
        i = subP.getNextI();

      }
    } else {
      //Length
      const goal = i + LL;
      while (i < goal) {
        const subP = new Package(this.bin, i);
        this.subPackages.push(subP);
        this.versions.push(...subP.versions);
        i = subP.getNextI();
      }
    }
    return [0, i];
  }

  getNextI(): number {
    return this.nextI;
  }
}

const parseInput = (input: string) => {
  return input.split("\n")[0].split("");
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
  const bin = input.map(hex2bin).join("");
  console.info({ input: input.join(""), bin });
  const decoder = new Decoder(bin);
  decoder.decode();
  const versions = decoder.getVersions();
  let res = versions.reduce((a, b) => a + b, 0);
  //parseInt(gamma.join(""), 2)

  return res;
}

/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  const len = input[0].length;
  const bin = input.map(hex2bin).join("");
  console.info({ input: input.join(""), bin });
  const decoder = new Decoder(bin);
  decoder.decode();
  const versions = decoder.getVersions();
  let res = decoder.solve()
  //parseInt(gamma.join(""), 2)

  return res;
}
const testCases = [
  { input: '04005AC33890', expected: [31, 54] },
  { input: 'A0016C880162017C3686B18A3D4780', expected: [31] },
  { input: '8A004A801A8002F478', expected: [16] },
  { input: 'EE00D40C823060', expected: [14] },
  { input: '38006F45291200', expected: [6] },
  { input: 'D2FE28', expected: [6] },
]
const testPart1 = (): boolean => {
  //const input = readTestInputFile(problem.year, problem.day);
  const testCase = testCases[0];
  const input = testCase.input;
  const expected = testCase.expected[0];

  console.assert(input != "" && input.length > 0, "Empty test input part1 !");
  if (input == "") return true; // Skip test and try problem
  console.info("Running test 1");
  const parsed = parseInput(input);

  const actual = solvePart1(parsed);
  const result = actual === expected;
  result
    ? console.info("1️⃣ ✅", actual)
    : console.assert(result, `T1️⃣  ${actual} vs the expected: ${expected}`);
  return result;
};

const testPart2 = () => {
  const testCase = testCases[0];
  const input = testCase.input;
  const expected = testCase.expected[1];
  const parsed = parseInput(input);

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
