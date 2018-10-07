import { usageFlag } from "./../constants/bot";
import { usage } from "./../constants/bot";

function printUsage(msg: any) {
  if (msg.content.indexOf(usageFlag) !== -1) {
    msg.reply(usage);
  }
}

export default printUsage;
