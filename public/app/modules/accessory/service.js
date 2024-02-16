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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessoryService = void 0;
const client_1 = require("@prisma/client");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const interface_1 = require("./interface");
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const prisma = new client_1.PrismaClient();
const createAccessoryService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transactionClient.accessory.create({
            data: payload,
        });
        const ifExist = yield transactionClient.inventory.findFirst({
            where: {
                name: result.accessory_name
            }
        });
        if (result && ifExist) {
            const res = yield transactionClient.inventory.update({
                where: {
                    id: ifExist.id
                },
                data: {
                    quantity: ((ifExist === null || ifExist === void 0 ? void 0 : ifExist.quantity) + result.quantity),
                }
            });
            return res;
        }
        else if (result && !ifExist) {
            const res = yield transactionClient.inventory.create({
                data: {
                    name: result.accessory_name,
                    accessory_id: result.id,
                    quantity: result.quantity,
                    description: result.description
                }
            });
            return res;
        }
        return result;
    }));
    return response;
});
// const getAllAccessoryService = async (
//   paginatinOptions: IPaginationOptions,
//   filterOptions: IFilters
// ): Promise<IGenericResponse<any>> =>
//   // : Promise<IGenericResponse<IUserResponse[]>> =>
//   {
//     const { searchTerm, ...filterData } = filterOptions;
//     const { limit, page, skip } =
//       paginationHelpers.calculatePagination(paginatinOptions);
//     const andConditions = [];
//     //searching code
//     if (searchTerm) {
//       andConditions.push({
//         OR: accessory_fields_constant.map(field => {
//           return {
//             [field]: {
//               contains: searchTerm,
//               mode: 'insensitive',
//             },
//           };
//         }),
//       });
//     }
//     //filtering code
//     if (Object.keys(filterData).length > 0) {
//       andConditions.push({
//         AND: Object.keys(filterData).map(key => ({
//           [key]: {
//             equals: (filterData as any)[key],
//           },
//         })),
//       });
//     }
//     const whereCondition: Prisma.AccessoryWhereInput =
//       andConditions.length > 0 ? { AND: andConditions } : {};
//     const result = await prisma.accessory.findMany({
//       where: whereCondition,
//       skip,
//       take: limit,
//       orderBy:
//         paginatinOptions.sortBy && paginatinOptions.sortOrder
//           ? {
//               [paginatinOptions.sortBy]: paginatinOptions.sortOrder,
//             }
//           : { createdAt: 'asc' },
//       // select: {
//       // },
//     });
//     const total = await prisma.accessory.count();
//     return {
//       meta: {
//         limit,
//         page,
//         total,
//       },
//       data: result,
//     };
//   };
const getAllAccessoryService = (paginationOptions, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filterOptions, filterData = __rest(filterOptions, ["searchTerm"]); // Specify IFilters type explicitly for filterData
    const { limit, page, skip } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Searching code
    if (searchTerm) {
        andConditions.push({
            OR: interface_1.accessory_fields_constant.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // Filtering code
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key], // Use filterData[key] instead of (filterData as any)[key]
                },
            })),
        });
    }
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.accessory.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? {
                [paginationOptions.sortBy]: paginationOptions.sortOrder,
            }
            : { createdAt: 'asc' },
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
    const ifExist = yield prisma.accessory.findFirst({
        where: {
            id: id
        }
    });
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This kind of accessory data not available');
    }
    const result = yield prisma.accessory.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateAccessoryService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield prisma.accessory.findFirst({
        where: {
            id: id
        }
    });
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This kind of accessory data not available');
    }
    const result = yield prisma.accessory.update({
        where: {
            id: id,
        },
        data,
    });
    return result;
});
const DeleteAccessoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield prisma.accessory.findFirst({
        where: {
            id: id
        }
    });
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This kind of accessory data not available');
    }
    const deleteAccessory = yield prisma.accessory.delete({
        where: {
            id,
        },
    });
    const findInteventory = yield prisma.inventory.findFirst({
        where: {
            name: deleteAccessory.accessory_name
        }
    });
    console.log(deleteAccessory, findInteventory);
    //  if(findInteventory && deleteAccessory.quantity < findInteventory?.quantity){
    //   const res = await prisma.inventory.update({
    //     where:{
    //       id:findInteventory.id
    //     },
    //     data:{quantity:(findInteventory.quantity - deleteAccessory.quantity)}
    //   })
    //   return res
    //  }else if(findInteventory && deleteAccessory.quantity === findInteventory.quantity){
    //   const res = await prisma.inventory.delete({
    //     where:{
    //       id:findInteventory.id
    //     }
    //   })
    //   return res
    //  } else if(findInteventory && deleteAccessory.quantity > findInteventory.quantity){
    //   return null
    //  }
    return deleteAccessory;
});
exports.accessoryService = {
    createAccessoryService,
    getAllAccessoryService,
    getSingleAccessoryService,
    updateAccessoryService,
    DeleteAccessoryService
};
