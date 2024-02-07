import express from 'express';
import validateRequest from '../../middlewares/validateUser';

import { tripControllers } from './controller';
import { tripValidation } from './validation';

const router = express.Router();

router.post('/create', validateRequest(tripValidation.createTrip), tripControllers.createController);
router.get('/list', tripControllers.getAllController);
router.get('/single/:id', tripControllers.getAllController);
router.delete('/delete/:id', tripControllers.deleteTripController)
router.patch('/update/:id', tripControllers.updateTripController)

export const TripRouter = router;
