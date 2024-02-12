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
exports.manageRequestControllers = void 0;
const manageRequest_service_1 = require("./manageRequest.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationOptions_1 = require("../../../common/paginationOptions");
const createMangeRequestController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield manageRequest_service_1.manageRequestService.createManageRequestService(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'manage Request created successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllIMangeRequestController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterOptions = (0, pick_1.default)(req.query, ['approve_status', 'inventory_request_id']);
        const paginationOptions = (0, pick_1.default)(req.query, paginationOptions_1.paginationOptionFields);
        const response = yield manageRequest_service_1.manageRequestService.getAllManageRequestService(paginationOptions, filterOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Manage Request retrieved successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const singleManageRequestController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield manageRequest_service_1.manageRequestService.getSingleManageRequestService(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Manage Request retrieved successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteMangeRequestController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield manageRequest_service_1.manageRequestService.DeleteManageRequestService(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Manage Request deleted successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
const updateManageRequestController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield manageRequest_service_1.manageRequestService.updateManageRequestService(req.params.id, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'ManageRequest updated successfully',
            data: response
        });
    }
    catch (error) {
        next(error);
    }
});
exports.manageRequestControllers = {
    createMangeRequestController,
    getAllIMangeRequestController,
    deleteMangeRequestController,
    singleManageRequestController,
    updateManageRequestController
};
