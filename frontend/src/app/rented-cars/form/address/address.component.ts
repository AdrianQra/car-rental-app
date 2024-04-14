import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormValidator } from '../form.validators';

@Component({
  selector: 'rc-address',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {
  @Input() controlName!: string;
  form!: FormGroup;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private formValidator: FormValidator
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.controlName) as FormGroup;
  }

  getErrorMessage(controlName: string) {
    const control = this.form?.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    } else if (control?.hasError('invalidStreet')) {
      return 'Not a valid street name';
    } else if (control?.hasError('invalidCity')) {
      return 'Not a valid city name';
    } else if (control?.hasError('invalidHouseNumber')) {
      return 'Not a valid house number';
    } else if (control?.hasError('invalidApartmentNumber')) {
      return 'Not a valid apartment number';
    } else if (control?.hasError('invalidZipCode')) {
      return 'Not a valid zip code';
    } 
    return '';
  }

  onApartmentNumberValueChange() {
    if (this.form.get('apartmentNumber')?.value) {
      this.form.get('apartmentNumber')?.setAsyncValidators(this.formValidator.validateApartmentNumber());
      this.form.get('apartmentNumber')?.updateValueAndValidity();
    }
  }
}
