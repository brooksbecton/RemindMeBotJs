import * as Discord from "discord.js";
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

client.login("NDMxODUxNjI5NTAzOTcxMzU4.DkFErg.p2LRBN_OVV2PujWlbPeacnnSdk8");
