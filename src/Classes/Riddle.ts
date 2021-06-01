import { ContextMessageUpdate } from "telegraf";

export class Riddle {
    text: string;

    action : (context : ContextMessageUpdate) => void = (context) => {return};

    constructor(text : string, action: (context : ContextMessageUpdate) => void = (context) => {return})
    {
        this.text = text;
        this.action = action;
    }
}