// import { RoleEnumType } from '@prisma/client'
import express from 'express'
// import { vehicleController } from './controller'
import validateRequest from '../../middlewares/validateUser';
// import { vehicleValidation} from './validation';
import Auth from '../../middlewares/Auth';
import { accessoryZodValidation } from './validation';
import { accessoryController } from './controller';
// import { authControllers } from './controller'

const router = express.Router()

router.post('/',validateRequest(accessoryZodValidation.AccessoryZodSchema),accessoryController.createAccessoryController )

router.get('/',accessoryController.getAllAccessoryController)
router.get('/single/:id',accessoryController.getSingleAccessoryController)
router.delete('/delete/:id',accessoryController.deleteAccessoryController)
router.patch('/update/:id',accessoryController.updateAccessoryController)

export const accessoryRouter = router