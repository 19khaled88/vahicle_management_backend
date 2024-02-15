import { Prisma, PrismaClient } from "@prisma/client";
import ApiError from "../../../error/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IFilters, IPaginationOptions } from "../../../interfaces/paginationOptions";
import { ITripResponse, trip_fields_constant } from "./interface";


const prisma = new PrismaClient()

const createService = async (payload: any) => {
  const response = await prisma.trip.create({
    data: payload
  })
  return response
}

const getAllTripService = async (
  paginatinOptions: IPaginationOptions,
  filterOptions: IFilters
): Promise<IGenericResponse<ITripResponse[]>> => {

  const { searchTerm, ...filterData } = filterOptions;
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginatinOptions);

  const andConditions = [];

  //searching code
  if (searchTerm) {
    andConditions.push({
      OR: trip_fields_constant.map(field => {
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

  const whereCondition: Prisma.TripWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const response = await prisma.trip.findMany({
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
      startLocation: true,
      endLocation: true,
      startTime: true,
      passengerName: true,
      passengerPhone: true,
      passengerCount: true,
      tripRent: true,
      status: true,
      tripPeriod: true,
      vehicle: {
        select: {
          id: true,
          fuelType: true,
          mileage: true,
          price:true,
          purchaseDate:true,
          seatCapacity:true,
          tax:true,
          vehicleType:true,
          brand: true,
          color: true,
          model: true
        }
      },
      driver: {
        select: {
          address: true,
          avatar: true,
          email:true,
          experience:true,
          license_no:true,
          name:true,
          nid:true
        }
      },
      vehicle_id: true,
      driver_id: true,

      tripCosts: true,
      costs: true
    },

  })
  const total = await prisma.trip.count();

  return {
    meta: {
      limit,
      page,
      total
    },
    data: response
  };

}

const singleTripSerivce = async (id: string) => {
  const ifExist = await prisma.trip.findFirst({
    where: {
      id: id
    }
  })
  console.log(ifExist)
  if (!ifExist) {
    throw new ApiError(400, 'This kind of trip not available')
  }
  const response = await prisma.trip.findFirst({
    where: {
      id: id
    }
  })
  return response
}

const updateTripService = async (id: string, payload: any) => {
  const ifExist = await prisma.trip.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of trip not available')
  }
  const response = await prisma.trip.update({
    where: {
      id: id
    },
    data: payload
  });
  return response
}

const deleteTripService = async (id: string) => {
  const ifExist = await prisma.trip.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of trip not available')
  }
  const response = await prisma.trip.delete({
    where: {
      id: id
    }
  });
  return response
}

const upcommingTrip = async()=>{
  const response = await prisma.$transaction(async transactionClient=>{
    const currentDate = new Date().toISOString();
    const result = transactionClient.trip.findMany({
      where:{
        startTime:{
          gt: currentDate
        }
      }
    })
    
    return result
  })
  console.log(response)
  return response
}



export const TripServices = {
  createService,
  getAllTripService,
  singleTripSerivce,
  updateTripService,
  deleteTripService,
  upcommingTrip
}