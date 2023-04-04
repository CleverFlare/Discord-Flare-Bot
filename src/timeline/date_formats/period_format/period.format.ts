import { Converter } from "./ms.converters";
import converters from "./ms.converters";

export function periodDateValidator(date: string) {
  if (/\d*\w/gi.test(date)) return true;
  return false;
}

export default function periodDateFormat(date: string) {
  const extractedUnit = date.replace(/\d/gi, "").trim().toLowerCase();

  const extractedNumber = parseInt(date);

  const converter: Converter | undefined = converters.find(({ unit }) => {
    return unit === extractedUnit;
  });

  if (!converter) throw Error("The unit is not correct");

  const { handler } = converter;
  const currentMilliSeconds = Date.now();

  const convertedMilliseconds = handler(extractedNumber);

  return new Date(currentMilliSeconds + convertedMilliseconds);
}
