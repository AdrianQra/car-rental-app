import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { RentedCarsService } from "../rented-cars.service";
import { EMPTY, map, switchMap, timer } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class FormValidator {
    constructor(
        private rentedCarsService: RentedCarsService,
    ) {}

    validateRegistrationNumber(): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return timer(500).pipe(
                switchMap(() =>
                    this.rentedCarsService.verifyRegistrationNumber(control.value)
                    .pipe(map((result) => !result ? { invalidRegistrationNumber: true} : null)))
            );
        };
    }

    validateVin(): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return timer(500).pipe(
                switchMap(() =>
                    this.rentedCarsService.verifyVin(control.value)
                    .pipe(map((result) => !result ? { invalidVin: true} : null)))
            );
        };
    }

    validateCity(): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return timer(500).pipe(
                switchMap(() =>
                    this.rentedCarsService.verifyCity(control.value)
                    .pipe(map((result) => !result ? { invalidCity: true} : null)))
            );
        };
    }

    validateStreet(): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return timer(500).pipe(
                switchMap(() =>
                    this.rentedCarsService.verifyStreet(control.value)
                    .pipe(map((result) => !result ? { invalidStreet: true} : null)))
            );
        };
    }

    validateHouseNumber(): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return timer(500).pipe(
                switchMap(() =>
                    this.rentedCarsService.verifyHouseOrApartmentNumber(control.value)
                    .pipe(map((result) => !result ? { invalidHouseNumber: true} : null)))
            );
        };
    }

    validateApartmentNumber(): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return timer(500).pipe(
                switchMap(() => {
                    if (control.value) {
                        return this.rentedCarsService.verifyHouseOrApartmentNumber(control.value)
                        .pipe(map((result) => !result ? { invalidApartmentNumber: true} : null));
                    }
                    return EMPTY;
                })
            );
        };
    }

    validateZipCode(): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return timer(500).pipe(
                switchMap(() =>
                    this.rentedCarsService.verifyZipCode(control.value)
                    .pipe(map((result) => !result ? { invalidZipCode: true} : null)))
            );
        };
    }

    validateEmail(): AsyncValidatorFn {
        return (control: AbstractControl) => {
            return timer(500).pipe(
                switchMap(() =>
                    this.rentedCarsService.verifyEmail(control.value)
                    .pipe(map((result) => !result ? { invalidEmail: true} : null)))
            );
        };
    }

    


}