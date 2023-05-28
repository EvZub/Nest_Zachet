import {Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ToursService} from "../../services/tours/tours.service";
import {ITour} from "../../interfaces/tour";
import {JwtAuthGuard} from "../../services/Authentication/jwt-auth.guard/jwt-auth.guard.service";

@Controller('tours')
export class ToursController {
    constructor(private toursService: ToursService) {
    }
    @Post()
    initTours(): Promise<ITour[]>{
       return this.toursService.generateTours();
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllTours(): Promise<ITour[]>{
        return this.toursService.getAllTours()
    }
    @Get(":id")
    //считываем id тура
    getTourById(@Param("id") id): Promise<ITour> {
        return this.toursService.getTourById(id);
    }


    @Delete()
    removeAllTours(): Promise<any>{
        return this.toursService.deleteTours();
    }


}
