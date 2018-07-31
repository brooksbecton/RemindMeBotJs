/**
 * Reads a human like string and converts if to a POJO
 * containing how much time until the reminder
 */

import Time from "./../../types/Time";

function createTimeObject(reminderStr: string): Time {
  let second = 0;
  let minute = 0;
  let hour = 0;
  let date = 0;
  let month = 0;
  let year = 0;
  let dayOfWeek = 0;

  interface IParseFunction {
    (x: string): number;
  }

  function parseGenerator(targetTime: string): IParseFunction {
    return function(timeStr: string) {
      const timeIndex = timeStr.toLowerCase().indexOf(targetTime);
      if (timeIndex === -1) {
        return 0;
      } else {
        return Number(timeStr[timeIndex - 2]);
      }
    };
  }

  second = parseGenerator("second")(reminderStr);
  minute = parseGenerator("minute")(reminderStr);
  hour = parseGenerator("hour")(reminderStr);

  return {
    second,
    minute,
    hour,
    date,
    month,
    year,
    dayOfWeek
  };
}

export default createTimeObject;
