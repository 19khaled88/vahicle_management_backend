"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleProfileRouter = void 0;
const express_1 = __importDefault(require("express"));
// import validateRequest from '../../middlewares/validateUser';
// import { vehicleController } from './controller';
// import { vehicleProfileValidation } from './validation';
// import { authControllers } from './controller'
const router = express_1.default.Router();
// router.post('/',validateRequest(vehicleProfileValidation.createVehicleProfile),vehicleController.createVehicleController )
// router.get('/',vehicleController.getAllVehicleController)
// router.get('/single/:id',vehicleController.getSingleVehicleController)
// router.delete('/delete/:id',vehicleController.deleteVehicleController)
// router.patch('/update/:id',vehicleController.updateVehicleController)
exports.vehicleProfileRouter = router;
