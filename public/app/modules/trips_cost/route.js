"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripCostRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const validateUser_1 = __importDefault(require("../../middlewares/validateUser"));
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.post('/create', (0, validateUser_1.default)(validation_1.tripCostValidation.createTripCost), controller_1.tripCostControllers.createCostController);
router.get('/list', controller_1.tripCostControllers.getAllCostController);
router.get('/single/:id', controller_1.tripCostControllers.singleTripCostController);
router.delete('/delete/:id', controller_1.tripCostControllers.deleteTripCostController);
router.patch('/update/:id', controller_1.tripCostControllers.updateTripCostController);
exports.TripCostRouter = router;
