import { Message } from "discord.js";
import formatters from "./date_formats";

interface ScheduledTask {
  action: (date: Date) => any;
  date: string | Date;
  onError?: (err: any) => void;
}

export default class Scheduler {
  private schedule: Set<ScheduledTask> = new Set();

  constructor() {
    setInterval(this.handleScheduledMessages, 1000);
  }

  handleScheduledMessages = () => {
    this.schedule.forEach((task, _, set) => {
      if (task.date.toLocaleString() <= new Date().toLocaleString()) {
        task.action(task.date as Date);
        set.delete(task);
      }
    });
  };

  private isPastDate = (date: Date) => {
    if (new Date() < date) return false;

    return true;
  };

  scheduleMessage = ({ action, date, onError }: ScheduledTask) => {
    try {
      let currentDate = date;

      const formatter = formatters.find(({ validator }) =>
        validator(date as string)
      );
      if (!formatter)
        throw Error("You're not using a correct date time format");
      formatter.handler(date);

      // check if the date is in the past
      if (!this.isPastDate(date as Date))
        throw Error("This date is in the past");

      this.schedule.add({
        action,
        date: currentDate,
      });
    } catch (err) {
      console.log((err as Error).message || "Make sure your inputs are valid");
      onError && onError(err);
    }
  };
}
