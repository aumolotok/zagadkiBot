import {createReadStream, ReadStream} from "fs";

export class ImageMaster{

    private static dratuti : string = "../zagadkiBot/src/images/Dratuti.png";
    private static dog : string = "../zagadkiBot/src/images/Dog.jpg";


    public static getDratuti = ()  => {
        return createReadStream(ImageMaster.dratuti)
    }

    public static getDog = () => {
        return createReadStream(ImageMaster.dog)
    }
}