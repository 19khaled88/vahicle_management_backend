"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialRouter = void 0;
// import { RoleEnumType } from '@prisma/client'
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
// import { vehicleValidation} from './validation';
const router = express_1.default.Router();
router.get('/vehicleDriverlist', controller_1.SpecialApiController.getVehicle_driver_Controller);
exports.SpecialRouter = router;
