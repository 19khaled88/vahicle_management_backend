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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialApiServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllOfficeCosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const driverResult = yield transactionClient.driver.findMany({
            select: {
                id: true,
                name: true,
            }
        });
        const vehicleResult = yield transactionClient.vehicle.findMany({
            select: {
                id: true,
                brand: true,
                model: true
            }
        });
        return { driverResult, vehicleResult };
    }));
    return response;
});
exports.SpecialApiServices = {
    getAllOfficeCosService
};
