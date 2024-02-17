import express from 'express';
import validateRequest from '../../middlewares/validateUser';
import { authControllers } from './controller';
import { userValidation } from './validation';

const router = express.Router();

router.post('/signIn', authControllers.loginController);
router.post('/register', validateRequest(userValidation.register), authControllers.registerController);
router.get('/allUser',authControllers.allUserControler)
router.post('/manageRole',authControllers.manageRoleController)
router.post('/createUser',authControllers.createController)
router.post('/authenticate',authControllers.authenticateController)
router.post('/manageRole/:id',authControllers.manageRoleController)
router.post('/delete/:id',authControllers.deleteController)

export const AuthRouter = router;
