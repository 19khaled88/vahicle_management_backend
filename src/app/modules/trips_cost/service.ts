import { Prisma, PrismaClient } from "@prisma/client";
import ApiError from "../../../error/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IFilters, IPaginationOptions } from "../../../interfaces/paginationOptions";
import { ITripCostResponse, trip_cost_fields_constant } from "./interface";


const prisma = new PrismaClient()

const createCostService = async (payload: any) => {
  const response = await prisma.tripCost.create({
    data: payload
  })
  return response
}

const getAllTripCostService = async (
  paginatinOptions: IPaginationOptions,
  filterOptions: IFilters
): Promise<IGenericResponse<ITripCostResponse[]>> => {

  const { searchTerm, ...filterData } = filterOptions;
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginatinOptions);

  const andConditions = [];

  //searching code
  if (searchTerm) {
    andConditions.push({
      OR: trip_cost_fields_constant.map(field => {
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

  const whereCondition: Prisma.TripCostWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const response = await prisma.tripCost.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      paginatinOptions.sortBy && paginatinOptions.sortOrder
        ? {
          [paginatinOptions.sortBy]: paginatinOptions.sortOrder
        }
        : { createdAt: 'asc' },

    select: {
      id: true,
      passengerName: true,
      phone: true,
      trip_period: true,
      tollCost: true,
      parkingCost: true,
      startLocation: true,
      description: true,
      trip_id: true,
      // trip: {
      //   select: {
      //     driver:true,
      //     costs:true,
      //     passenger_count:true,
      //     trip_rent:true,
      //     vehicle:true,
      //   }
      // },
      createdAt: true,
      updatedAt: true,
    }

  })
  const total = await prisma.tripCost.count();

  return {
    meta: {
      limit,
      page,
      total
    },
    data: response
  };

}

const singleTripCostService = async (id: string) => {
  const ifExist = await prisma.tripCost.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of trip not available')
  }
  const response = await prisma.tripCost.findFirst({
    where: {
      id: id
    }
  })
  return response
}

const updateTripCostService = async (id: string, payload: any) => {
  const ifExist = await prisma.tripCost.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of trip not available')
  }
  const response = await prisma.tripCost.update({
    where: {
      id: id
    },
    data: payload
  });
  return response
}

const deleteTripCostService = async (id: string) => {
  const ifExist = await prisma.tripCost.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of trip not available')
  }
  const response = await prisma.tripCost.delete({
    where: {
      id: id
    }
  });
  return response
}





export const TripCostServices = {
  createCostService,
  getAllTripCostService,
  singleTripCostService,
  updateTripCostService,
  deleteTripCostService
}