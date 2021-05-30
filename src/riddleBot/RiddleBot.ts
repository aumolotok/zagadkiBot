const Telegraf  = require("telegraf");
import * as Telega from "telegraf";
import { SecInfoProvider } from "../Classes/Utils/SecInfoProvider"
import { BotRiddleLogic } from "./BotRiddleLogic";

var logic = new BotRiddleLogic();

var token : String = SecInfoProvider.getToken();
let app : Telega.Telegraf<Telega.ContextMessageUpdate>  = new Telegraf(token);


app.on("message", logic.riddleHandler);

export const startRiddleBot = () => app.launch();
export const stopRiddleBot = () => app.stop();
