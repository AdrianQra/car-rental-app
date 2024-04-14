import { Express } from 'express'
import mongoose from 'mongoose';
import { carBrands, rentedCars } from './initial-data';
import { RentedCar } from '../rented-cars/rented-cars.model';
import { CarBrand } from '../car-brands/car-brands.model';

export const connectToMongo = (app: Express) => {
    const options = {
        useNewUrlParser: true,
        maxPoolSize: 10,
    };

    const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

    const connect = () => {
        mongoose
          .connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`, options)
            .then(async () => {
                console.log("MongoDB is connected");
                await CarBrand.insertMany(carBrands);
                await RentedCar.insertMany(rentedCars);
                app.emit("successfullMongoConnection");
            })
            .catch((err) => {
                console.log("MongoDB connection unsuccessful, retry in 2s", err);
                setTimeout(connect, 2000);
            });
      };
      connect();
}