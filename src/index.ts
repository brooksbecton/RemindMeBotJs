import * as Discord from "discord.js";
import * as dotenv from "dotenv";
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
    // Reminder.create({ ...time, msg: "Hey There" });
    msg.reply(JSON.stringify(time));
  }
});

client.login(process.env.DISCORD_TOKEN);
