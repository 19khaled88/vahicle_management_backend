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
exports.tripControllers = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationOptions_1 = require("../../../common/paginationOptions");
const service_1 = require("./service");
const createController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.TripServices.createService(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'New trip created successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterOptions = (0, pick_1.default)(req.query, ['vehicle_id', 'user_id', 'start_location', 'end_location', 'start_time', 'end_time']);
        const paginationOptions = (0, pick_1.default)(req.query, paginationOptions_1.paginationOptionFields);
        const response = yield service_1.TripServices.getAllTripService(paginationOptions, filterOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'All trips retrieved successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const singleTripController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.TripServices.singleTripSerivce(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Single trip retrieved successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteTripController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.TripServices.deleteTripService(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Trip deleted successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const updateTripController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield service_1.TripServices.updateTripService(req.params.id, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Trip updated successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
exports.tripControllers = {
    createController,
    getAllController,
    singleTripController,
    deleteTripController,
    updateTripController
};
