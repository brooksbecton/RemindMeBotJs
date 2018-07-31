import * as Discord from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

import createTimeObject from "./common/createTimeObject/index.ts";
import { botHook } from "./constants/bot";
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content.toLowerCase().indexOf(botHook) !== -1) {
    msg.reply(JSON.stringify(createTimeObject(msg.content)));
  }
});

client.login(process.env.DISCORD_TOKEN);
