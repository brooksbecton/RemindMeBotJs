import messageContainsHook from "./index";
import { botHook } from "./../../constants/bot";
describe("messageContainsHook()", () => {
  it("returns true when hook is in string", () => {
    const testMsg = botHook + " blh blah blah";
    const result = messageContainsHook(testMsg);

    expect(result).toEqual(true);
  });
  it("returns false when no hook", () => {
    const testMsg = " blh blah blah";
    const result = messageContainsHook(testMsg);

    expect(result).toEqual(false);
  });
});
