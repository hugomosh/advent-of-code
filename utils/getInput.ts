const { readFileSync } = require("fs");

export const getInputPath = (year: number | string, day: number | string) => {
  day = String(day);
  return [`./input/${year}`, `/${day.padStart(2, "0")}`, `.txt`];
};

export default function readInputFile(
  year: string | number,
  day: string | number,
  filePath = getInputPath(year, day).join("")
): string {
  return readFileSync(filePath, "utf-8");
}
export function readTestInputFile(
  year: string | number,
  day: string | number
): string {
  let filePath = getInputPath(year, day);
  filePath[2] = `.example.txt`;
  return readInputFile(year, day, filePath.join(""));
}
