import {createReadStream, ReadStream} from "fs";

export class ImageMaster{

    private static dratuti : string = "../zagadkiBot/src/images/Dratuti.png";


    public static getDratuti = ()  => {
        return createReadStream(ImageMaster.dratuti)
    }
}