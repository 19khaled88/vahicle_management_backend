import { Prisma, PrismaClient } from "@prisma/client";
import ApiError from "../../../error/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import {
  IFilters,
  IPaginationOptions,
} from "../../../interfaces/paginationOptions";
import {
  inventory_request_fields_constant
} from "./inventoryRequest.interface";

const prisma = new PrismaClient();

const createInventoryRequestService = async (payload: any) => {
  const response = await prisma.inventoryRequest.create({
    data: payload,
  });
  return response;
};

const getAllInventoryRequestService = async (
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
      OR: inventory_request_fields_constant.map((field) => {
        return {
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  //filtering code
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.InventoryRequestWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.inventoryRequest.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      paginatinOptions.sortBy && paginatinOptions.sortOrder
        ? {
          [paginatinOptions.sortBy]: paginatinOptions.sortOrder,
        }
        : { createdAt: "asc" },
    // select: {},
  });
  const total = await prisma.inventoryRequest.count();
  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};

// const getAllInventoryRequestService = async (
//   paginatinOptions: IPaginationOptions,
//   filterOptions: IFilters
// ) => {
 
 
// };

const getSingleInventoryRequestService = async (id: string) => {
  const ifExist = await prisma.inventoryRequest.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of manage request not available')
  }
  const result = await prisma.inventoryRequest.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateInventoryRequestService = async (payload: any) => {

  const ifExist = await prisma.inventoryRequest.findFirst({
    where: {
      id: payload.id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of manage request not available')
  }

  const result = await prisma.inventoryRequest.update({
    where: {
      id: payload.id,
    },
    data: payload.data,
  });
  return result;
};

const DeleteInventoryRequestService = async (id: string) => {
  const ifExist = await prisma.inventoryRequest.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of manage request not available')
  }
  const result = await prisma.inventoryRequest.delete({
    where: {
      id,
    },
  });
  return result;
};

export const inventoryRequestService = {
  createInventoryRequestService,
  getAllInventoryRequestService,
  getSingleInventoryRequestService,
  DeleteInventoryRequestService,
  updateInventoryRequestService,
};
