import { CarBrand } from "./car-brands.model";

async function getAllBrands() {
  const result = await CarBrand.find().select('brand').exec();
  return result.map((item) => item.brand);
}

async function getAllModels(brand: string) {
  const result = await CarBrand.findOne({ brand: brand }).select('models').exec();
  return result?.models || [];
}

async function getBrandId(brand: string) {
  const result = await CarBrand.exists({ brand: brand})
  return result;
}

export { getAllBrands, getBrandId, getAllModels};