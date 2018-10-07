import { Client, Message } from "discord.js";
import * as dotenv from "dotenv";

import messageContainsHook from "./common/messageContainsHook/index";
import reminders from "./middleware/reminders";
import usage from "./middleware/usage";

dotenv.config();

const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg: Message) => {
  Message;
  handleMessage(msg);
});

client.login(process.env.DISCORD_TOKEN);

/**
 * Passes a user's msg to middleware
 */
function handleMessage(msg: Message) {
  if (messageContainsHook(msg.content) && msg.author.bot === false) {
    const middleware = [reminders, usage];
    middleware.forEach(m => {
      m(msg);
    });
  }
}
