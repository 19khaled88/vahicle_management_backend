import { RequestHandler } from "express";
import httpStatus from "http-status";
import { paginationOptionFields } from "../../../common/paginationOptions";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { accessoryService } from "./service";

const createAccessoryController: RequestHandler = async (req, res, next) => {
  try {
    const result = await accessoryService.createAccessoryService(req.body);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Accessory added successful',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};
// const getAllAccessoryController: RequestHandler = async (req, res, next) => {

//   // console.log(req.query)
//   try {
//     const filterOptions = pick(req.query, [
//       'accessory_name',
//       'quantity ',
//       'purchase_data',
//       'amount  ',
//       "expire_data",
//       'createdAt',
//       'updatedAt',
//     ]);
//     const paginationOptions = pick(req.query, paginationOptionFields);

//     const response = await accessoryService.getAllAccessoryService(
//       paginationOptions,
//       filterOptions
//     );
//     return sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Accessory retrieved successfully',
//       data: response,
//     });
//   } catch (err) {
//     return next(err);
//   }
// };

// const paginationOptionFields:any = ['limit', 'page', 'sortBy', 'sortOrder'];

const getAllAccessoryController: RequestHandler = async (req, res, next) => {
  try {
    const filterOptions = pick(req.query, [
      'accessory_name',
      'quantity',
      'purchase_data',
      'amount',
      'expire_data',
      'createdAt',
      'updatedAt',
      'searchTerm', // Add searchTerm here to pick it from the query
    ]);
    const paginationOptions = pick(req.query, paginationOptionFields);

    const response = await accessoryService.getAllAccessoryService(
      paginationOptions,
      filterOptions
    );
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Accessory retrieved successfully',
      data: response,
    });
  } catch (err) {
    return next(err);
  }
};


const getSingleAccessoryController: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const id = await req?.params?.id;
    const result = await accessoryService.getSingleAccessoryService(id);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single accessory get successful',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};
const deleteAccessoryController: RequestHandler = async (req, res, next) => {
  try {
    // const isAdmin = req?.user?.role === "admin" || "super-admin";
    // // console.log(isAdmin, "ata req");
    // if (!isAdmin) {
    //   res.status(404).json({
    //     success: true,
    //     statusCode: 404,
    //     message: "Unauthorized access",
    //   });
    // }
    const id = req?.params?.id;
    const result = await accessoryService.DeleteAccessoryService(id);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Accessory deleted successful',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};
const updateAccessoryController: RequestHandler = async (req, res, next) => {
  try {
    // const isAdmin = req?.user?.role === "admin";
    // if (!isAdmin) {
    //   return res.status(404).json({
    //     success: true,
    //     statusCode: 404,
    //     message: "Unauthorized access",
    //   });
    // }
    const id = req?.params?.id;
    const data = req.body;
    const result = await accessoryService.updateAccessoryService(
      data,
      id
    );
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Accessory uodated successful',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

export const accessoryController = {
  createAccessoryController,
  updateAccessoryController,
  deleteAccessoryController,
  getSingleAccessoryController,
  getAllAccessoryController

};