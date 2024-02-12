"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
// import { RoleEnumType } from '@prisma/client'
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateUser_1 = __importDefault(require("../../middlewares/validateUser"));
const validation_1 = require("./validation");
// import { authControllers } from './controller'
const router = express_1.default.Router();
router.post('/', (0, validateUser_1.default)(validation_1.vehicleValidation.createVehicle), controller_1.vehicleController.createVehicleController);
router.get('/', controller_1.vehicleController.getAllVehicleController);
router.get('/single/:id', controller_1.vehicleController.getSingleVehicleController);
router.delete('/delete/:id', controller_1.vehicleController.deleteVehicleController);
router.patch('/update/:id', controller_1.vehicleController.updateVehicleController);
exports.vehicleRouter = router;
