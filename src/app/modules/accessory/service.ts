import { Inventory, Prisma, PrismaClient } from "@prisma/client";
import { IFilters, IPaginationOptions } from "../../../interfaces/paginationOptions";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { accessory_fields_constant } from "./interface";
import ApiError from "../../../error/ApiError";

const prisma = new PrismaClient();
const createAccessoryService = async (payload: any) => {

  const response = await prisma.$transaction(async transactionClient=>{

    const result = await transactionClient.accessory.create({
      data: payload,
    });

    const ifExist = await transactionClient.inventory.findFirst({
      where:{
        name:result.accessory_name
      }
    })

    if(result && ifExist){
      const res = await transactionClient.inventory.create({
        data: {
          name:result.accessory_name,
          accessory_id:result.id,
          quantity:(ifExist?.quantity + result.quantity ),
          description:result.description
        }
      })
      return res
    } else if(result && !ifExist){
      const res = await transactionClient.inventory.create({
        data: {
          name:result.accessory_name,
          accessory_id:result.id,
          quantity:result.quantity,
          description:result.description
        }
      })
      return res
    }

    return result;
  })
  return response
};

// const getAllAccessoryService = async (
//   paginatinOptions: IPaginationOptions,
//   filterOptions: IFilters
// ): Promise<IGenericResponse<any>> =>
//   // : Promise<IGenericResponse<IUserResponse[]>> =>
//   {
//     const { searchTerm, ...filterData } = filterOptions;
//     const { limit, page, skip } =
//       paginationHelpers.calculatePagination(paginatinOptions);
//     const andConditions = [];
//     //searching code
//     if (searchTerm) {
//       andConditions.push({
//         OR: accessory_fields_constant.map(field => {
//           return {
//             [field]: {
//               contains: searchTerm,
//               mode: 'insensitive',
//             },
//           };
//         }),
//       });
//     }

//     //filtering code
//     if (Object.keys(filterData).length > 0) {
//       andConditions.push({
//         AND: Object.keys(filterData).map(key => ({
//           [key]: {
//             equals: (filterData as any)[key],
//           },
//         })),
//       });
//     }

//     const whereCondition: Prisma.AccessoryWhereInput =
//       andConditions.length > 0 ? { AND: andConditions } : {};
//     const result = await prisma.accessory.findMany({
//       where: whereCondition,
//       skip,
//       take: limit,
//       orderBy:
//         paginatinOptions.sortBy && paginatinOptions.sortOrder
//           ? {
//               [paginatinOptions.sortBy]: paginatinOptions.sortOrder,
//             }
//           : { createdAt: 'asc' },
//       // select: {

//       // },
//     });
//     const total = await prisma.accessory.count();
//     return {
//       meta: {
//         limit,
//         page,
//         total,
//       },
//       data: result,
//     };
//   };
const getAllAccessoryService = async (
  paginationOptions: IPaginationOptions,
  filterOptions: IFilters
): Promise<IGenericResponse<any>> => {
  const { searchTerm, ...filterData } = filterOptions; // Specify IFilters type explicitly for filterData
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const andConditions = [];

  // Searching code
  if (searchTerm) {
    andConditions.push({
      OR: accessory_fields_constant.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Filtering code
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: filterData[key], // Use filterData[key] instead of (filterData as any)[key]
        },
      })),
    });
  }

  const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.accessory.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? {
            [paginationOptions.sortBy]: paginationOptions.sortOrder,
          }
        : { createdAt: 'asc' },
  });
  const total = await prisma.accessory.count();
  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};
const getSingleAccessoryService = async (id: string) => {
  const ifExist = await prisma.accessory.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of accessory data not available')
  }

  const result = await prisma.accessory.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateAccessoryService = async (data: any, id: string) => {
  const ifExist = await prisma.accessory.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of accessory data not available')
  }
  const result = await prisma.accessory.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};

const DeleteAccessoryService = async (id: string) => {
  const ifExist = await prisma.accessory.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of accessory data not available')
  }
  const result = await prisma.accessory.delete({
    where: {
      id,
    },
  });
  return result;
};

export const accessoryService = {
    createAccessoryService,
    getAllAccessoryService,
    getSingleAccessoryService ,
    updateAccessoryService,
    DeleteAccessoryService
}