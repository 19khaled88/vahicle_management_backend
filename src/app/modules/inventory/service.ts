import { Prisma, PrismaClient } from "@prisma/client";
import ApiError from "../../../error/ApiError";
import { IFilters, IPaginationOptions } from "../../../interfaces/paginationOptions";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { inventory_fields_constant } from "./interface";


const prisma = new PrismaClient();


const getAllInventoryService = async (
  paginationOptions: IPaginationOptions,
  filterOptions: IFilters
) => {

  const { searchTerm, ...filterData } = filterOptions;
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  //searching code
  if (searchTerm) {
    andConditions.push({
      OR: inventory_fields_constant.map(field => {
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

  const whereCondition: Prisma.InventoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};


  const response = await prisma.inventory.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
          [paginationOptions.sortBy]: paginationOptions.sortOrder
        }
        : { createAt: 'asc' },
  });

  const total = await prisma.inventory.count();
  return {
    meta: {
      limit,
      page,
      total
    },
    data: response
  };
};

const singleInventorySerivce = async (id: string) => {
  const ifExist = await prisma.inventory.findFirst({
    where: {
      id: id
    }
  })
  if (ifExist) {
    throw new ApiError(400, 'This kind of inventory not available')
  }
  const response = await prisma.inventory.findFirst({
    where: {
      id: id
    }
  })
  return response
}

const updateInventoryService = async (id: string, payload: any) => {
  const ifExist = await prisma.inventory.findFirst({
    where: {
      id: id
    }
  })
  if (ifExist) {
    throw new ApiError(400, 'This kind of inventory not available')
  }
  const response = await prisma.inventory.update({
    where: {
      id: id
    },
    data: payload
  });
  return response
}

const deleteInventoryService = async (id: string) => {
  const ifExist = await prisma.inventory.findFirst({
    where: {
      id: id
    }
  })
  if (ifExist) {
    throw new ApiError(400, 'This kind of inventory not available')
  }
  const response = await prisma.inventory.delete({
    where: {
      id: id
    }
  });
  return response
}


export const inventoryService = {
  getAllInventoryService,
  singleInventorySerivce,
  deleteInventoryService,
  updateInventoryService
}