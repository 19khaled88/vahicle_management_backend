"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageFueltControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const paginationOptions_1 = require("../../../common/paginationOptions");
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const interface_1 = require("./interface");
const service_1 = require("./service");
const createManageFuelController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.ManageFuelServices.createManageFuelService(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'New manage fuel created successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllManageFuelController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterOptions = (0, pick_1.default)(req.query, interface_1.query_type);
        const paginationOptions = (0, pick_1.default)(req.query, paginationOptions_1.paginationOptionFields);
        const response = yield service_1.ManageFuelServices.getAllManageFuelService(paginationOptions, filterOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'All Manage fuel data retrieved successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const singleManageFuelController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.ManageFuelServices.singleManageFuelService(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Manage fuel data retrieved successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteManageFuelController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.ManageFuelServices.deleteManageFuelService(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Manage fuel data deleted successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const updateManageFuelController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.ManageFuelServices.updateManageFuelService(req.params.id, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Manage fuel data updated successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
exports.manageFueltControllers = {
    createManageFuelController,
    getAllManageFuelController,
    singleManageFuelController,
    deleteManageFuelController,
    updateManageFuelController
};
