import * as schedule from "node-schedule";
import { DateTime } from "luxon";

import messageContainsHook from "./../common/messageContainsHook/index";
import parseMessage from "./../common/parseMessage/index";
import createTimeObject from "./../common/createTimeObject/index";

function createReminder(msg: string): Promise<string> {
  return new Promise<string>((resolve: Function) => {
    const time = createTimeObject(msg);

    const { second, hour, minute } = time;

    const reminderDateTime = DateTime.local().plus({
      seconds: second,
      hours: hour,
      minutes: minute
    });

    schedule.scheduleJob(reminderDateTime.toJSDate(), function() {
      resolve();
    });
  });
}

function handleReminderMessages(msg: any) {
  const reminderMessage = parseMessage(msg.content);
  if (messageContainsHook(msg.content)) {
    if (reminderMessage.length > 0) {
      msg.reply(":thumbsup:");
      createReminder(msg.content).then(() => {
        msg.reply(reminderMessage);
      });
    } else {
      msg.reply("No Message :(");
    }
  }
}

export default handleReminderMessages;
