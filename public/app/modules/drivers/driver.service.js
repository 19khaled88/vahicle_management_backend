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
exports.DriverService = void 0;
const date_fns_1 = require("date-fns");
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const hashPass_1 = require("../../../helpers/hashPass");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const driver_constant_1 = require("./driver.constant");
// const insertIntoDB = async (data: Driver): Promise<Driver> => {
//   const response = await prisma.$transaction(async transactionClient => {
//     const ifExist = await prisma.driver.findFirst({
//       where: {
//         email: data.email
//       }
//     })
//     if (ifExist) {
//       throw new ApiError(400, 'Data with the same email already exists')
//     }
//     //Get the current year
//     const currentYear = format(new Date(), 'yyyy');
//     // Find the user with the highest user id number
//     const lastUser = await prisma.driver.findFirst({
//       orderBy: {
//         user_id: 'desc',
//       },
//     });
//     // Extract the user id number and increment it by one
//     const lastUserIdNumber = lastUser && lastUser.user_id ? parseInt(lastUser.user_id.split('-')[2]) : 0;
//     const nextUserIdNumber = lastUserIdNumber + 1;
//     // Generate the user_id
//     const userId = `VMSD-${currentYear}-${nextUserIdNumber}`;
//     const result = await prisma.driver.create({
//       ...data,
//       user_id:userId
//     });
//     return result;
//   })
//   return response
// };
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const ifExist = yield transactionClient.driver.findFirst({
            where: {
                email: data.email
            }
        });
        if (ifExist) {
            throw new ApiError_1.default(400, 'This driver with same email exist');
        }
        // Get the current year
        const currentYear = (0, date_fns_1.format)(new Date(), 'yyyy');
        // Query the database to find the last user and extract the user id number
        const lastUser = yield transactionClient.driver.findFirst({
            orderBy: {
                user_id: 'desc', // Order by user_id in descending order to get the last user
            },
        });
        // Extract the user id number and increment it by one
        let nextUserIdNumber = 1; // Default to 1 if there are no users yet
        if (lastUser && lastUser.user_id != null) {
            const lastUserIdParts = lastUser.user_id.split('-');
            const lastUserIdNumber = lastUserIdParts[lastUserIdParts.length - 1];
            const afterFistFourDigits = parseInt(lastUserIdNumber.substring(4));
            nextUserIdNumber = afterFistFourDigits + 1;
        }
        // Generate the new user_id by combining the current year and the incremented user id number
        const userId = `VMSD-${currentYear}${nextUserIdNumber}`;
        //hash password
        const Hashed = yield (0, hashPass_1.hashPassword)('12345678');
        data.password = Hashed;
        // Create the driver with the generated user_id
        const result = yield transactionClient.driver.create({
            data: Object.assign(Object.assign({}, data), { password: Hashed, user_id: userId }),
        });
        return result;
    }));
    return response;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: driver_constant_1.driverSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                return {
                    [key]: {
                        equals: filterData[key],
                    },
                };
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.driver.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createAt: "desc",
            },
    });
    const total = yield prisma_1.default.driver.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield prisma_1.default.driver.findFirst({
        where: {
            id: id
        }
    });
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This user not exist');
    }
    const result = yield prisma_1.default.driver.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateOneInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield prisma_1.default.driver.findFirst({
        where: {
            id: id
        }
    });
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This user not exist');
    }
    const result = yield prisma_1.default.driver.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield prisma_1.default.driver.findFirst({
        where: {
            id: id
        }
    });
    if (!ifExist) {
        throw new ApiError_1.default(400, 'This user not exist');
    }
    const result = yield prisma_1.default.driver.delete({
        where: {
            id,
        },
    });
    return result;
});
const upComingTrip = () => __awaiter(void 0, void 0, void 0, function* () {
});
const tripHistory = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.DriverService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
};
