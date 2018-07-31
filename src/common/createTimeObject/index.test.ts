import createTimeObject from "./index";

describe("createTimeObject", () => {
  it("returns all 0's when no time constraints are found", () => {
    const { second, minute, hour, date, dayOfWeek } = createTimeObject("");

    expect(second).toEqual(0);
    expect(minute).toEqual(0);
    expect(hour).toEqual(0);
    expect(date).toEqual(0);
    expect(dayOfWeek).toEqual(0);
  });

  describe("parses time from strings", () => {
    it("the string is only seconds", () => {
      const testStr = "5 seconds";
      const expectedTime = 5;
      const { second } = createTimeObject(testStr);

      expect(second).toEqual(expectedTime);
    });
    it("the string is only minutes", () => {
      const testStr = "5 minutes";
      const expectedTime = 5;
      const { minute } = createTimeObject(testStr);

      expect(minute).toEqual(expectedTime);
    });
    it("the string is only hours", () => {
      const testStr = "5 hours";
      const expectedTime = 5;
      const { hour } = createTimeObject(testStr);

      expect(hour).toEqual(expectedTime);
    });
    it("with hours, minutes, and seconds", () => {
      const testStr = "3 seconds 4 minutes 5 hours";
      const expectedSeconds = 3;
      const expectedMinutes = 4;
      const expectedHours = 5;
      const { second, minute, hour } = createTimeObject(testStr);

      expect(second).toEqual(expectedSeconds);
      expect(minute).toEqual(expectedMinutes);
      expect(hour).toEqual(expectedHours);
    });
  });
});
