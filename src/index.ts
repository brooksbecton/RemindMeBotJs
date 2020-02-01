import { Client } from "./../node_modules/discord.js/src/index";
import * as dotenv from "dotenv";
import { connect } from "mongoose";

import messageContainsHook from "./common/messageContainsHook/index";
import reminders from "./middleware/reminders";
import usage from "./middleware/usage";
import { Reminder } from "./models/Reminder";
import { scheduleJob } from "node-schedule";

interface IMessage {
  content: string;
  author: {
    bot: boolean;
  };
}
dotenv.config();
connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    const client = new Client();

    // Load in previous reminders
    Reminder.find({}, (err, documents) => {
      documents.forEach(document => {
        const remindDate = new Date(document.get("remindOn"));
        const msg = document.get("msg");
        scheduleJob(remindDate, () => {
          // Need to save the author id to send this message back
          console.log(msg);
        });
      });
    });

    client.on("ready", () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on("message", (msg: IMessage) => {
      handleMessage(msg);
    });

    client.login(process.env.DISCORD_TOKEN);
  })
  .catch(e => console.error(e));

/**
 * Passes a user's msg to middleware
 */
function handleMessage(msg: IMessage) {
  if (messageContainsHook(msg.content) && msg.author.bot === false) {
    const middleware = [reminders, usage];
    middleware.forEach(m => {
      m(msg);
    });
  }
}
