import { Model, Schema, model } from "mongoose";

export interface ICarBrand {
    brand: string;
    models: string[];
}

const carBrandSchema = new Schema<ICarBrand, Model<ICarBrand>>({
    models: [{type:String}],
    brand: {type:String},
});

export const CarBrand = model('car-brand', carBrandSchema);