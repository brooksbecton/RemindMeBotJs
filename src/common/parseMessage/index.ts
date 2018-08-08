import { messageFlag } from "./../../constants/bot";

function parseMessage(userMsg: string): string {
  const flagIndex = userMsg.indexOf(messageFlag);
  if (flagIndex !== -1) {
    const message = userMsg.slice(
      //start at flag, cut out the flag, plus one for the space after the flag
      flagIndex + messageFlag.length + 1,
      userMsg.length
    );
    return message;
  } else {
    return "";
  }
}

export default parseMessage;
