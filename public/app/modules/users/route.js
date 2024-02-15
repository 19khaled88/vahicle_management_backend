"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateUser_1 = __importDefault(require("../../middlewares/validateUser"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.post('/signIn', controller_1.authControllers.loginController);
router.post('/register', (0, validateUser_1.default)(validation_1.userValidation.register), controller_1.authControllers.registerController);
router.get('/allUser', controller_1.authControllers.allUserControler);
router.post('/createUser', controller_1.authControllers.createController);
router.post('/authenticate', controller_1.authControllers.authenticateController);
router.post('/manageRole/:id', controller_1.authControllers.manageRoleController);
router.post('/delete/:id', controller_1.authControllers.deleteController);
exports.AuthRouter = router;
