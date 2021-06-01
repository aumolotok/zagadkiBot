//const Telegraf  = require("telegraf");
import * as Telega from "telegraf";
import {Telegram} from "telegraf";
import { SecInfoProvider } from "../Classes/Utils/SecInfoProvider"
import { BotRiddleLogic } from "./BotRiddleLogic";

var token : string = SecInfoProvider.getToken();
let app : Telega.Telegraf<Telega.ContextMessageUpdate>  = new Telega.default(token);

var logic = new BotRiddleLogic(app.telegram);

app.command("/start", logic.startHandler);

app.on('photo', logic.answerForwardHandler);

app.on("message", logic.riddleHandler);




export const startRiddleBot = () => app.launch();
export const stopRiddleBot = () => app.stop();
