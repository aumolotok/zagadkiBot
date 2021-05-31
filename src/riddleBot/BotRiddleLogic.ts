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

    startHandler = (context : ContextMessageUpdate) => {
        if (context.message?.text!) {
            context.replyWithMarkdown(RiddleMaster.hello)
            .then((value) => context.replyWithMarkdown(RiddleMaster.systemInfo))
            .then((value) => context.replyWithMarkdown(RiddleMaster.rules))
            .then(value => context.replyWithMarkdown(RiddleMaster.hints))
            .then(value => context.replyWithMarkdown(RiddleMaster.reminder))
            .then(value => context.replyWithMarkdown(RiddleMaster.first))
            //.then((value) => value.)

            //context.replyWithMarkdown(RiddleMaster.systemInfo);
            //context.replyWithMarkdown(RiddleMaster.rules);
            //context.replyWithMarkdown(RiddleMaster.hints);
        }
    } 

    
}