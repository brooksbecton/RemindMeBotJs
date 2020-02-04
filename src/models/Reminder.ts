import { connect, connection, Document, model, Schema } from "mongoose";

connect(process.env.MONGO_URL);

export var ReminderSchema: Schema = new Schema({
  createdOn: Number,
  remindOn: Number,
  msg: String,
  author: String,
  channel: String
});

connection.once("open", function() {
  console.log("Connected to DB");
});

export const Reminder = model("Reminder", ReminderSchema);
