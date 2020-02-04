import * as schedule from "node-schedule";
import { DateTime } from "luxon";

import parseMessage from "./../common/parseMessage/index";
import { getReminderSecondsOffset } from "../common/getReminderSecondsOffset";
import { Reminder } from "../models/Reminder";

async function createReminder({
  content,
  author,
  channel
}: {
  content: string;
  author: any;
  channel: any;
}): Promise<string> {
  return new Promise<string>((resolve: Function) => {
    const seconds = getReminderSecondsOffset(content);

    const reminderDateTime = DateTime.local().plus({
      seconds
    });

    const reminder = new Reminder({
      createdOn: new Date().getTime(),
      remindOn: reminderDateTime.toJSDate().getTime(),
      msg: parseMessage(content),
      author: author.id,
      channel: channel.id
    });
    reminder.save();

    schedule.scheduleJob(reminderDateTime.toJSDate(), function() {
      resolve();
    });
  });
}

function handleReminderMessages(msg: any) {
  const reminderMessage = parseMessage(msg.content);
  if (reminderMessage.length > 0) {
    msg.react("👍");
    createReminder(msg).then(() => {
      msg.reply(reminderMessage);
    });
  }
}

export default handleReminderMessages;
