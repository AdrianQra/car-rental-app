import { Component, Inject } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { IRentedCar } from '../rented-cars.model';

@Component({
  selector: 'rc-remove-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './remove-dialog.component.html',
  styleUrl: './remove-dialog.component.scss'
})
export class RemoveDialogComponent {
  vin = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IRentedCar
  ){}
}
