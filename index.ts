import { PathLike } from "fs";

require("dotenv").config();
const { spawn, execSync } = require("child_process");
const { readdirSync, mkdirSync, existsSync, writeFileSync } = require("fs");
import { downloadInputForYearAndDay, getPuzzleDescription } from "./utils/aoc-actions";
import path from "path";
import { cp } from "shelljs";
import { getInputPath } from "./utils/getInput";

const action = process.argv[2];
const year = process.argv[3];
const day = process.argv[4];

const getTsPath = (year: number | string, day: number | string) => {
  day = String(day);
  return `./ts/${year}/${day.padStart(2, "0")}`;
};

const getSecondPart = async (year: string, day: string) => {
  const path = getTsPath(year, day);
  const readme = await getPuzzleDescription(year, day);
  writeFileSync(`${path}/README.md`, readme);
};

const createFromTemplate = async () => {
  const path = getTsPath(year, day),
    inputPath = getInputPath(year, day);
  if (!existsSync(path)) {
    console.log(`Creating challenge to ${path} from template...`);
    mkdirSync(path, { recursive: true });
    //Copy template
    cp("-rf", "templates/ts/*", path);
  }

  if (!existsSync(inputPath.join(""))) {
    console.log(`Downloading input into ${inputPath.join("")}...`);
    mkdirSync(inputPath[0], { recursive: true });
    const input = await downloadInputForYearAndDay(day, year);
    writeFileSync(inputPath.join(""), input);
    writeFileSync(inputPath[0] + inputPath[1] + `.example.txt`, "");
  }
  let readme = await getPuzzleDescription(year, day);
  console.log(readme);

  writeFileSync(`${path}/README.md`, readme);
  writeFileSync(
    `${path}/config.ts`,
    `export const config = {
      year: ${year},
      day: ${day},
    };`
  );
};

function run() {
  const path = getTsPath(year, day) + `/index.ts`;
  if (existsSync(path)) {
    spawn("nodemon", ["-x", "ts-node", `${path} ${year} ${day}`], {
      stdio: "inherit",
      shell: true,
    });
  }
}


async function crun() {
  await createFromTemplate();
  run();
}

if (action === "create") {
  createFromTemplate();
}

if (action === "s") {
  getSecondPart(year, day);
}

if (action === "run") {
  run();
}

if (action === "crun") {
  crun();
}
