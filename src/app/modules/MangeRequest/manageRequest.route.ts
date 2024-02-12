import express from 'express'
import validateRequest from '../../middlewares/validateUser';
import Auth from '../../middlewares/Auth';
import { manageRequestValidation } from './manageRequest.validation';
import { manageRequestService } from './manageRequest.service';
import { manageRequestControllers } from './manageRequest.controller';


const router = express.Router()

router.post('/',validateRequest(manageRequestValidation.createZodSchema),manageRequestControllers.createMangeRequestController)
router.get('/',manageRequestControllers.getAllIMangeRequestController)
router.get('/:id',manageRequestControllers.singleManageRequestController)
router.delete('/:id',manageRequestControllers.deleteMangeRequestController)
router.patch('/:id',manageRequestControllers.updateManageRequestController)

export const manageRequestRouter = router