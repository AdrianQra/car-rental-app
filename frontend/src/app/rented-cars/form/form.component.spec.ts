import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedCarsFormComponent } from './rented-cars-form.component';

describe('RentedCarsFormComponent', () => {
  let component: RentedCarsFormComponent;
  let fixture: ComponentFixture<RentedCarsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentedCarsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentedCarsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
