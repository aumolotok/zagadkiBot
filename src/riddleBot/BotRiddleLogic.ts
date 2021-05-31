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
                context.replyWithMarkdown("По этому коду _загадки_ *нет*!")
            } else {
                context.replyWithMarkdown(riddleText!)
            }
        }
    } 
}