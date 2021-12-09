import { Request, Response } from 'express';

import { httpError } from '../helpers/handleError';
import {
  createCar,
  deleteCar,
  getCar,
  listCars,
  updateCar,
} from '../services/car.service';

export default class CarController {
  public async create(req: Request, res: Response) {
    try {
      const car = await createCar(req.body);
      return res.json({
        success: true,
        data: {
          car,
        },
      });
    } catch (e: any) {
      httpError(res, e);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const car = await getCar(id);
      return res.json({
        success: true,
        data: {
          car,
        },
      });
    } catch (e: any) {
      httpError(res, e);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const cars = await listCars();
      return res.json({
        success: true,
        data: {
          cars,
        },
      });
    } catch (e: any) {
      httpError(res, e);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const cars = await updateCar(id, req.body);
      return res.json({
        success: true,
        data: {
          cars,
        },
      });
    } catch (e: any) {
      httpError(res, e);
    }
  }

  public async remove(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const cars = await deleteCar(id);
      return res.json({
        success: true,
        data: {
          cars,
        },
      });
    } catch (e: any) {
      httpError(res, e);
    }
  }
}
