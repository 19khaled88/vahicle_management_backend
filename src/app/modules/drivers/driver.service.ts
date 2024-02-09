import { Driver, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IDriverFilterRequest } from "./driver.interface";
import { IPaginationOptions } from "../../../interfaces/paginationOptions";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { driverSearchableFields } from "./driver.constant";
import MakeUserId from "../../../shared/create_id";

const insertIntoDB = async (data: Driver): Promise<Driver> => {
  // :Promise<Driver>

  const response = await MakeUserId('driver')
  const result = await prisma.driver.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IDriverFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Driver[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: driverSearchableFields.map((field) => ({
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
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.DriverWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.driver.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
          createAt: "desc",
        },
  });
  const total = await prisma.driver.count({
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
};

const getByIdFromDB = async (id: string): Promise<Driver | null> => {
  const result = await prisma.driver.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Driver>
): Promise<Driver> => {
  const result = await prisma.driver.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Driver> => {
  const result = await prisma.driver.delete({
    where: {
      id,
    },
  });
  return result;
};

export const DriverService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};