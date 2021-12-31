import getInput, { readTestInputFile } from "../../../utils/getInput";
import { config } from "./config";

const problem = {
  year: config.year,
  day: config.day,
  doTest: true,
  expectedT1: 739785,
  expectedT2: 444356092776315,
  part1Done: 1,
  part2Done: false,
};

const parseInput = (input: string) => {
  return input
    .split("\n")
    .filter((l) => l != "")
    .map((l) => l.match(/\d+/g)![1])
    .map(Number);
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

  let isPlayer1Turn = true;
  let scores = [0, 0];
  let pos = input;
  let dice = 1;
  let diceRollCount = 0;
  const goal = 1000;
  while (scores[0] < goal && scores[1] < goal) {
    const i = isPlayer1Turn ? 0 : 1;
    pos[i] += dice + (dice + 1) + (dice + 2);
    dice += 3;
    diceRollCount += 3;
    pos[i] = pos[i] % 10;
    pos[i] = pos[i] == 0 ? 10 : pos[i];
    scores[i] += pos[i];
    isPlayer1Turn = !isPlayer1Turn;
  }
  console.log(diceRollCount, scores);

  return scores.filter((x) => x < goal)[0] * diceRollCount;
}
/* ----------------------------   Part 2  ------------------------------*/
function solvePart2(input: any): number {
  const len = input.length;
  console.info({ len, input });

  let winsP1 = 0,
    winsP2 = 0;
  // const p1Games = numberOfTurnsToWinBothPlayers(input[0], input[1], 0, 0);

  const que: number[][] = [];
  const res = [];
  // pos, score, turn, count
  que.push([input[0], input[1], 0, 0, 1, 1]);
  while (que.length > 0) {
    const [p1, p2, s1, s2, t, v] = que.pop() as number[];
    const nextTurn = t + 1;
    let p, s;
    if (t % 2 === 1) {
      //Player 1
      p = p1;
      s = s1;
    } else {
      // Player 2
      p = p2;
      s = s2;
    }

    for (const [k, f] of frequencies.entries()) {
      let newP = p + k;
      newP = newP % 10;
      newP = newP == 0 ? 10 : newP;
      const newScore = s + newP;

      if (t % 2 === 1) {
        // Player 1
        if (newScore >= 21) {
          winsP1 += v * f;
          //console.log(newP, newScore, nextTurn, v * f);
        } else {
          que.push([newP, p2, newScore, s2, nextTurn, v * f]);
        }
      } else {
        // Player 2
        if (newScore >= 21) {
          winsP2 += v * f;
          //console.log(newP, newScore, nextTurn, v * f);
        } else {
          que.push([p1, newP, s1, newScore, nextTurn, v * f]);
        }
      }
    }
  }

  let res2 = Math.max(winsP1, winsP2);

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
/* const positions = new Map();

const getNewPosition(pos:number,amount:number){
  positions.get(pos)
}

 */
// Turns it will take to reach a goal score of 21. Key is the number of games. Value is the number of universes.

function numberOfTurnsToWinBothPlayers(
  position1: number,
  position2: number,
  score1: number,
  score2: number
): number[][] {
  // const turns = new Map();

  const que: number[][] = [];
  const res = [];
  // pos, score, turn, count
  que.push([position1, position2, score1, score2, 1, 1]);
  while (que.length > 0) {
    const [p1, p2, s1, s2, t, v] = que.pop() as number[];
    const nextTurn = t + 1;
    let p, s;
    if (t % 2 === 1) {
      //Player 1
      p = p1;
      s = s1;
    } else {
      // Player 2
      p = p2;
      s = s2;
    }

    for (const [k, f] of frequencies.entries()) {
      let newP = p + k;
      newP = newP % 10;
      newP = newP == 0 ? 10 : newP;
      const newScore = s + newP;

      if (t % 2 === 1) {
        if (newScore >= 21) {
          //console.log(newP, newScore, nextTurn, v * f);
          res.push([newP, newScore, nextTurn, v * f]);
        } else {
          que.push([newP, newScore, nextTurn, v * f]);
        }
      } else {
        // Player 2
        p = p2;
        s = s2;
      }
    }
  }

  return res;
}

// Turns it will take to reach a goal score of 21. Key is the number of games. Value is the number of universes.
function numberOfTurnsToWin(pos: number, score: number): number[][] {
  // const turns = new Map();

  const que: number[][] = [];
  const res = [];
  // pos, score, turn, count
  que.push([pos, score, 0, 1]);
  while (que.length > 0) {
    const [p, s, t, v] = que.pop() as number[];
    const nextTurn = t + 1;
    for (const [k, f] of frequencies.entries()) {
      let newP = p + k;
      newP = newP % 10;
      newP = newP == 0 ? 10 : newP;
      const newScore = s + newP;
      if (newScore >= 21) {
        //console.log(newP, newScore, nextTurn, v * f);
        res.push([newP, newScore, nextTurn, v * f]);
      } else {
        que.push([newP, newScore, nextTurn, v * f]);
      }
    }
  }

  return res;
}

// How much you can advance in a turn (keys) and the number of universes (values).
function getOptionForDie() {
  const faces = [1, 2, 3];
  const options = [],
    frequencies = new Map<number, number>();
  for (const f1 of faces) {
    for (const f2 of faces) {
      for (const f3 of faces) {
        options.push([f1, f2, f3]);
      }
    }
  }
  const sum = options.map((r) => r.reduce((a, b) => a + b, 0));
  console.log(sum);
  for (const o of sum) {
    frequencies.set(o, (frequencies.get(o) ?? 0) + 1);
  }
  console.log({ frequencies });
  return frequencies;
}

const frequencies = getOptionForDie();
main();
