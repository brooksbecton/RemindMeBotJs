import * as Discord from "discord.js";
import * as dotenv from "dotenv";

import reminders from "./middleware/reminders";

dotenv.config();

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg: Discord.Message) => {
  handleMessage(msg);
});

client.login(process.env.DISCORD_TOKEN);

/**
 * Passes a user's msg to middleware
 */
function handleMessage(msg: Discord.Message) {
  const middleware = [reminders];
  middleware.forEach(m => {
    m(msg);
  });
}
