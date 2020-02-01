import * as schedule from "node-schedule";
import { DateTime } from "luxon";

import parseMessage from "./../common/parseMessage/index";
import createTimeObject from "./../common/createTimeObject/index";
import { Reminder } from "../models/Reminder";

async function createReminder(msg: string): Promise<string> {
  return new Promise<string>((resolve: Function) => {
    const time = createTimeObject(msg);

    const { second, hour, minute } = time;

    const reminderDateTime = DateTime.local().plus({
      seconds: second,
      hours: hour,
      minutes: minute
    });

    schedule.scheduleJob(reminderDateTime.toJSDate(), function() {
      const reminder = new Reminder({
        createdOn: new Date().getTime(),
        remindOn: reminderDateTime.toJSDate().getTime(),
        msg: parseMessage(msg)
      });
      reminder.save();
      resolve();
    });
  });
}

function handleReminderMessages(msg: any) {
  const reminderMessage = parseMessage(msg.content);
  if (reminderMessage.length > 0) {
    msg.reply(":thumbsup:");
    createReminder(msg.content).then(() => {
      msg.reply(reminderMessage);
    });
  }
}

export default handleReminderMessages;
