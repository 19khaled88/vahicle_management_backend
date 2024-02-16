import { Prisma, PrismaClient } from "@prisma/client";
import ApiError from "../../../error/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IFilters, IPaginationOptions } from "../../../interfaces/paginationOptions";
import { IOfficeCostResponse, officeCost_fields_constant } from "./interface";

const prisma = new PrismaClient();
const createOfficeCosService = async (payload: any) => {
  const result = await prisma.officeCost.create({
    data: payload,
  });
  return result;
};

// const getAllOfficeCosService = async (
//   filterOptions: IFilters,
//   paginatinOptions: IPaginationOptions,
// ): Promise<IGenericResponse<IOfficeCostResponse[]>> => {
//   const { searchTerm, ...filterData } = filterOptions;
//   const { limit, page, skip } =
//     paginationHelpers.calculatePagination(paginatinOptions);
//   console.log(limit, page, skip)
//   const andConditions = [];
//   //searching code
//   if (searchTerm) {
//     andConditions.push({
//       OR: officeCost_fields_constant.map((field) => {
//         return {
//           [field]: {
//             contains: searchTerm,
//             mode: "insensitive",
//           },
//         };
//       }),
//     });
//   }

//   //filtering code
//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map(key => ({
//         [key]: {
//           equals: (filterData as any)[key]
//         }
//       }))
//     });
//   }

//   const whereCondition: Prisma.OfficeCostWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};
//   const result = await prisma.officeCost.findMany({
//     where: whereCondition,
//     skip,
//     take: limit,
//     orderBy:
//       paginatinOptions.sortBy && paginatinOptions.sortOrder
//         ? {
//           [paginatinOptions.sortBy]: paginatinOptions.sortOrder,
//         }
//         : { createdAt: "asc" },
//     // select: {

//     // },
//   });
//   const total = await prisma.officeCost.count();
//   return {
//     meta: {
//       limit,
//       page,
//       total,
//     },
//     data: result,
//   };
// };

const getAllOfficeCosService = async (
  paginatinOptions: IPaginationOptions,
  filterOptions: IFilters
) => {

  const { searchTerm, ...filterData } = filterOptions;
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginatinOptions);

  const andConditions = [];
  //searching code
  if (searchTerm) {
    andConditions.push({
      OR: officeCost_fields_constant.map(field => {
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

  const whereCondition: Prisma.OfficeCostWhereInput =
  andConditions.length > 0 ? { AND: andConditions } : {};

const response = await prisma.officeCost.findMany({
  where: whereCondition,
  skip,
  take: limit,
  orderBy:
    paginatinOptions.sortBy && paginatinOptions.sortOrder
      ? {
        [paginatinOptions.sortBy]: paginatinOptions.sortOrder
      }
      : { createdAt: 'asc' },
  // select: {
  //   id: true,
  //   startLocation: true,
  //   endLocation: true,
  //   startTime: true,
  //   passengerName: true,
  //   passengerPhone: true,
  //   passengerCount: true,
  //   tripRent: true,
  //   status: true,
  //   tripPeriod: true,
  //   vehicle: {
  //     select: {
  //       id: true,
  //       fuelType: true,
  //       mileage: true,
  //       price:true,
  //       purchaseDate:true,
  //       seatCapacity:true,
  //       tax:true,
  //       vehicleType:true,
  //       brand: true,
  //       color: true,
  //       model: true
  //     }
  //   },
  //   driver: {
  //     select: {
  //       address: true,
  //       avatar: true,
  //       email:true,
  //       experience:true,
  //       license_no:true,
  //       name:true,
  //       nid:true
  //     }
  //   },
  //   vehicle_id: true,
  //   driver_id: true,

  //   tripCosts: true,
  //   costs: true
  // },

})
const total = await prisma.officeCost.count();

return {
  meta: {
    limit,
    page,
    total
  },
  data: response
};


};

const getSingleOfficeCosService = async (id: string) => {

  const ifExist = await prisma.officeCost.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of office cost data not available')
  }
  const result = await prisma.officeCost.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOfficeCosService = async (data: any, id: string) => {
  const ifExist = await prisma.officeCost.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of office cost data not available')
  }
  const result = await prisma.officeCost.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};

const DeleteOfficeCostService = async (id: string) => {
  const ifExist = await prisma.officeCost.findFirst({
    where: {
      id: id
    }
  })
  if (!ifExist) {
    throw new ApiError(400, 'This kind of office cost data not available')
  }
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
