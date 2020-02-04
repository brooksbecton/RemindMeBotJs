import juration from "../libraries/juration";
import { messageFlag } from "../constants/bot";

// Example reminderStr
// !remindme in 10 second -m "Drink whisky"
export function getReminderSecondsOffset(reminderStr: string): number {
  const reminderWords = reminderStr.split(" ");

  // String containing the user's reminder offest
  const timeStr = reminderWords
    // Skip bot hook
    .slice(2, reminderWords.indexOf(messageFlag))
    .join(" ");

  return juration.parse(timeStr);
}
