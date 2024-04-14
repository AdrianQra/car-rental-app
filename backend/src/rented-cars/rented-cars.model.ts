import { Model, Schema, model } from "mongoose";

export interface IRentedCar  {
    model: string,
    brand: string
    registrationNumber: string,
    vin: string,
    email?: string | null,
    clientAddress?: IAddress | null,
    currentAddress?: IAddress | null,
    rented: boolean,
}

export interface IAddress {
  _id?: boolean,
  city: string,
  street: string,
  houseNumber: string,
  apartmentNumber: string | null,
  zipCode: string,
}

const addressSchema = new Schema<IAddress, Model<IAddress>>({
  _id: false,
  city: {type:String},
  street: {type:String},
  houseNumber: {type:String},
  apartmentNumber: {type:String, required: false, default: null},
  zipCode: {type:String}
});

const rentedCarSchema = new Schema<IRentedCar, Model<IRentedCar>>({
    model: {type:String}, 
    brand: {type:String},
    registrationNumber: {type:String},
    vin: {type:String},
    email: {type:String},
    clientAddress: {
      type: addressSchema,
      required: false,
      default: null
    },
    rented: {type:Boolean},
    currentAddress: {
      type: addressSchema,
      required: true
    }
});

export const RentedCar = model('rented-car', rentedCarSchema);