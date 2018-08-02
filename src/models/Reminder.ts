import { connect, connection, Document, model, Schema } from "mongoose";
import Time from "./../types/Time";

connect(process.env.MONGO_URL);

export interface IReminderModel extends Time, Document {
  msg: string;
}

export var ReminderSchema: Schema = new Schema({
  second: Number,
  minute: Number,
  hour: Number,
  date: Number,
  dayOfWeek: Number,
  msg: Number
});

connection.once("open", function() {
  console.log("Connected to DB");
});

export const Reminder = model("Reminder", ReminderSchema);
export default Reminder;
