import { Schema, model, ObjectId } from 'mongoose';

export interface ICar {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  plateNumber: string;
  carType: string;
  carBrand: string;
  carModel: string;
  country: string;
  state: string;
  city: string;
  date?: Date;
}

const schema = new Schema<ICar>({
  firstName: {
    type: String,
    require: true,
    min: 5,
    max: 100,
  },
  lastName: {
    type: String,
    require: true,
    min: 5,
    max: 100,
  },
  documentType: {
    type: String,
    require: true,
    min: 5,
    max: 100,
  },
  documentNumber: {
    type: String,
    require: true,
    min: 5,
    max: 100,
  },
  plateNumber: {
    type: String,
    require: true,
    min: 5,
    max: 100,
  },
  carType: {
    type: String,
    require: true,
    min: 5,
    max: 100,
  },
  carBrand: {
    type: String,
    require: true,
    min: 5,
    max: 100,
  },
  carModel: {
    type: String,
    require: true,
    min: 5,
    max: 100,
  },
  country: {
    type: String,
    require: true,
    min: 5,
    max: 100,
  },
  state: {
    type: String,
    require: true,
    min: 5,
    max: 100,
  },
  city: {
    type: String,
    require: true,
    min: 5,
    max: 100,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const CarModel = model<ICar>('Car', schema);

export default CarModel;
