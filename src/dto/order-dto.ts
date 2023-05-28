import {IOrder} from "../interfaces/order";

export class OrderDto implements IOrder {
    age: string;
    birthDay: string;
    cardNumber: string;
    tourId: string;
    userId: string

    constructor(age, birthday, cardNumber, tourId, userId) {
        this.age = age;
        this.birthDay = birthday;
        this.cardNumber = cardNumber;
        this.tourId = tourId;
        this.userId = userId;
    }
}