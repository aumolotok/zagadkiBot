import {createReadStream, ReadStream} from "fs";

export class ImageMaster{

    private static dratuti : string = "../zagadkiBot/src/images/Dratuti.png";
    private static dog : string = "../zagadkiBot/src/images/Dog.jpg";

    private static sign: string[] = [
        "../zagadkiBot/src/images/Sign1.jpg",
        "../zagadkiBot/src/images/Sign2.jpg",
        "../zagadkiBot/src/images/Sign3.jpg",
        "../zagadkiBot/src/images/Sign4.jpg",
        "../zagadkiBot/src/images/Sign5.jpg",
        "../zagadkiBot/src/images/Sign6.jpg"
    ]


    public static getDratuti = ()  => {
        return createReadStream(ImageMaster.dratuti)
    }

    public static getDog = () => {
        return createReadStream(ImageMaster.dog)
    }

    public static getSign = (index: number) => {
        return createReadStream(ImageMaster.sign[index])
    }
}