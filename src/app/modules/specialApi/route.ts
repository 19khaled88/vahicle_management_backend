// import { RoleEnumType } from '@prisma/client'
import express from 'express'
// import { vehicleController } from './controller'
import validateRequest from '../../middlewares/validateUser';
import { SpecialApiController } from './controller';
// import { vehicleValidation} from './validation';


const router = express.Router()


router.get('/vehicleDriverlist', SpecialApiController.getVehicle_driver_Controller)


export const SpecialRouter = router