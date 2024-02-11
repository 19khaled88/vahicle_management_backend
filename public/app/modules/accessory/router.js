"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessoryRouter = void 0;
// import { RoleEnumType } from '@prisma/client'
const express_1 = __importDefault(require("express"));
// import { vehicleController } from './controller'
const validateUser_1 = __importDefault(require("../../middlewares/validateUser"));
const validation_1 = require("./validation");
const controller_1 = require("./controller");
// import { authControllers } from './controller'
const router = express_1.default.Router();
router.post('/', (0, validateUser_1.default)(validation_1.accessoryZodValidation.AccessoryZodSchema), controller_1.accessoryController.createAccessoryController);
router.get('/', controller_1.accessoryController.getAllAccessoryController);
router.get('/:id', controller_1.accessoryController.getSingleAccessoryController);
router.delete('/:id', controller_1.accessoryController.deleteAccessoryController);
router.patch('/:id', controller_1.accessoryController.updateAccessoryController);
exports.accessoryRouter = router;
