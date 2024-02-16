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
exports.officeCostController = void 0;
const pick_1 = __importDefault(require("../../../shared/pick"));
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const service_1 = require("./service");
const paginationOptions_1 = require("../../../common/paginationOptions");
const createOfficeCostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_1.officeCostService.createOfficeCosService(req.body);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "OfficeCost added successful",
            data: result,
        });
    }
    catch (err) {
        return next(err);
    }
});
const getAllOfficeCostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterOptions = (0, pick_1.default)(req.query, ["cost_name", "description", "amount", "createdAt", "updatedAt",]);
        const paginationOptions = (0, pick_1.default)(req.query, paginationOptions_1.paginationOptionFields);
        const response = yield service_1.officeCostService.getAllOfficeCosService(paginationOptions, filterOptions);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Accessory retrieved successfully",
            data: response,
        });
    }
    catch (err) {
        return next(err);
    }
});
const getSingleOfficeCostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = yield ((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
        const result = yield service_1.officeCostService.getSingleOfficeCosService(id);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Single OfficeCost get successful",
            data: result,
        });
    }
    catch (err) {
        return next(err);
    }
});
const deleteOfficeCostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        // const isAdmin = req?.user?.role === "admin" || "super-admin";
        // // console.log(isAdmin, "ata req");
        // if (!isAdmin) {
        //   res.status(404).json({
        //     success: true,
        //     statusCode: 404,
        //     message: "Unauthorized access",
        //   });
        // }
        const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
        const result = yield service_1.officeCostService.DeleteOfficeCostService(id);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "OfficeCost deleted successful",
            data: result,
        });
    }
    catch (err) {
        return next(err);
    }
});
const updateOfficeCostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        // const isAdmin = req?.user?.role === "admin";
        // if (!isAdmin) {
        //   return res.status(404).json({
        //     success: true,
        //     statusCode: 404,
        //     message: "Unauthorized access",
        //   });
        // }
        const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
        const data = req.body;
        const result = yield service_1.officeCostService.updateOfficeCosService(data, id);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "OfficeCost uodated successful",
            data: result,
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.officeCostController = {
    createOfficeCostController,
    updateOfficeCostController,
    deleteOfficeCostController,
    getSingleOfficeCostController,
    getAllOfficeCostController,
};
