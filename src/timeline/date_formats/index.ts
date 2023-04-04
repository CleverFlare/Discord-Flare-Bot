import dateTimeFormat, { dateTimeValidator } from "./date.time.format";
import periodDateFormat, {
  periodDateValidator,
} from "./period_format/period.format";

class DateFormater {
  constructor(
    public validator: (date: string) => boolean,
    public handler: (...params: any) => Date
  ) {}
}

export default [
  new DateFormater(periodDateValidator, periodDateFormat),
  new DateFormater(dateTimeValidator, dateTimeFormat),
];
