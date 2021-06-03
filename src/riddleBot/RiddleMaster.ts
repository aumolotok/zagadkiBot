import { Riddle } from "../Classes/Riddle";
import { ImageMaster } from "../images/ImageMaster";

export class RiddleMaster {

    public static noRiddle: string = "No riddle";

    public static hello: string = "Привет, Влад! Я - бот загадочник! Тебе будет весело! Нажми \"Я готов\" и мы начнем!";

    public static rules: string = 
`Правила: В загадках зашифровано *место* или *объект* в пешей доступности, который можно сфотографировать *с улицы*.
Ответом на все загадки должны быть селфи *всей твоей команды* и загаданного предмета или места
Тебе нужно прислать мне это селфи чтобы получить дальнейшие инструкции`;

    public static hints: string = 
`Раз в *10 минут* ты можешь спросить у меня *подсказку*.
Подсказки бывают *двух типов*:
1. Спросить подсказку к самой загадке. Это будет наводящее на ответ слово или фраза, которая поможет в разгадке.
Для этого напиши что-то типа "Подсказка!"
*Главное поставь восклицательный знак в конце*

2. Назвать перeдполагаемое место. Ответом на подсказку пожет быть _Да/Нет/Ты рядом географически/Ты верно мыслишь_
*Главное поставить знак вопроса в конце*
Пример - Это Пролетка?

*Внимание!* Раз в 10 минут можно запросить только *один* тип подсказки`;

    public static reminder = "Напиши */help* и я напомню тебе правила"
    
    public static first = "Кстати, спроси у Андрея (он должен стоять рядом) первый код загадки! Тебе ведь нужно найти себе _помощников_"

    public static systemInfo: string = "Пришли мне код загадки и я тут же вышлю ее тебе!"

    public static aboutSite: string =
`Отлично! Вот и твоя команда!
А это сайт для отслеживания Ярика - https://aumolotokvlad.000webhostapp.com/index.html
Скопируй себе в браузер и держи под рукой!
На сайте будет появляться трехзначные коды - вводи их боту, чтобы получить новые загадки!
По ходу разгадок ты так же будешь получать пятизначные коды - это коды поиска! Смело вводи их в поле ввода на сайт!
Кстати, на сайте уже должен быть код для загадки!

`

    private mapOfRiddles = 
        new Map<string, Riddle>()
            .set("1", new Riddle(
                "Команда нужна всем, даже _Американцам._ Ведь без команды в _США_ справится максимум _премьер-министр_. или _сенатор_. Но точно не *ОН* ",
                (context) => {},
                (context, chatId) => {context.telegram.sendMessage(chatId, RiddleMaster.aboutSite, {parse_mode: 'Markdown'});}))
            .set("283", new Riddle(
                "Собака неплохо соблюдает _дресс код_. Да и фото отличное. Пришли фото с собакой, которая придерживается такого же стиля. Картинки из инета не канают",
                (context) => {context.replyWithPhoto({source: ImageMaster.getDog()})},
                (context, chatId) => {context.telegram.sendMessage(chatId, "Гав-гав! Хороший мальчик, введи на поисковом сайте код поиска - " + this.keysToAnswers.get("Пес"));}))
            .set("341", new Riddle(
                "Ваши патроны везут. Ну и что, что из Москвы и целых три месяца. А у вас номер «шпионажа» есть? Не работает? Так может вы не по прописке пришли? Наш лучший *сотрудник* все доставит",
                (context) => {},
                (context, chatId) => {context.telegram.sendMessage(chatId, "Ну ничего себе! Так держать! Введи на поисковом сайте код поиска - " + this.keysToAnswers.get("Почтальон"))}))
            .set("463", new Riddle(
                "Тут должна быть загадка про вывеску",
                (context) => {},
                (context, chatId) => {context.telegram.sendMessage(chatId, "Введи на поисковом сайте код поиска - " + this.keysToAnswers.get("Вывеска"))}))   
            .set("554", new Riddle(
                "Раньше все из *нас* любили _пАрить_, зальемся и начнем пыхтеть… Теперь все у нас на электричестве или на горючей жиже. Один стою, пара бы пустить… ",
                (context) => {},
                (context, chatId) => {context.telegram.sendMessage(chatId, "Накурятся своих паровозов и... Введи на поисковом сайте код поиска - " + this.keysToAnswers.get("Паровоз"))}))
            .set("666", new Riddle(
                "Что виновны во всех твоих бедах \nЧто виновны во всех победах \nЧто в ответе за все твои качества \nВо *мне* они дружно мAтчатся \n( от англ _match_)",
                (context) => {},
                (context, chatId) => {context.telegram.sendMessage(chatId, "Генетика беспощадна! щи Ярика быстрее! Введи на поисковом сайте код поиска - " + this.keysToAnswers.get("Днк"))}));

    private keysToAnswers =
        new Map<string, string>()
                .set("Барак", "0")
                .set("Пес", "58977")
                .set("Почтальон", "74112")
                .set("Вывеска", "93463")
                .set("Паровоз", "32114")
                .set("Днк", "44503");
    
    private keyToCode = 
        new Map<string, string>()
                .set("Барак", "1")
                .set("Пес", "283")
                .set("Почтальон", "341")
                .set("Вывеска", "463")
                .set("Паровоз", "554")
                .set("Днк", "666");
                

    getRiddle(key: string) : Riddle | undefined {
        if (this.mapOfRiddles.has(key)) {
            return this.mapOfRiddles.get(key);
        }

        return new Riddle(RiddleMaster.noRiddle, (contex) => {}, (contex) => {})
    }

    getRiddleByKey = (keyWord: string) => {
        if(this.keyToCode.has(keyWord)){
            return this.getRiddle(this.keyToCode.get(keyWord)!)
        }
    }

    getAllKeys = () => {
        let result = new Array<string>();

        this.keysToAnswers.forEach((value, key, map) => {
            result.push(key);
        })

        return result;
    }

    constructor() {

    }

}
