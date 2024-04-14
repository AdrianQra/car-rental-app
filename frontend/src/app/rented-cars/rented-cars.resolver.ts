import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs";
import { IRentedCar } from "./rented-cars.model";
import { RentedCarsService } from "./rented-cars.service";

export const rentedCarResolver: ResolveFn<IRentedCar> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(RentedCarsService).getRentedCarDetails(route.paramMap.get('id')!).pipe(
        map(rentedCar => rentedCar)
      );
};
