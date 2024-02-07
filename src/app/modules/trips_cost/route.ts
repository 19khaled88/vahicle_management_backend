import express from 'express';
import { tripCostControllers } from './controller';
import validateRequest from '../../middlewares/validateUser';
import { tripCostValidation } from './validation';


const router = express.Router();

router.post('/create', validateRequest(tripCostValidation.createTripCost),tripCostControllers.createCostController);
router.get('/list', tripCostControllers.getAllCostController);
router.get('/single/:id', tripCostControllers.singleTripCostController);
router.delete('/delete/:id', tripCostControllers.deleteTripCostController)
router.patch('/update/:id', tripCostControllers.updateTripCostController)

export const TripCostRouter = router;
