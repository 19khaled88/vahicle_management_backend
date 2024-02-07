import express from 'express';
import { DriverSalaryControllers } from './controller';
import validateRequest from '../../middlewares/validateUser';
import { driverSalaryValidation } from './validation';


const router = express.Router();

router.post('/create', validateRequest(driverSalaryValidation.createDriverSalary), DriverSalaryControllers.createDriverSalaryController);
router.get('/list', DriverSalaryControllers.getAllDriverSalaryController);
router.get('/single/:id', DriverSalaryControllers.singleDriverSalaryController);
router.delete('/delete/:id', DriverSalaryControllers.deleteDriverSalaryController)
router.patch('/update/:id', DriverSalaryControllers.updateDriverSalaryController)

export const DriverSalaryRouter = router;
