import * as Discord from "discord.js";
import * as dotenv from "dotenv";
import * as schedule from "node-schedule";
import { DateTime } from "luxon";
dotenv.config();

// import Reminder from "./models/Reminder";
import createTimeObject from "./common/createTimeObject/index";
import { botHook } from "./constants/bot";
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content.toLowerCase().indexOf(botHook) !== -1) {
    const time = createTimeObject(msg.content);

    const { second, hour, minute } = time;

    const reminderDateTime = DateTime.local().plus({
      seconds: second,
      hours: hour,
      minutes: minute
    });

    const jorb = schedule.scheduleJob(reminderDateTime.toJSDate(), function() {
      msg.reply("Oh Dear");
    });
    msg.reply("Reminding you at " + jorb.nextInvocation());
  }
});

client.login(process.env.DISCORD_TOKEN);
