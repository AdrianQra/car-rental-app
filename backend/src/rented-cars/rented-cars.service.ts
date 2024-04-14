import { IAddress, IRentedCar, RentedCar } from "./rented-cars.model";
import { getAllModels, getBrandId } from "../car-brands/car-brands.service";
import { randomAddresses } from "./rented-cars.data";

export async function getAllRentedCars() {
  return RentedCar.find();
}

export async function getRentedCar(id: string) {
  return RentedCar.findById(id);
}

export async function createRentedCar(data: IRentedCar) {
    const newCar: IRentedCar = data;
    if(
      await verifyBrand(newCar.brand!) &&
      await verifyModel(newCar.brand!, newCar.model!) &&
      verifyRegex('vin', newCar.vin!) &&
      verifyRegex('registration-number', newCar.registrationNumber!) &&
      verifyAddress(newCar.currentAddress!) &&
      (newCar.rented ?  verifyRegex('email', newCar.email!) : true) &&
      (newCar.clientAddress ? verifyAddress(newCar.clientAddress) : true)
    ) {
        return new RentedCar(newCar).save();
      }
    throw new Error("Invalid data");
}

export async function updateRentedCar(id: string, data: IRentedCar) {
  return RentedCar.findByIdAndUpdate(id, { ...data }, { new: true });
}

export async function removeRentedCar(id: string) {
  return RentedCar.findByIdAndDelete(id);
}

export const verifyRegex = (field: string, value: string) => {
  const regexes: {[key: string]: RegExp} = {
    "registration-number": /^[A-Z0-9]+$/,
    "vin": /^[A-HJ-NPR-Z0-9]{17}$/,
    "street": /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ. ]+$/,
    "city": /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/,
    "zip-code": /^[0-9]{2}-[0-9]{3}$/,
    "house-or-apartment-number": /^[0-9]+[A-Za-z]?$/,
    "email": /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  };

  return regexes[field].test(value);
}

export const verifyBrand = async (brand: string) => {
  return await getBrandId(brand) !== null;
}

export const verifyModel = async (brand: string, model: string) => {
  const models =  await getAllModels(brand);
  return !!models?.includes(model);
}

export const verifyAddress = (address: IAddress) => {
  return (
      verifyRegex('city', address.city) &&
      verifyRegex('street', address.street) &&
      verifyRegex('zip-code', address.zipCode) &&
      verifyRegex('house-or-apartment-number', address.houseNumber) &&
      address.apartmentNumber
          ? verifyRegex('house-or-apartment-number', address.apartmentNumber)
          : true
  );
}

export const updateCurrentAddressesOfRentedCars = async () => {
  const rentedCars = await RentedCar.find({rented: true});
  rentedCars.forEach(async (car) => {
    car.currentAddress = randomAddresses[Math.floor(Math.random() * randomAddresses.length)];
    await car.save();
  });
}