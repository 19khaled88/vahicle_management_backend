"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateUser_1 = __importDefault(require("../../middlewares/validateUser"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.post('/create', (0, validateUser_1.default)(validation_1.tripValidation.createTrip), controller_1.tripControllers.createController);
router.get('/list', controller_1.tripControllers.getAllController);
router.get('/single/:id', controller_1.tripControllers.getAllController);
router.delete('/delete/:id', controller_1.tripControllers.deleteTripController);
router.patch('/update/:id', controller_1.tripControllers.updateTripController);
exports.TripRouter = router;
