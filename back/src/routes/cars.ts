import express, { Request, Response } from 'express';
import CarController from '../controllers/car.controller';
import { handleToken } from '../helpers/handleToken';
const router = express.Router();

const carController = new CarController();

router.get('/', carController.list);
router.post('/', carController.create);
router.get('/:id', carController.get);
router.put('/:id', carController.update);
router.delete('/:id', carController.remove);

export { router };
