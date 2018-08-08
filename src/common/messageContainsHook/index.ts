import { botHook } from "./../../constants/bot";

function msgContainsHook(msg: string): boolean {
  return msg.toLowerCase().indexOf(botHook) !== -1;
}

export default msgContainsHook;
