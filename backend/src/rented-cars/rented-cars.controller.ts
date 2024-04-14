import * as rentedCarsService from "./rented-cars.service";
import { IRentedCar } from "./rented-cars.model";
import { Route, Get, Post, Patch, Delete, Path, Body, Controller, Query } from 'tsoa';

@Route('rented-cars')
export class RentedCarsController extends Controller {
    @Get('/')
    public async getAllRentedCars(): Promise<IRentedCar[]> {
        return rentedCarsService.getAllRentedCars();
    }

    @Get('{id}')
    public async getRentedCar(@Path() id: string): Promise<IRentedCar | null> {
        console.log(id);
        return rentedCarsService.getRentedCar(id);
    }

    @Post('/')
    public async createRentedCar(@Body() requestBody: IRentedCar): Promise<IRentedCar> {
        return rentedCarsService.createRentedCar(requestBody);
    }

    @Patch('{id}')
    public async updateRentedCar(@Path() id: string, @Body() body: IRentedCar): Promise<IRentedCar | null> {
        return rentedCarsService.updateRentedCar(id, body);
    }

    @Delete('{id}')
    public async removeRentedCar(@Path() id: string): Promise<IRentedCar | null> {
        return rentedCarsService.removeRentedCar(id);
    }

    @Get('verify/:field')
    public async verifyBrand(
        @Path() field: string,
        @Query() brand?: string,
        @Query() model?: string,
        @Query() value?: string,
    ): Promise<boolean> {
        const validators: any = {
            "brand": rentedCarsService.verifyBrand(value!),
            "model": rentedCarsService.verifyModel(brand!, model!),
            "registration-number": rentedCarsService.verifyRegex('registration-number',value!),
            "vin": rentedCarsService.verifyRegex('vin',value!),
            "street": rentedCarsService.verifyRegex('street',value!),
            "city": rentedCarsService.verifyRegex('city',value!),
            "zip-code": rentedCarsService.verifyRegex('zip-code',value!),
            "house-or-apartment-number": rentedCarsService.verifyRegex('house-or-apartment-number',value!),
            "email": rentedCarsService.verifyRegex('email',value!),
        };

        return validators[field]
    }
}
