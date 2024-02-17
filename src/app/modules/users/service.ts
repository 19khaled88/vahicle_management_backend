import { Prisma, PrismaClient, RoleEnumType, User } from "@prisma/client";
import { comparePasswords, hashPassword } from "../../../helpers/hashPass";
import { JwtHelpers } from "../../../helpers/jwtHelpes";
import config from "../../../config";
import { format } from 'date-fns';
import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";
import { IFilters, IPaginationOptions } from "../../../interfaces/paginationOptions";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IUserResponse, user_fields_constant } from "./interface";


const prisma = new PrismaClient()

const loginService = async (payload: any) => {
  const isExist = await prisma.user.findFirst({
    where: {
      email: payload.email
    }
  })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This user not found')
  }

  if (payload.password === undefined) {
    throw new ApiError(httpStatus.NO_CONTENT, 'password not given')
  }

  if (isExist !== null &&
    payload.password !== undefined && (await comparePasswords(payload.password, isExist.password))) {


    //create access token, refresh token 
    const data = { id: isExist.id, role: isExist.role, email: isExist.email as string }
    const accessToken = JwtHelpers.createToken(data, config.jwt.accessToken, config.jwt.accessTokenExpiresIn as string)
    return {
      accessToken
    }
    // const refreshToken = await createRefreshToken(data)

  } else {
    throw new ApiError(httpStatus.CONFLICT, 'Password not match or invalid')
  }
}



const authenticate = async (payload: any) => {
  const user_id_first_part = payload.user_id.split('-')

  if (user_id_first_part[0] === 'VMSD') {
    const isExist = await prisma.driver.findFirst({
      where: {
        user_id: payload.user_id
      }
    })

    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'This user not found')
    }

    if (payload.password === undefined) {
      throw new ApiError(httpStatus.NO_CONTENT, 'password not given')
    }


    if (isExist !== null && payload.password !== undefined && (await comparePasswords(payload.password, isExist.password))) {
      const data = { id: isExist.id, role: isExist.role, user_id: isExist.user_id, email: isExist.email as string }
      const accessToken = JwtHelpers.createToken(data, config.jwt.accessToken, config.jwt.accessTokenExpiresIn as string)
      return {
        accessToken
      }
    }

  } else if (user_id_first_part[0] === 'VMSM' || user_id_first_part[0] === 'VMSU' || user_id_first_part[0] === 'VMSA') {
    const isExist = await prisma.user.findFirst({
      where: {
        user_id: payload.user_id
      }
    })

    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'This user not found')
    }

    if (payload.password === undefined) {
      throw new ApiError(httpStatus.NO_CONTENT, 'password not given')
    }

    if (isExist !== null && payload.password !== undefined && (await comparePasswords(payload.password, isExist.password))) {
      const data = { id: isExist.id, role: isExist.role, user_id: isExist.user_id, email: isExist.email as string }
      const accessToken = JwtHelpers.createToken(data, config.jwt.accessToken, config.jwt.accessTokenExpiresIn as string)
      return {
        accessToken
      }
    }

  }

}



const registerService = async (payload: any) => {
  let role = null

  const isExist = await prisma.user.findFirst({
    where: {
      email: payload.email
    }
  })

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'This user already exist in our database');
  }

  const Hashed = await hashPassword(payload.password)
  payload.password = Hashed

  if (payload.role != undefined || payload.role != null) {
    role = payload.role
  } else {
    role = RoleEnumType.USER
  }

  const response = await prisma.user.create({
    data: payload
  })

  if (!response) {
    throw new ApiError(400, 'Registration falied')
  }

  const data = { id: response.id, role: role, email: response.email as string }
  // const accessToken = await signJwt(data)
  const accessToken = JwtHelpers.createToken(data, config.jwt.accessToken, config.jwt.accessTokenExpiresIn as string)
  return {
    accessToken
  }
}



const creatUser = async (payload: any) => {

  const response = await prisma.$transaction(async transactionClient => {
    const isExist = await transactionClient.user.findFirst({
      where: {
        email: payload.email
      }
    })

    if (isExist) {
      throw new ApiError(httpStatus.CONFLICT, 'This user already exist in our database');
    }

    // Get the current year
    const currentYear = format(new Date(), 'yyyy');

    // Query the database to find the last user and extract the user id number
    const lastUser = await transactionClient.user.findFirst({
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
    const userId = `VMSU-${currentYear}${nextUserIdNumber}`;

    //hash password
    const Hashed = await hashPassword('12345678')

    // Create the driver with the generated user_id
    const result = await transactionClient.user.create({
      data: {
        ...payload,
        password: Hashed,
        user_id: userId,
      },
    });
    return result
  })
  return response

}



const manageRole = async ( payload: any) => {
 
  const response = await prisma.$transaction(async transactionClient => {
    
    // const splited = payload.data.split('/')
    // const userId = splited[0];
    // const updateData = splited[1];
    

    const ifExist = await transactionClient.user.findFirst({
      where: {
        id: payload.id
      }
    })

    if (!ifExist) {
      throw new ApiError(400, 'This user not found')
    }

    const result = await transactionClient.user.update({
      where: {
        id: payload.id
      },
      data: {role:payload.data}
    })
    return result
  })
  return response
}



const getAllService = async (
  paginatinOptions: IPaginationOptions,
  filterOptions: IFilters
): Promise<IGenericResponse<IUserResponse[]>> => {
  const { searchTerm, ...filterData } = filterOptions;
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginatinOptions);

  const andConditions = [];

  //searching code
  if (searchTerm) {
    andConditions.push({
      OR: user_fields_constant.map(field => {
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

  const whereCondition: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      paginatinOptions.sortBy && paginatinOptions.sortOrder
        ? {
          [paginatinOptions.sortBy]: paginatinOptions.sortOrder
        }
        : { createAt: 'asc' },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      location: true,
      avatar: true,
      phone: true,
      role: true
    }
  });

  const total = await prisma.user.count();

  return {
    meta: {
      limit,
      page,
      total
    },
    data: result
  };
};



const deleteService = async(id:string)=>{
  const ifExist = await prisma.user.findFirst({
    where: {
      id: id
    }
  })

  if (!ifExist) {
    throw new ApiError(400, 'This user not found')
  }

  const result = await prisma.user.delete({
    where:{
      id:id
    }
  })
  return result
}






export const AuthServices = {
  loginService,
  registerService,
  getAllService,
  authenticate,
  creatUser,
  manageRole,
  deleteService
}