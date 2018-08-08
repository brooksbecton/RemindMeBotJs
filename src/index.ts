import * as Discord from "discord.js";
import * as dotenv from "dotenv";
import * as schedule from "node-schedule";
import { DateTime } from "luxon";
dotenv.config();

import createTimeObject from "./common/createTimeObject/index";
import messageContainsHook from "./common/messageContainsHook";
import parseMessage from "./common/parseMessage/index";

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  handleMessage(msg);
});

client.login(process.env.DISCORD_TOKEN);

export function createReminder(msg: string): Promise<string> {
  return new Promise((resolve: Function) => {
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

export function handleMessage(msg: Discord.Message) {
  const reminderMessage = parseMessage(msg.content);
  if (messageContainsHook(msg.content)) {
    if (reminderMessage.length > 0) {
      createReminder(msg.content).then(() => {
        msg.reply(reminderMessage);
      });
    } else {
      msg.reply("No Message :(");
    }
  }
}
