import { ContextMessageUpdate } from "telegraf";

export class Riddle {
    text: string;

    action : (context : ContextMessageUpdate) => void = (context) => {return};

    answerAction : (context : ContextMessageUpdate, chatId: string | number) => void = (context) => {return};

    constructor(text : string,
        action: (context : ContextMessageUpdate) => void,
        answerAction : (context : ContextMessageUpdate, chatId: string | number) => void)
    {
        this.text = text;
        this.action = action;
        this.answerAction = answerAction;

    }
}