import { Prisma, PrismaClient } from "@prisma/client";
import { officeCost_fields_constant } from "./interface";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IFilters, IPaginationOptions } from "../../../interfaces/paginationOptions";

const prisma = new PrismaClient();
const createOfficeCosService = async (payload: any) => {
  const result = await prisma.officeCost.create({
    data: payload,
  });
  return result;
};

const getAllOfficeCosService = async (
  paginatinOptions: IPaginationOptions,
  filterOptions: IFilters
): Promise<IGenericResponse<any>> =>
  // : Promise<IGenericResponse<IUserResponse[]>> =>
  {
    const { searchTerm, ...filterData } = filterOptions;
    const { limit, page, skip } =
      paginationHelpers.calculatePagination(paginatinOptions);
    const andConditions = [];
    //searching code
    if (searchTerm) {
      andConditions.push({
        OR: officeCost_fields_constant.map((field) => {
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

    const whereCondition: Prisma.OfficeCostWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma.officeCost.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy:
        paginatinOptions.sortBy && paginatinOptions.sortOrder
          ? {
              [paginatinOptions.sortBy]: paginatinOptions.sortOrder,
            }
          : { createdAt: "asc" },
      // select: {

      // },
    });
    const total = await prisma.officeCost.count();
    return {
      meta: {
        limit,
        page,
        total,
      },
      data: result,
    };
  };

const getSingleOfficeCosService = async (id: string) => {
  const result = await prisma.officeCost.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOfficeCosService = async (data: any, id: string) => {
  const result = await prisma.officeCost.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};

const DeleteOfficeCostService = async (id: string) => {
  const result = await prisma.officeCost.delete({
    where: {
      id,
    },
  });
  return result;
};

export const officeCostService = {
  DeleteOfficeCostService,
  updateOfficeCosService,
  getSingleOfficeCosService,
  getAllOfficeCosService,
  createOfficeCosService,
};
