export class RiddleMaster {

    public static noRiddle: String = "No riddle";

    private mapOfRiddles = 
        new Map<string, string>()
            .set("1", "Riddle 1")
            .set("2", "Riddle 2");

    getRiddle(key: string) : string | undefined {
        if (this.mapOfRiddles.has(key)) {
            return this.mapOfRiddles.get(key);
        }

        return "No riddle"
    }

    constructor() {

    }

}