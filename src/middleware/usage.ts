import { usage, usageFlags } from "./../constants/bot";

function messageContainsUsageFlag(msg: string) {
  let flagFound = false;
  usageFlags.forEach(flag => {
    if (msg.indexOf(flag) !== -1) {
      flagFound = true;
    }
  });

  return flagFound;
}

function printUsage(msg: any) {
  if (messageContainsUsageFlag(msg.content)) {
    msg.reply(usage);
  }
}

export default printUsage;
