import parseMessage from "./index";

describe("parseMessage", () => {
  it("slices msg after flag", () => {
    const msg = "Hook line and sinker";
    const testMsg = "!remindme in 1 minute -m " + msg;
    const result = parseMessage(testMsg);

    expect(result).toEqual(msg);
  });
  it("returns empty string if there is no message flag", () => {
    const msg = "Hook line and sinker";
    const testMsg = "!remindme in 1 minute " + msg;
    const result = parseMessage(testMsg);

    expect(result).toEqual("");
  });
});
