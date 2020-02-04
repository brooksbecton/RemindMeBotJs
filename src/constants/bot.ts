import * as dotenv from "dotenv";

dotenv.config();

export const botHook = "!remindme";
export const messageFlag = "-m";
export const usageFlags = ["-usage", "-help", "🤷", `¯\_(ツ)_/¯`];
export const usage = `
    ReminderBot is a bot for reminding someone with a message 💁

    Invite URL: https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot&permissions=0


    Usage: 
        The bot only responds to messages with the bot's flag
        The flag is "!remindme"

        Set Reminder: 

            The bot can remind in seconds, minutes, and hours.
            You can also combine time units such as, "2 seconds, 5 minutes, and 6 hours"

            Example:
                !remindme in 5 minutes -m  "Your Reminder Message"

        Print Usage
            Prints what the bot will accept such as content and flags

            Example:
                !remindme --usage
`;