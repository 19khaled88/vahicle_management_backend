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
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessoryService = void 0;
const client_1 = require("@prisma/client");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const interface_1 = require("./interface");
const prisma = new client_1.PrismaClient();
const createAccessoryService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.accessory.create({
        data: payload,
    });
    return result;
});
const getAllAccessoryService = (paginatinOptions, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filterOptions, filterData = __rest(filterOptions, ["searchTerm"]);
    const { limit, page, skip } = paginationHelpers_1.paginationHelpers.calculatePagination(paginatinOptions);
    const andConditions = [];
    //searching code
    if (searchTerm) {
        andConditions.push({
            OR: interface_1.accessory_fields_constant.map(field => {
                return {
                    [field]: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                };
            }),
        });
    }
    //filtering code
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.accessory.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: paginatinOptions.sortBy && paginatinOptions.sortOrder
            ? {
                [paginatinOptions.sortBy]: paginatinOptions.sortOrder,
            }
            : { createdAt: 'asc' },
        // select: {
        // },
    });
    const total = yield prisma.accessory.count();
    return {
        meta: {
            limit,
            page,
            total,
        },
        data: result,
    };
});
const getSingleAccessoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.accessory.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateAccessoryService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.accessory.update({
        where: {
            id: id,
        },
        data,
    });
    return result;
});
const DeleteAccessoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.accessory.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.accessoryService = {
    createAccessoryService,
    getAllAccessoryService,
    getSingleAccessoryService,
    updateAccessoryService,
    DeleteAccessoryService
};
