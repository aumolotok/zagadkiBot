//const Telegraf  = require("telegraf");
import * as Telega from "telegraf";
import {Telegram} from "telegraf";
import { SecInfoProvider } from "../Classes/Utils/SecInfoProvider"
import { BotRiddleLogic } from "./BotRiddleLogic";

var token : string = SecInfoProvider.getToken();
let app : Telega.Telegraf<Telega.ContextMessageUpdate>  = new Telega.default(token);

var logic = new BotRiddleLogic(app.telegram);

app.start(logic.startHandler);
app.help(logic.helpHandler);


let adminHears = 
    [
        new RegExp("Admin ответ Барак"),
        new RegExp("Admin ответ Пес"),
        new RegExp("Admin ответ Почтальон"),
        new RegExp("Admin ответ Вывеска"),
        new RegExp("Admin ответ Паровоз"),
        new RegExp("Admin ответ Днк")
    ]
app.hears(adminHears, logic.ansverHandler)

let hint = 
    [
        new RegExp("\\!"),
        new RegExp("\\?"),
        new RegExp("Подсказка"),
        new RegExp("подсказка"),
    ]
app.hears(hint, logic.askAdminForHint)

app.hears(new RegExp("Admin reset"), logic.vladIdToDefault);

app.hears(new RegExp("Admin"), logic.ansverHandler)



app.action("iAmReady", logic.registerUserHandler);

app.on('photo', logic.answerForwardHandler);
app.on("text", logic.riddleHandler);


export const startRiddleBot = () => app.launch();
export const stopRiddleBot = () => app.stop();
