import { Prisma, PrismaClient } from "@prisma/client";
import ApiError from "../../../error/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IFilters, IPaginationOptions } from "../../../interfaces/paginationOptions";
import { response } from "express";


const prisma = new PrismaClient();

const getAllOfficeCosService = async () => {
    const response = await prisma.$transaction(async transactionClient=>{
        const driverResult = await transactionClient.driver.findMany({
            select:{
                id:true,
                name:true, 
            }
        });

        const vehicleResult = await transactionClient.vehicle.findMany({
            select:{
                id:true,
                brand:true,
                model:true
            }
        })
        return {driverResult, vehicleResult}

    })
    

    return response
};

export const SpecialApiServices = {
    getAllOfficeCosService
}