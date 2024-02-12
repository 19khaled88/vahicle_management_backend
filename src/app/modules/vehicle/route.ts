// import { RoleEnumType } from '@prisma/client'
import express from 'express'
import { vehicleController } from './controller'
import validateRequest from '../../middlewares/validateUser';
import { vehicleValidation} from './validation';
import Auth from '../../middlewares/Auth';
// import { authControllers } from './controller'

const router = express.Router()

router.post('/',validateRequest(vehicleValidation.createVehicle),vehicleController.createVehicleController )
router.get('/',vehicleController.getAllVehicleController)
router.get('/single/:id',vehicleController.getSingleVehicleController)
router.delete('/delete/:id',vehicleController.deleteVehicleController)
router.patch('/update/:id',vehicleController.updateVehicleController)

export const vehicleRouter = router