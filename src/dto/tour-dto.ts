import {ITour} from "../interfaces/tour";

export class TourDto implements ITour {
    description: string;
    id: string;
    name: string;
    img: string;
    price:string;
    tourOperator:string;
    type: string;
    date: string;

    constructor(name,description, tourOperator,price,img) {
        this.name = name;
        this.description = description;
        this.tourOperator = tourOperator;
        this.price = price;
        this.img = img
    }
}