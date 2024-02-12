import { Prisma, PrismaClient } from "@prisma/client";
import {
  IFilters,
  IPaginationOptions,
} from "../../../interfaces/paginationOptions";
import { IGenericResponse } from "../../../interfaces/common";

import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { string } from "zod";
import { Manage_request_fields_constant } from "./manageRequest.interface";

const prisma = new PrismaClient();

const createManageRequestService = async (payload: any) => {
  const response = await prisma.manageRequest.create({
    data: payload,
  });
  return response;
};

const getAllManageRequestService = async (
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
      OR: Manage_request_fields_constant.map((field) => {
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

  const whereCondition: Prisma.ManageRequestWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.manageRequest.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      paginatinOptions.sortBy && paginatinOptions.sortOrder
        ? {
            [paginatinOptions.sortBy]: paginatinOptions.sortOrder,
          }
        : { createdAt: "asc" },
include:{
  inventoryRequest:true
}
  });
  const total = await prisma.manageRequest.count();
  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};

const getSingleManageRequestService = async (id: string) => {
  const result = await prisma.manageRequest.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateManageRequestService = async (data: any, id: string) => {
  const result = await prisma.manageRequest.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};

const DeleteManageRequestService = async (id: string) => {
  const result = await prisma.manageRequest.delete({
    where: {
      id,
    },
  });
  return result;
};

export const manageRequestService = {
  createManageRequestService,
  getAllManageRequestService,
  getSingleManageRequestService,
  DeleteManageRequestService,
  updateManageRequestService,
};
