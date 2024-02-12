import { Prisma, PrismaClient } from "@prisma/client";
import {
  IFilters,
  IPaginationOptions,
} from "../../../interfaces/paginationOptions";
import { IGenericResponse } from "../../../interfaces/common";
import {
  IInventoryRequestRespons,
  inventory_request_fields_constant,
} from "./inventoryRequest.interface";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { string } from "zod";

const prisma = new PrismaClient();

const createInventoryRequestService = async (payload: any) => {
  const response = await prisma.inventoryRequest.create({
    data: payload,
  });
  return response;
};

const getAllInventoryRequestService = async (
  filterOptions: IFilters,
  paginatinOptions: IPaginationOptions
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

const getSingleInventoryRequestService = async (id: string) => {
  const result = await prisma.inventoryRequest.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateInventoryRequestService = async (data: any, id: string) => {
  const result = await prisma.inventoryRequest.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};

const DeleteInventoryRequestService = async (id: string) => {
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
