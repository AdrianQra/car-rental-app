import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RentedCarsService } from '../../rented-cars.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'rc-details',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    CommonModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  form!: FormGroup;
  carBrands$!: Observable<string[]>;
  brandModels$!: Observable<string[]>;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private rentedCarsService: RentedCarsService
  ) {
    this.carBrands$ = this.rentedCarsService.carBrands$;
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get('carDetails') as FormGroup;
  }

  onBrandSelected(brand: string) {
    this.form.get('model')?.reset();
    this.brandModels$ = this.rentedCarsService.specificBrandModels(brand);
  }

  getErrorMessage(controlName: string) {
    const control = this.form?.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    } else if (control?.hasError('invalidRegistrationNumber')) {
      return 'Not a valid registration number';
    } else if (control?.hasError('invalidVin')) {
      return 'Not a valid VIN number, it must be 17 characters long and not contain the letters I, O or Q';
    } 
    return '';
  }
}
