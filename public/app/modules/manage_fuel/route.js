"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageFuelRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateUser_1 = __importDefault(require("../../middlewares/validateUser"));
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.post('/create', (0, validateUser_1.default)(validation_1.manageFuelValidation.createManageFuel), controller_1.manageFueltControllers.createManageFuelController);
router.get('/list', controller_1.manageFueltControllers.getAllManageFuelController);
router.get('/single/:id', controller_1.manageFueltControllers.singleManageFuelController);
router.delete('/delete/:id', controller_1.manageFueltControllers.deleteManageFuelController);
router.patch('/update/:id', controller_1.manageFueltControllers.updateManageFuelController);
exports.ManageFuelRouter = router;
