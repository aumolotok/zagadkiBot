import { ContextMessageUpdate, Telegram } from "telegraf";
import { RiddleMaster } from "./RiddleMaster";
import {ImageMaster} from "../images/ImageMaster"
import {SecInfoProvider} from "../Classes/Utils/SecInfoProvider"
import { Riddle } from "../Classes/Riddle";
import { text } from "express";

export class BotRiddleLogic {

    private static iAmVlad : string = "Я Влад";

    private static right : string = "Admin Верно";
    private static wrong : string = "Admin Неверно";

    public vladId: number | string = "-495337364";

    public adminId: string = SecInfoProvider.getAdminId();

    riddleMaster : RiddleMaster;
    appInstance: Telegram;

    constructor(telegramInstanse : Telegram) {
        this.appInstance = telegramInstanse;
        this.riddleMaster = new RiddleMaster();
    }

    ansverHandler = (context : ContextMessageUpdate) => {

        this.riddleMaster.getAllKeys().forEach(element => {
            if(context.message!.text!.includes(element)) {
                return this.riddleMaster.getRiddleByKey(element)?.answerAction(context, this.vladId);
            }
        });
    }

    askAdminForHint = (context : ContextMessageUpdate) => {
        context.telegram.sendMessage(this.adminId, context!.message!.text!)
    }

    riddleHandler = (context : ContextMessageUpdate) => {

        console.log(context.chat?.title);
        console.log(context.chat?.id);

        if(this.checkFotServiceMessage(context)) {
            return;
        }

        if(this.checkForAdminMessage(context)) {
            return;
        }


        if (context.message?.text!) {
            let riddle = this.riddleMaster.getRiddle(context.message?.text!)

            if(riddle?.text == RiddleMaster.noRiddle) {
                context.replyWithMarkdown("По этому коду _загадки_ *нет*!")
            } else {
                context.replyWithMarkdown(riddle!.text);
                context.telegram.sendMessage(this.adminId, "Получена загадка \n" + riddle!.text, {parse_mode: 'Markdown'});
                riddle?.action(context);
            }
        }
    } 

    answerForwardHandler = (context: ContextMessageUpdate) => {
        console.log("It is Photo!")

        if(this.isItFromAdmin(context)) {
            context.telegram
            .sendPhoto(this.vladId, context.message!.photo![0].file_id)
            .catch(reason => console.log(reason)); 
            return;
        }

        context.telegram
            .sendPhoto(this.adminId, context.message!.photo![0].file_id)
            .catch(reason => console.log(reason));
    }

    private checkFotServiceMessage = (context : ContextMessageUpdate) => {
        let isItServiceMessage = false;

        switch (context.message?.text!) {
            case BotRiddleLogic.iAmVlad :
                this.vladId = context.chat!.id;
                console.log("I am Vlad " + this.vladId)
                context.telegram.sendMessage(this.adminId, "Игрок зарегестрировался! " + context.from?.username);
                isItServiceMessage = true;
                break;
            default:
                break
        }

        return isItServiceMessage;
    }

    private checkForAdminMessage = (context : ContextMessageUpdate) => {
        let isItFromAdmin = this.isItFromAdmin(context);

        if(isItFromAdmin) {
            console.log("It is from admin");
            context.telegram.sendCopy(this.vladId, context.message).catch();
        }

        return isItFromAdmin;
    }


    private isItFromAdmin = (context : ContextMessageUpdate) => {
        return context.chat?.id.toString() == SecInfoProvider.getAdminId();
    }

    startHandler = (context : ContextMessageUpdate) => {
        if (context.message?.text!) {
            context.replyWithMarkdown(RiddleMaster.hello)
            .then((value) => context.replyWithPhoto({source: ImageMaster.getDratuti()}))
            .then((value) => context.replyWithMarkdown(RiddleMaster.systemInfo))
            .then((value) => context.replyWithMarkdown(RiddleMaster.rules))
            .then(value => context.replyWithMarkdown(RiddleMaster.hints))
            .then(value => context.replyWithMarkdown(RiddleMaster.reminder))
            .then(value => context.replyWithMarkdown(RiddleMaster.first))
        }
    } 

    helpHandler = (context : ContextMessageUpdate) => {
        if (context.message?.text!) {
            context.replyWithMarkdown(RiddleMaster.rules)
            .then(value => context.replyWithMarkdown(RiddleMaster.hints))
            .then(value => context.replyWithMarkdown(RiddleMaster.reminder))
        }
    } 

    

    
}