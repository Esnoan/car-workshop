import Car, { ICar } from '../models/Car';

export const createCar = async (data: any): Promise<ICar> => {
  const car = new Car({
    firstName: data.firstName,
    lastName: data.lastName,
    documentNumber: data.documentNumber,
    documentType: data.documentType,
    plateNumber: data.plateNumber,
    carType: data.carType,
    carBrand: data.carBrand,
    carModel: data.carModel,
    country: data.country,
    state: data.state,
    city: data.city,
  });

  try {
    const savedCar = await car.save();
    return savedCar;
  } catch (error) {
    throw error;
  }
};

export const getCar = async (carId: string): Promise<ICar> => {
  try {
    const car = await Car.findById(carId);
    if (!car) {
      throw new Error('Car not found');
    }
    return car;
  } catch (error) {
    throw error;
  }
};

export const updateCar = async (cardId: string, data: any): Promise<ICar> => {
  const car = await Car.findById(cardId);

  if (!car) {
    throw new Error('Car not found');
  }

  car.firstName = data.firstName;
  car.lastName = data.lastName;
  car.documentNumber = data.documentNumber;
  car.documentType = data.documentType;
  car.plateNumber = data.plateNumber;
  car.carType = data.carType;
  car.carBrand = data.carBrand;
  car.carModel = data.carModel;
  car.country = data.country;
  car.state = data.state;
  car.city = data.city;

  try {
    const savedCar = await car.save();
    return savedCar;
  } catch (error) {
    throw error;
  }
};

export const listCars = async (): Promise<ICar[]> => {
  try {
    const cars = await Car.find();
    return cars;
  } catch (error) {
    throw error;
  }
};

export const deleteCar = async (carId: string): Promise<ICar[]> => {
  try {
    const cars = await Car.remove({ _id: carId });
    return cars;
  } catch (error) {
    throw error;
  }
};
