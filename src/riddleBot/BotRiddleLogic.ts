import { ContextMessageUpdate } from "telegraf";
import { RiddleMaster } from "./RiddleMaster";

export class BotRiddleLogic {
    riddleMaster : RiddleMaster;

    constructor() {
        this.riddleMaster = new RiddleMaster();
    }

    riddleHandler = (context : ContextMessageUpdate) => {
        if (context.message?.text!) {
            let riddleText = this.riddleMaster.getRiddle(context.message?.text!)

            if(riddleText == RiddleMaster.noRiddle) {
                context.reply("Code is wrong! No riddle there!")
            } else {
                context.reply(riddleText!)
            }
        }
    } 
}