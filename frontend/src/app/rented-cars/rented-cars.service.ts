import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry, throwError, catchError, BehaviorSubject, take } from "rxjs";
import { IRentedCar } from "./rented-cars.model";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
    providedIn: 'root'
})
export class RentedCarsService {
    constructor(
        private http: HttpClient,
        private _snackbar: MatSnackBar,
    ) {
        
    }

    rentedCarsSubject$ = new BehaviorSubject<IRentedCar[]>([]);
    rentedCars$ = this.rentedCarsSubject$.asObservable();

    fetchRentedCarsData(): void { 
        this.http
        .get<IRentedCar[]>(`/api/rented-cars`)
        .pipe(
            take(1),
            retry(3),
            catchError(
                (err: HttpErrorResponse) => {
                    this.rentedCarsSubject$.next([]);
                    return throwError(() => err)
                })
        ).subscribe(
            (data) => this.rentedCarsSubject$.next(data),
        )
    }

    carBrands$: Observable<string[]> = this.http
        .get<string[]>(`/api/car-brands`)
        .pipe(
            retry(3),
            catchError(
                (err: HttpErrorResponse) => {
                    this._snackbar.open('Something went wrong while fetching brands data', 'close', { duration: 3000});
                    return throwError(() => err)
                })
        );

    getRentedCarDetails(id: string): Observable<IRentedCar> { 
            return this.http
            .get<IRentedCar>(`/api/rented-cars/${id}`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => {
                        this._snackbar.open('Something went wrong while fetching rented car details', 'close', { duration: 3000});
                        return throwError(() => err)
                    })
            );
        }

   addNewCar(data: IRentedCar): Observable<IRentedCar> { 
            return this.http
            .post<IRentedCar>(`/api/rented-cars/`, data)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => {
                        this._snackbar.open('Something went wrong while adding new car', 'close', { duration: 3000});
                        return throwError(() => err)
                    })
            );
        }

    updateCar(data: IRentedCar, id: string): Observable<IRentedCar> { 
            return this.http
            .patch<IRentedCar>(`/api/rented-cars/${id}`, data)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => {
                        this._snackbar.open('Something went wrong while updating new car', 'close', { duration: 3000});
                        return throwError(() => err)
                    })
            );
        }
        
    removeCar(id: string): Observable<IRentedCar> { 
            return this.http
            .delete<IRentedCar>(`/api/rented-cars/${id}`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => {
                        this._snackbar.open('Something went wrong while removing new car', 'close', { duration: 3000});
                        return throwError(() => err)
                    })
            );
        }


    specificBrandModels(brand: string): Observable<string[]> {
        return this.http
            .get<string[]>(`/api/car-brands/${brand}`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            );
    }

    verifyRegistrationNumber(registrationNumber: string): Observable<boolean> {
        return this.http
            .get<boolean>(`/api/rented-cars/verify/registration-number?value=${registrationNumber}`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            );
    }

    verifyVin(vin: string): Observable<boolean> {
        return this.http
            .get<boolean>(`/api/rented-cars/verify/vin?value=${vin}`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            );
    }

    verifyCity(city: string): Observable<boolean> {
        return this.http
            .get<boolean>(`/api/rented-cars/verify/city?value=${city}`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            );
    }

    verifyStreet(street: string): Observable<boolean> {
        return this.http
            .get<boolean>(`/api/rented-cars/verify/street?value=${street}`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            );
    }

    verifyHouseOrApartmentNumber(number: string): Observable<boolean> {
        return this.http
            .get<boolean>(`/api/rented-cars/verify/house-or-apartment-number?value=${number}`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            );
    }

    verifyZipCode(zipCode: string): Observable<boolean> {
        return this.http
            .get<boolean>(`/api/rented-cars/verify/zip-code?value=${zipCode}`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            );
    }

    verifyEmail(email: string): Observable<boolean> {
        return this.http
            .get<boolean>(`/api/rented-cars/verify/email?value=${email}`)
            .pipe(
                retry(3),
                catchError(
                    (err: HttpErrorResponse) => throwError(() => err))
            );
    }

}