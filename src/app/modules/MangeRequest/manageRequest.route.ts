import express from 'express'
import validateRequest from '../../middlewares/validateUser';
import Auth from '../../middlewares/Auth';
import { manageRequestValidation } from './manageRequest.validation';
import { manageRequestService } from './manageRequest.service';
import { manageRequestControllers } from './manageRequest.controller';


const router = express.Router()

router.post('/create',validateRequest(manageRequestValidation.createZodSchema),manageRequestControllers.createMangeRequestController)
router.get('/list',manageRequestControllers.getAllIMangeRequestController)
router.get('/single/:id',manageRequestControllers.singleManageRequestController)
router.delete('/delete/:id',manageRequestControllers.deleteMangeRequestController)
router.patch('/update/:id',manageRequestControllers.updateManageRequestController)

export const manageRequestRouter = router