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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
<<<<<<< HEAD
Object.defineProperty(exports, "__esModule", { value: true });
exports.officeCostService = void 0;
const client_1 = require("@prisma/client");
const interface_1 = require("./interface");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
=======
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.officeCostService = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const interface_1 = require("./interface");
>>>>>>> 88a1cd83bd826cbc889f34d82f094c5e091a7d28
const prisma = new client_1.PrismaClient();
const createOfficeCosService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.officeCost.create({
        data: payload,
    });
    return result;
});
const getAllOfficeCosService = (paginatinOptions, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filterOptions, filterData = __rest(filterOptions, ["searchTerm"]);
    const { limit, page, skip } = paginationHelpers_1.paginationHelpers.calculatePagination(paginatinOptions);
    const andConditions = [];
    //searching code
    if (searchTerm) {
        andConditions.push({
            OR: interface_1.officeCost_fields_constant.map((field) => {
                return {
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                };
            }),
        });
    }
    //filtering code
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.officeCost.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: paginatinOptions.sortBy && paginatinOptions.sortOrder
            ? {
                [paginatinOptions.sortBy]: paginatinOptions.sortOrder,
            }
            : { createdAt: "asc" },
        // select: {
        // },
    });
    const total = yield prisma.officeCost.count();
    return {
        meta: {
            limit,
            page,
            total,
        },
        data: result,
    };
});
const getSingleOfficeCosService = (id) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
=======
    const ifExist = yield prisma.officeCost.findFirst({
        where: {
            id: id
        }
    });
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This kind of office cost data not available');
    }
>>>>>>> 88a1cd83bd826cbc889f34d82f094c5e091a7d28
    const result = yield prisma.officeCost.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateOfficeCosService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
=======
    const ifExist = yield prisma.officeCost.findFirst({
        where: {
            id: id
        }
    });
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This kind of office cost data not available');
    }
>>>>>>> 88a1cd83bd826cbc889f34d82f094c5e091a7d28
    const result = yield prisma.officeCost.update({
        where: {
            id: id,
        },
        data,
    });
    return result;
});
const DeleteOfficeCostService = (id) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
=======
    const ifExist = yield prisma.officeCost.findFirst({
        where: {
            id: id
        }
    });
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This kind of office cost data not available');
    }
>>>>>>> 88a1cd83bd826cbc889f34d82f094c5e091a7d28
    const result = yield prisma.officeCost.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.officeCostService = {
    DeleteOfficeCostService,
    updateOfficeCosService,
    getSingleOfficeCosService,
    getAllOfficeCosService,
    createOfficeCosService,
};
