import express from 'express';
import { manageFueltControllers } from './controller';
import validateRequest from '../../middlewares/validateUser';
import { manageFuelValidation } from './validation';


const router = express.Router();

router.post('/create', validateRequest(manageFuelValidation.createManageFuel),manageFueltControllers.createManageFuelController);
router.get('/list', manageFueltControllers.getAllManageFuelController);
router.get('/single/:id', manageFueltControllers.singleManageFuelController);
router.delete('/delete/:id', manageFueltControllers.deleteManageFuelController)
router.patch('/update/:id', manageFueltControllers.updateManageFuelController)

export const ManageFuelRouter = router;
