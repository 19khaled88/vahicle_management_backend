import { Prisma, PrismaClient } from "@prisma/client";
import ApiError from "../../../error/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IFilters, IPaginationOptions } from "../../../interfaces/paginationOptions";
import {  IManageFuelResponse, manage_fuel_fields_constant } from "./interface";


const prisma = new PrismaClient()

const createManageFuelService = async (payload: any) => {
  const response = await prisma.manageFuel.create({
    data: payload
  })
  return response
}

const getAllManageFuelService = async (
  paginatinOptions: IPaginationOptions,
  filterOptions: IFilters
): Promise<IGenericResponse<IManageFuelResponse[]>> => {

  const { searchTerm, ...filterData } = filterOptions;
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginatinOptions);

  const andConditions = [];

  //searching code
  if (searchTerm) {
    andConditions.push({
      OR: manage_fuel_fields_constant.map(field => {
        return {
          [field]: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        };
      })
    });
  }

  
  //filtering code
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key]
        }
      }))
    });
  }
  console.log(andConditions)
  const whereCondition =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const response = await prisma.manageFuel.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      paginatinOptions.sortBy && paginatinOptions.sortOrder
        ? {
          [paginatinOptions.sortBy]: paginatinOptions.sortOrder
        }
        : { createAt: 'asc' },

    select: {
      id: true,
      amount:true,
      fuel_type:true,
      vehicle:{
        select:{
          id:true,
          brand:true,
          color:true,
          // fuelType:true,
          mileage:true,
          model:true,
          purchaseDate:true,
          seatCapacity:true,
          vehicleType:true,
        }
      },
      invoice_number:true,
      purchase_date:true,
      vehicle_id:true,
      ltr:true,
      createAt: true,
      updatedAt: true,
    }

  })
  const total = await prisma.manageFuel.count();

  return {
    meta: {
      limit,
      page,
      total
    },
    data: response
  };

}

const singleManageFuelService = async (id: string) => {
  const ifExist = await prisma.manageFuel.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of manage fuel data not available')
  }
  const response = await prisma.manageFuel.findFirst({
    where: {
      id: id
    }
  })
  return response
}

const updateManageFuelService = async (id: string, payload: any) => {
  const ifExist = await prisma.manageFuel.findFirst({
    where: {
      id: id
    }
  })
  console.log(ifExist)
  if (!ifExist) {
    throw new ApiError(400, 'This kind of manage fuel data not available')
  }
  const response = await prisma.manageFuel.update({
    where: {
      id: id
    },
    data: payload
  });
  return response
}

const deleteManageFuelService = async (id: string) => {
  const ifExist = await prisma.manageFuel.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of manage fuel data not available')
  }
  const response = await prisma.manageFuel.delete({
    where: {
      id: id
    }
  });
  return response
}





export const ManageFuelServices = {
  createManageFuelService,
  getAllManageFuelService,
  singleManageFuelService,
  updateManageFuelService,
  deleteManageFuelService
}