import {
  daysToMs,
  hoursToMs,
  minutesToMs,
  secondsToMs,
  Converter,
} from "../date_formats/period_format/ms.converters";
import { describe, expect, it } from "vitest";

describe("test the converter class", () => {
  const converter = new Converter("unit", () => 0);
  it("test if it contains the unit property", () => {
    expect(converter.hasOwnProperty("unit")).toBe(true);
  });
  it("test if it contains the handler method", () => {
    expect(converter.hasOwnProperty("handler")).toBe(true);
  });
});

describe("test cases for the seconds to milliseconds function", () => {
  it("output of 1 second", () => {
    expect(secondsToMs(1)).toBe(1 * 1000);
  });

  it("output of 4 seconds", () => {
    expect(secondsToMs(4)).toBe(4 * 1000);
  });

  it("output of 20 seconds", () => {
    expect(secondsToMs(20)).toBe(20 * 1000);
  });
});

describe("test cases for the minutes to milliseconds function", () => {
  it("output of 1 minute", () => {
    expect(minutesToMs(1)).toBe(1 * 1000 * 60);
  });

  it("output of 4 minutes", () => {
    expect(minutesToMs(4)).toBe(4 * 1000 * 60);
  });

  it("output of 20 minutes", () => {
    expect(minutesToMs(20)).toBe(20 * 1000 * 60);
  });
});

describe("test cases for the hours to milliseconds function", () => {
  it("output of 1 hour", () => {
    expect(hoursToMs(1)).toBe(1 * 1000 * 60 * 60);
  });

  it("output of 4 hours", () => {
    expect(hoursToMs(4)).toBe(4 * 1000 * 60 * 60);
  });

  it("output of 20 hours", () => {
    expect(hoursToMs(20)).toBe(20 * 1000 * 60 * 60);
  });
});

describe("test cases for the days to milliseconds function", () => {
  it("output of 1 day", () => {
    expect(daysToMs(1)).toBe(1 * 1000 * 60 * 60 * 24);
  });

  it("output of 4 days", () => {
    expect(daysToMs(4)).toBe(4 * 1000 * 60 * 60 * 24);
  });

  it("output of 20 days", () => {
    expect(daysToMs(20)).toBe(20 * 1000 * 60 * 60 * 24);
  });
});
