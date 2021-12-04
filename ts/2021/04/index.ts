import getInput, { readTestInputFile } from "../../../utils/getInput";

const problem = {
  year: 2021,
  day: 4,
  part1Done: true,
  part2Done: false,
};

type Coordinates = {
  i: number;
  j: number;
  visited: boolean;
};

class BingoBoard {
  board: number[][];
  mapa: Map<number, Coordinates> = new Map();
  lastNumber: number = -1;
  constructor(board: number[][]) {
    this.board = board;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const e = board[i][j];
        this.mapa.set(e, { i, j, visited: false });
      }
    }
  }

  markNumber(number: number) {
    if (this.mapa.has(number)) {
      const r = this.mapa.get(number)!;
      r.visited = true;
      this.mapa.set(number, r);
    }
    this.lastNumber = number;
    // console.log(this.mapa);
  }

  hasWon(): boolean {
    for (let i = 0; i < this.board.length; i++) {
      let hasWonRow = true;
      for (let j = 0; j < this.board.length; j++) {
        const e = this.board[i][j];
        hasWonRow = hasWonRow && this.mapa.get(e)!.visited;
        if (!hasWonRow) {
          break; //skip for
        }
      }
      if (hasWonRow) {
        return true;
      }
    }
    for (let i = 0; i < this.board.length; i++) {
      let hasWonCol = true;
      for (let j = 0; j < this.board.length; j++) {
        const e = this.board[j][i];
        hasWonCol = hasWonCol && this.mapa.get(e)!.visited;
        if (!hasWonCol) {
          break; //skip for
        }
      }
      if (hasWonCol) {
        return true;
      }
    }
    return false;
  }
  /*
sum of all unmarked numbers on that board; in this case, the sum is 188. Then, multiply that sum by the number that was just called
*/
  getScore(): number {
    let res = 0;
    for (let x of this.mapa.entries()) {
      // console.log(x);
      res += !x[1].visited ? x[0] : 0;
    }
    console.log({ l: this.lastNumber, res });

    return res * this.lastNumber;
  }
}

const part1 = () => {
  const parse = getInput(problem.year, problem.day);
  const input = parseInput(parse); // Ready at 9:14 -> 9;19 with parsing corrected
  return solvePart1(input);
};

const parseInput = (input: string) => {
  let res = input.split("\n\n").map((e) => e.split("\n"));

  const bingoNumbers = res[0][0].split(",").map(Number);

  const boards = [];
  for (let i = 1; i < res.length; i++) {
    const element = res[i];

    boards.push(
      element
        .map((s) =>
          s
            .split(/\s{1,2}/)
            .filter((s) => s.length != 0)
            .map((x) => Number(x))
        )
        .filter((x) => x.length != 0)
    );
  }
  return { bingoNumbers, boards };
};

function solvePart1(input: any): number {
  const { bingoNumbers, boards } = input;
  //console.log({ bingoNumbers, boards });
  //console.log(boards);
  const bingos: BingoBoard[] = [];
  for (let i = 0; i < boards.length; i++) {
    const element = new BingoBoard(boards[i]);
    bingos.push(element);
  }
  for (let j = 0; j < bingoNumbers.length; j++) {
    const num = bingoNumbers[j];
    for (let k = 0; k < bingos.length; k++) {
      const element = bingos[k];
      element.markNumber(num);
      if (element.hasWon()) {
        return element.getScore();
      }
    }
  }

  let res = 987;
  //parseInt(gamma.join(""), 2)

  return res;
}

function solvePart2(input: any): number {
  const { bingoNumbers, boards } = input;
  // console.log({ bingoNumbers, boards });
  // console.log(boards);
  let bingos: BingoBoard[] = [];
  let finishedBingos = [];

  for (let i = 0; i < boards.length; i++) {
    const element = new BingoBoard(boards[i]);
    bingos.push(element);
    finishedBingos.push(false);
  }
  let res = 987;
  for (let j = 0; j < bingoNumbers.length; j++) {
    const num = bingoNumbers[j];
    for (let k = 0; k < bingos.length; k++) {
      const element = bingos[k];
      if (!finishedBingos[k]) {
        element.markNumber(num);
        if (element.hasWon()) {
          finishedBingos[k] = true;
          //console.log(finishedBingos, element.getScore());
          if (finishedBingos.reduce((p, c) => p && c, true)) {
            res = element.getScore();
            console.log(finishedBingos, res);

            return res;
          }
        }
      }
    }
  }

  //parseInt(gamma.join(""), 2)

  return res;
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

  const expected = 4512;
  const actual = solvePart1(parsed);
  console.assert(actual === expected, `T1: ${actual} vs the expected: ${expected}`);
};

const testPart2 = () => {
  const input = readTestInputFile(problem.year, problem.day);
  const parsed = parseInput(input);

  const expected = 1924;
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
    testPart2();
    console.log(`Solution 2: ${part2()}`);
  }
}

main();
