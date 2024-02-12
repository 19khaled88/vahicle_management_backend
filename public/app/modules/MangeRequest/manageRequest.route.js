"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageRequestRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateUser_1 = __importDefault(require("../../middlewares/validateUser"));
const manageRequest_validation_1 = require("./manageRequest.validation");
const manageRequest_controller_1 = require("./manageRequest.controller");
const router = express_1.default.Router();
router.post('/', (0, validateUser_1.default)(manageRequest_validation_1.manageRequestValidation.createZodSchema), manageRequest_controller_1.manageRequestControllers.createMangeRequestController);
router.get('/', manageRequest_controller_1.manageRequestControllers.getAllIMangeRequestController);
router.get('/single/:id', manageRequest_controller_1.manageRequestControllers.singleManageRequestController);
router.delete('/delete/:id', manageRequest_controller_1.manageRequestControllers.deleteMangeRequestController);
router.patch('/update/:id', manageRequest_controller_1.manageRequestControllers.updateManageRequestController);
exports.manageRequestRouter = router;
