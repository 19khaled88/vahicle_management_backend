"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get('/list', controller_1.inventoryController.getAllInventoryController);
router.get('/single/:id', controller_1.inventoryController.singleInventoryController);
router.delete('/delete/:id', controller_1.inventoryController.deleteInventoryController);
router.patch('/update/:id', controller_1.inventoryController.updateInventoryController);
exports.InventoryRouter = router;
