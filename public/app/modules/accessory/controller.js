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
exports.accessoryController = exports.getAllAccessoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const service_1 = require("./service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationOptions_1 = require("../../../common/paginationOptions");
const createAccessoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_1.accessoryService.createAccessoryService(req.body);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Accessory added successful',
            data: result,
        });
    }
    catch (err) {
        return next(err);
    }
});
// const getAllAccessoryController: RequestHandler = async (req, res, next) => {
//   // console.log(req.query)
//   try {
//     const filterOptions = pick(req.query, [
//       'accessory_name',
//       'quantity ',
//       'purchase_data',
//       'amount  ',
//       "expire_data",
//       'createdAt',
//       'updatedAt',
//     ]);
//     const paginationOptions = pick(req.query, paginationOptionFields);
//     const response = await accessoryService.getAllAccessoryService(
//       paginationOptions,
//       filterOptions
//     );
//     return sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Accessory retrieved successfully',
//       data: response,
//     });
//   } catch (err) {
//     return next(err);
//   }
// };
// const paginationOptionFields:any = ['limit', 'page', 'sortBy', 'sortOrder'];
const getAllAccessoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterOptions = (0, pick_1.default)(req.query, [
            'accessory_name',
            'quantity',
            'purchase_data',
            'amount',
            'expire_data',
            'createdAt',
            'updatedAt',
            'searchTerm', // Add searchTerm here to pick it from the query
        ]);
        const paginationOptions = (0, pick_1.default)(req.query, paginationOptions_1.paginationOptionFields);
        const response = yield service_1.accessoryService.getAllAccessoryService(paginationOptions, filterOptions);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Accessory retrieved successfully',
            data: response,
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.getAllAccessoryController = getAllAccessoryController;
const getSingleAccessoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = yield ((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
        const result = yield service_1.accessoryService.getSingleAccessoryService(id);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Single accessory get successful',
            data: result,
        });
    }
    catch (err) {
        return next(err);
    }
});
const deleteAccessoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield service_1.accessoryService.DeleteAccessoryService(id);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Accessory deleted successful',
            data: result,
        });
    }
    catch (err) {
        return next(err);
    }
});
const updateAccessoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield service_1.accessoryService.updateAccessoryService(data, id);
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Accessory uodated successful',
            data: result,
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.accessoryController = {
    createAccessoryController,
    updateAccessoryController,
    deleteAccessoryController,
    getSingleAccessoryController,
    getAllAccessoryController: exports.getAllAccessoryController
};
