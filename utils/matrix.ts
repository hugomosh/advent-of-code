export const coordsToString = (x: number[]): string => {
    return x.join(",");
}

export const stringToCoords = (s: string): number[] => {
    return s.split(",").map(Number);
}