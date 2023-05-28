import { Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Tour, TourDocument} from "../../shemas/tour";
import {TourDto} from "../../dto/tour-dto";
import {ITour, ITourClient} from "../../interfaces/tour";

@Injectable()
export class ToursService {
    private toursCount = 10;// максимальное кол-во генераций записей
    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {
    }
    async generateTours(): Promise<ITour[]> {
        //генерирует сущности, которые будут в базе данных
        for (let i=0; i<= this.toursCount; i++){
            const tour = new TourDto('test'+i, 'test desc', 'test operator','300'+i,'');
            const tourData =  new this.tourModel(tour);
            await tourData.save();
        }
        return this.getAllTours()
    }
    async deleteTours(): Promise<any>{
        return this.tourModel.deleteMany({}) //удаляются все записи
    }
    async getAllTours(): Promise<ITour[]>{
        return this.tourModel.find();
    }
    async getTourById(id): Promise<ITour> {
        return this.tourModel.findById(id);
    }
    async uploadTour(body: ITourClient) {

        const tour = new TourDto(body.name, body.description,body.tourOperator,body.price, body.img)
        //формирование экземпляра TourModel
        const tourData = new this.tourModel(tour);
        //сохранение
        await tourData.save();
    }
}
