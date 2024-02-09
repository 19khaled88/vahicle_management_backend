import { Prisma, PrismaClient } from "@prisma/client";
import ApiError from "../../../error/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IFilters, IPaginationOptions } from "../../../interfaces/paginationOptions";
import { IDriverSalaryResponse, driver_salary_fields_constant } from "./interface";


const prisma = new PrismaClient()

const createDriverSalaryService = async (payload: any) => {
  const response = await prisma.driverSalary.create({
    data: payload
  })
  return response
}

const getAllDriverSalaryService = async (
  paginatinOptions: IPaginationOptions,
  filterOptions: IFilters
): Promise<IGenericResponse<any>> => {

  const { searchTerm, ...filterData } = filterOptions;
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginatinOptions);

  const andConditions = [];

  //searching code
  if (searchTerm) {
    andConditions.push({
      OR: driver_salary_fields_constant.map(field => {
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

  const whereCondition: Prisma.driverSalaryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const response = await prisma.driverSalary.findMany({
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
      driver_id: true,
      amount: true,
      month:true,
      position:true,
      description: true,
      status: true,
      driver: {
        select: {
          id:true,
          name: true,
          // email: true,
          // join_date:true,
          // address: true,
          // avatar: true,
          // experience: true,
          // phone: true
        }
      },
      createdAt: true,
      updatedAt: true,
    },
  })
  const total = await prisma.driverSalary.count();

  return {
    meta: {
      limit,
      page,
      total
    },
    data: response
  };

}

const singleDriverSalarySerivce = async (id: string) => {
  const ifExist = await prisma.driverSalary.findFirst({
    where: {
      id: id
    }
  })
  if (ifExist) {
    throw new ApiError(400, 'This kind of trip not available')
  }
  const response = await prisma.driverSalary.findFirst({
    where: {
      id: id
    }
  })
  return response
}

const updateDriverSalaryService = async (id: string, payload: any) => {
  const ifExist = await prisma.driverSalary.findFirst({
    where: {
      id: id
    }
  })
  if (ifExist) {
    throw new ApiError(400, 'This kind of trip not available')
  }
  const response = await prisma.driverSalary.update({
    where: {
      id: id
    },
    data: payload
  });
  return response
}

const deleteDriverSalaryService = async (id: string) => {
  const ifExist = await prisma.driverSalary.findFirst({
    where: {
      id: id
    }
  })
  if (ifExist) {
    throw new ApiError(400, 'This kind of trip not available')
  }
  const response = await prisma.driverSalary.delete({
    where: {
      id: id
    }
  });
  return response
}


export const DriverSalaryServices = {
  createDriverSalaryService,
  getAllDriverSalaryService,
  singleDriverSalarySerivce,
  updateDriverSalaryService,
  deleteDriverSalaryService
}