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
exports.DriverSalaryControllers = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationOptions_1 = require("../../../common/paginationOptions");
const service_1 = require("./service");
const createDriverSalaryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.DriverSalaryServices.createDriverSalaryService(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Driver salary created successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllDriverSalaryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterOptions = (0, pick_1.default)(req.query, ['driver_id', 'status']);
        const paginationOptions = (0, pick_1.default)(req.query, paginationOptions_1.paginationOptionFields);
        const response = yield service_1.DriverSalaryServices.getAllDriverSalaryService(paginationOptions, filterOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Driver salaries retrieved successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const singleDriverSalaryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.DriverSalaryServices.singleDriverSalarySerivce(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Driver salary retrieved successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteDriverSalaryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.DriverSalaryServices.deleteDriverSalaryService(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Driver salary deleted successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const updateDriverSalaryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.DriverSalaryServices.updateDriverSalaryService(req.params.id, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Driver salary updated successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
exports.DriverSalaryControllers = {
    createDriverSalaryController,
    getAllDriverSalaryController,
    singleDriverSalaryController,
    deleteDriverSalaryController,
    updateDriverSalaryController
};
