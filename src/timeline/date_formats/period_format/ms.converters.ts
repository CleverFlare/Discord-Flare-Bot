export class Converter {
  constructor(public unit: string, public handler: (num: number) => number) {}
}

export function secondsToMs(num: number) {
  return num * 1000;
}
export function minutesToMs(num: number) {
  return secondsToMs(num) * 60;
}

export function hoursToMs(num: number) {
  return minutesToMs(num) * 60;
}

export function daysToMs(num: number) {
  return hoursToMs(num) * 24;
}

export default [
  new Converter("s", secondsToMs),
  new Converter("m", minutesToMs),
  new Converter("hr", hoursToMs),
  new Converter("day", daysToMs),
];
