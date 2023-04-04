import periodDateFormat from "../period_format/period.format";
import converters from "../period_format/ms.converters";
import { describe, expect, it } from "vitest";

describe("#periodDateFormat", () => {
  it("360 days, i.e., one year", () => {
    const actualOutput = periodDateFormat("360day");
    expect(actualOutput.getFullYear()).toBe(2024);
  });
});
