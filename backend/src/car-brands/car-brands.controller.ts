import * as carBrandsService from "./car-brands.service";
import { Get, Path, Route } from "tsoa";

@Route('car-brands')
export class CarBrandsController {
    @Get('/')
    public async getAllBrands(): Promise<String[]> {
        return carBrandsService.getAllBrands()
    }

    @Get('{brand}')
    public async getAllModels(@Path() brand: string): Promise<string[]> {
        return carBrandsService.getAllModels(brand)
  }
}