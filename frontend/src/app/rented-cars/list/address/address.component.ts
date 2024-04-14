import { Component, Input } from '@angular/core';
import { IAddress } from '../../rented-cars.model';

@Component({
  selector: 'rc-address-cell',
  standalone: true,
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressCellComponent {
  @Input() address!: IAddress;
}
