"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryRequestRouter = void 0;
// import { RoleEnumType } from '@prisma/client'
const express_1 = __importDefault(require("express"));
// import { vehicleController } from './controller'
const validateUser_1 = __importDefault(require("../../middlewares/validateUser"));
const inventoryRequest_validation_1 = require("./inventoryRequest.validation");
const invenToryRequest_controller_1 = require("./invenToryRequest.controller");
// import { OfficeZodValidation } from './validation';
// import { officeCostController } from './controller';
// import { authControllers } from './controller'
const router = express_1.default.Router();
router.post('/', (0, validateUser_1.default)(inventoryRequest_validation_1.inventoryRequestValidation.createZodSchema), invenToryRequest_controller_1.inventoryRequestControllers.createInventoryRequestController);
router.get('/', invenToryRequest_controller_1.inventoryRequestControllers.getAllInventoryRequestController);
router.get('/single/:id', invenToryRequest_controller_1.inventoryRequestControllers.singleInventoryRequestController);
router.delete('/delete/:id', invenToryRequest_controller_1.inventoryRequestControllers.deleteInventoryRequestController);
router.patch('/update/:id', invenToryRequest_controller_1.inventoryRequestControllers.updateInventoryRequestController);
exports.inventoryRequestRouter = router;
