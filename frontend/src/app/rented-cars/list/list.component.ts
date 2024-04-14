import { Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { IRentedCar } from '../rented-cars.model';
import { Observable, take } from 'rxjs';
import { RentedCarsService } from '../rented-cars.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';
import { AddressCellComponent } from './address/address.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'rc-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
    AddressCellComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  rentedCars$!: Observable<IRentedCar[]>;
  displayedColumns: string[] = [
    'vin',
    'registrationNumber',
    'currentAddress',
    'model',
    'brand',
    'rented',
    'clientDetails',
    'actions'
  ];

  menuOpen = false;

  constructor(
    private rentedCarsService: RentedCarsService,
    private router: Router,
    public dialog: MatDialog, 
    private _snackbar: MatSnackBar,
    ) {
    this.fetchRentedCarsData();
    this.rentedCars$ = this.rentedCarsService.rentedCars$;

    setInterval(() => {
      if(!this.menuOpen) {
        this.fetchRentedCarsData();
      }
    }, 5000);
  }

  fetchRentedCarsData(): void {
    this.rentedCarsService.fetchRentedCarsData();
  }

  openRentedCarRemovalDialog(rentedCar: IRentedCar): void {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      data: rentedCar,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.rentedCarsService.removeCar(rentedCar._id!).pipe(take(1)).subscribe(
          () => {
            this.fetchRentedCarsData();
            this._snackbar.open('Rented car was successfully removed', 'close', { duration: 3000});
          }
        );
      }
    });
  }
 
  navigateToForm(id?: string) {
    this.router.navigate([{outlets: {modal: id ? `form/${id}` : 'form'}}]) 
  }

}
