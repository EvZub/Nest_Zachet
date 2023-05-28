import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {OrderService} from "../../services/order/order.service";
import {OrderDto} from "../../dto/order-dto";
import {Order} from "../../shemas/order";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {
    }
    @Post()
    initTours(@Body() data: OrderDto): void {
        //создаем объект
    const orderData = new OrderDto(data.age, data.birthDay, data.cardNumber, data.tourId, data.userId);
    //записываем объект в базу данных
    this.orderService.sendOrder(orderData);

}
    @Get("userId")
    getOrders(@Param("userId") userId): Promise<Order[]> {
        return this.orderService.getOrders(userId);
    }
}
