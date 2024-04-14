import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address/address.component';
import { DetailsComponent } from './details/details.component';
import { FormValidator } from './form.validators';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { take } from 'rxjs';
import { IRentedCar } from '../rented-cars.model';
import { RentedCarsService } from '../rented-cars.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'rc-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIcon,
    CommonModule,
    AddressComponent,
    DetailsComponent,
    MatTooltipModule
  ],
  providers: [
    FormValidator,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  form: any = this.fb.group({
    carDetails: this.fb.group({
      model: ['', Validators.required],
      brand: ['', Validators.required],
      registrationNumber: ['', Validators.required, this.formValidator.validateRegistrationNumber()],
      vin: ['', Validators.required, this.formValidator.validateVin()],
    })
  });
  rentedCarDetails?: IRentedCar;
  rented = false;

  constructor(
    private fb: FormBuilder,
    private formValidator: FormValidator,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private rentedCarsService: RentedCarsService,
    private _snackbar: MatSnackBar,
  ) {
  }
  
  ngOnInit(): void {
    this.activatedRoute.data.pipe(take(1)).subscribe(
      ({data}) => {
      this.rentedCarDetails = data;
      if(data){
        this.carDetails.get('brand').setValue(data.brand);
        this.carDetails.get('model').setValue(data.model);
        this.carDetails.get('vin').setValue(data.vin);
        this.carDetails.get('registrationNumber').setValue(data.registrationNumber);
        this.rented = data.rented;

        if(this.rented){
          this.form.addControl('clientEmail', this.fb.control(data.email, Validators.required, this.formValidator.validateEmail()));
          this.form.addControl('clientAddress', this.fb.group({
            city: [data.clientAddress.city, Validators.required, this.formValidator.validateCity()],
            street: [data.clientAddress.street, Validators.required, this.formValidator.validateStreet()],
            houseNumber: [data.clientAddress.houseNumber, Validators.required, this.formValidator.validateHouseNumber()],
            apartmentNumber: [data.clientAddress.apartamentNumber || ''],
            zipCode: [data.clientAddress.zipCode, Validators.required, this.formValidator.validateZipCode()]
          }));
        }
      } else {
        this.form.addControl('currentAddress', this.fb.group({
            city: ['', Validators.required, this.formValidator.validateCity()],
            street: ['', Validators.required, this.formValidator.validateStreet()],
            houseNumber: ['', Validators.required, this.formValidator.validateHouseNumber()],
            apartmentNumber: [''],
            zipCode: ['', Validators.required, this.formValidator.validateZipCode()]
          }),
        );
      }
    })

   
  }

  useDefaultAddress() {
    this.currentAddress?.get('city')?.setValue('Warsaw');
    this.currentAddress?.get('street')?.setValue('Krucza');
    this.currentAddress?.get('zipCode')?.setValue('00-123');
    this.currentAddress?.get('houseNumber')?.setValue('3');
    this.currentAddress?.get('apartmentNumber')?.setValue('4');
  }

  onSubmit() {
    if(!this.form.invalid) {
      const data = {
        brand: this.carDetails.get('brand').value,
        model: this.carDetails.get('model').value,
        vin: this.carDetails.get('vin').value,
        registrationNumber: this.carDetails.get('registrationNumber').value,
        currentAddress: this.currentAddress ? this.currentAddress.value : this.rentedCarDetails?.currentAddress,
        email: this.rented ? this.form.get('clientEmail')?.value : null,
        clientAddress:  this.rented ? this.clientAddress.value : null,
        rented: this.rented
      }
      if(this.rentedCarDetails?._id) {
        this.rentedCarsService.updateCar(data, this.rentedCarDetails._id).pipe(take(1)).subscribe(
          () => {
            this.rentedCarsService.fetchRentedCarsData();
            this.navigateBack();
            this._snackbar.open('Rented car was successfully updated', 'close', { duration: 3000});
          }
        );
      } else {
        this.rentedCarsService.addNewCar(data).pipe(take(1)).subscribe(
          () => {
            this.rentedCarsService.fetchRentedCarsData();
            this.navigateBack();
            this._snackbar.open('Rented car was successfully created', 'close', { duration: 3000});
          }
        );
      }


    }
  }

  navigateBack(){
    this.router.navigate([{outlets: { modal: null }}]) 
  }

  getErrorMessage(controlName: string) {
    const control = this.form?.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    } else if (control?.hasError('invalidEmail')) {
      return 'Not a valid email address';
    } 
    return '';
  }

  onRentedStatusChange(event: MatSlideToggleChange) {
    this.rented = event.checked;
    if(this.rented) {
      this.form.addControl('clientEmail', this.fb.control('', Validators.required, this.formValidator.validateEmail()));
      this.form.addControl('clientAddress', this.fb.group({
        city: ['', Validators.required, this.formValidator.validateCity()],
        street: ['', Validators.required, this.formValidator.validateStreet()],
        houseNumber: ['', Validators.required, this.formValidator.validateHouseNumber()],
        apartmentNumber: [''],
        zipCode: ['', Validators.required, this.formValidator.validateZipCode()]
      }));
    } else {
      this.form.removeControl('clientEmail');
      this.form.removeControl('clientAddress');
    }
  }
 
  get carDetails() {
    return this.form.get('carDetails');
  }

  get currentAddress() {
    return this.form.get('currentAddress');
  }

  get clientAddress() {
    return this.form.get('clientAddress');
  }

}
