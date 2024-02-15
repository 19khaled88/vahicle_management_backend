import { Driver, Prisma } from "@prisma/client";

import { format } from 'date-fns';
import ApiError from "../../../error/ApiError";
import { hashPassword } from "../../../helpers/hashPass";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/paginationOptions";
import prisma from "../../../shared/prisma";
import { driverSearchableFields } from "./driver.constant";
import { IDriverFilterRequest } from "./driver.interface";

// const insertIntoDB = async (data: Driver): Promise<Driver> => {
//   const response = await prisma.$transaction(async transactionClient => {

//     const ifExist = await prisma.driver.findFirst({
//       where: {
//         email: data.email
//       }
//     })

//     if (ifExist) {
//       throw new ApiError(400, 'Data with the same email already exists')
//     }

//     //Get the current year
//     const currentYear = format(new Date(), 'yyyy');

//     // Find the user with the highest user id number
//     const lastUser = await prisma.driver.findFirst({
//       orderBy: {
//         user_id: 'desc',
//       },
//     });



//     // Extract the user id number and increment it by one
//     const lastUserIdNumber = lastUser && lastUser.user_id ? parseInt(lastUser.user_id.split('-')[2]) : 0;
//     const nextUserIdNumber = lastUserIdNumber + 1;

//     // Generate the user_id
//     const userId = `VMSD-${currentYear}-${nextUserIdNumber}`;

//     const result = await prisma.driver.create({
//       ...data,
//       user_id:userId
      
//     });
//     return result;



//   })
//   return response
// };

const insertIntoDB = async (data: Driver): Promise<Driver> => {

  const response = await prisma.$transaction(async transactionClient=>{
    const ifExist = await transactionClient.driver.findFirst({
      where:{
        email:data.email
      }
    })
  
    if(ifExist){
       throw new ApiError(400,'This driver with same email exist')
    }
  
    // Get the current year
    const currentYear = format(new Date(), 'yyyy');
  
    // Query the database to find the last user and extract the user id number
    const lastUser = await transactionClient.driver.findFirst({
      orderBy: {
        user_id: 'desc', // Order by user_id in descending order to get the last user
      },
    });
  
    // Extract the user id number and increment it by one
    let nextUserIdNumber = 1; // Default to 1 if there are no users yet
    if (lastUser && lastUser.user_id != null) {
      const lastUserIdParts = lastUser.user_id.split('-');
      const lastUserIdNumber = lastUserIdParts[lastUserIdParts.length - 1]
      const afterFistFourDigits = parseInt(lastUserIdNumber.substring(4));
      nextUserIdNumber = afterFistFourDigits + 1;
    }
  
    // Generate the new user_id by combining the current year and the incremented user id number
    const userId = `VMSD-${currentYear}${nextUserIdNumber}`;
  
    //hash password
    const Hashed = await hashPassword('12345678')
    data.password = Hashed 
    
    // Create the driver with the generated user_id
    const result = await transactionClient.driver.create({
      data: {
        ...data,
        password:Hashed,
        user_id: userId,
      },
    });
  
    return result;

  })

  return response
 
};


const getAllFromDB = async (
  filters: IDriverFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<any>> => {
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

  const ifExist = await prisma.driver.findFirst({
    where:{
      id:id
    }
  })

  if(!ifExist){
    throw new ApiError(400, 'This user not exist')
  }

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

  const ifExist = await prisma.driver.findFirst({
    where:{
      id:id
    }
  })

  if(!ifExist){
    throw new ApiError(400, 'This user not exist')
  }

  const result = await prisma.driver.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};


const deleteByIdFromDB = async (id: string): Promise<Driver> => {
  const ifExist = await prisma.driver.findFirst({
    where:{
      id:id
    }
  })

  if(!ifExist){
    throw new ApiError(400, 'This user not exist')
  }

  const result = await prisma.driver.delete({
    where: {
      id,
    },
  });
  return result;
};

const upComingTrip = async()=>{
  
}

const tripHistory = async()=>{

}


export const DriverService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};