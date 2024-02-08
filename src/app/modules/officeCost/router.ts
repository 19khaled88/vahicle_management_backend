// import { RoleEnumType } from '@prisma/client'
import express from 'express'
// import { vehicleController } from './controller'
import validateRequest from '../../middlewares/validateUser';
// import { vehicleValidation} from './validation';
import Auth from '../../middlewares/Auth';
import { OfficeZodValidation } from './validation';
import { officeCostController } from './controller';
// import { authControllers } from './controller'

const router = express.Router()

router.post('/',validateRequest(OfficeZodValidation.OfficeCostZodSchema),officeCostController.createOfficeCostController )
router.get('/',officeCostController.getAllOfficeCostController)
router.get('/:id',officeCostController.getSingleOfficeCostController)
router.delete('/:id',officeCostController.deleteOfficeCostController)
router.patch('/:id',officeCostController.updateOfficeCostController)

export const officeCosRouter = router