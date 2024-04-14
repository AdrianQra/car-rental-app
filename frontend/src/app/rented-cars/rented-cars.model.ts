
export interface IRentedCar  {
  _id?: string,
  model: string,
  brand: string
  registrationNumber: string,
  vin: string,
  email: string | null,
  clientAddress: IAddress | null,
  currentAddress?: IAddress,
  rented: Boolean,
}

export interface IAddress {
  city: string,
  street: string,
  houseNumber: string,
  apartamentNumber: string | null,
  zipCode: string,
}