import { connect, connection, Document, model, Schema } from "mongoose";
import Time from "./../types/Time";

connect(process.env.MONGO_URL);

export interface IReminderModel extends Time, Document {
  msg: string;
}

export var ReminderSchema: Schema = new Schema({
  createdOn: Number,
  remindOn: Number,
  msg: String
});

connection.once("open", function() {
  console.log("Connected to DB");
});

export const Reminder = model("Reminder", ReminderSchema);
