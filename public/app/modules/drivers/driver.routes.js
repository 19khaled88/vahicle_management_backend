"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateUser_1 = __importDefault(require("../../middlewares/validateUser"));
const driver_controller_1 = require("./driver.controller");
const driver_validation_1 = require("./driver.validation");
const router = express_1.default.Router();
router.post("/", (0, validateUser_1.default)(driver_validation_1.driverValidationSchema.createDriver), driver_controller_1.DriverController.insertIntoDB);
router.get("/", driver_controller_1.DriverController.getAllFromDB);
router.get("/single/:id", driver_controller_1.DriverController.getByIdFromDB);
router.patch("/update/:id", driver_controller_1.DriverController.updateOneInDB);
router.delete("/delete/:id", driver_controller_1.DriverController.deleteByIdFromDB);
exports.DriverRoutes = router;
