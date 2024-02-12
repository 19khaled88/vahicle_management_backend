import { RequestHandler } from 'express';
import { vehicleService } from './service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { PrismaClient } from '@prisma/client';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';

const prisma = new PrismaClient();

const createVehicleController: RequestHandler = async (req, res, next) => {
  try {
    const result = await vehicleService.createVehicleService(req.body);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vehicle added successful',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};
const getAllVehicleController: RequestHandler = async (req, res, next) => {
  try {
    const filterOptions = pick(req.query, [
      'registrationNo',
      'tax',
      'seatCapacity',
      'vehicleType',
      "color",
      "price",
      'brand',
      'model',
      'fuelType',
      'createdAt',
      'updatedAt',
    ]);
    const paginationOptions = pick(req.query, paginationOptionFields);

    const response = await vehicleService.getAllVehicleService(
      paginationOptions,
      filterOptions
    );
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'vehicleProfile retrieved successfully',
      data: response,
    });
  } catch (err) {
    return next(err);
  }
};
const getSingleVehicleController: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const id = await req?.params?.id;
    const result = await vehicleService.getSingleVehicleService(id);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Vehicle get successful',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};
const deleteVehicleController: RequestHandler = async (req, res, next) => {
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
  
    const result = await vehicleService.DeletevehicleService(req.params.id);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vehicle deleted successful',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};
const updateVehicleController: RequestHandler = async (req, res, next) => {
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
    const result = await vehicleService.updateVehicleService(
      data,
      id
    );
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vehicle uodated successful',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

export const vehicleController = {
  createVehicleController,
  getAllVehicleController,
  deleteVehicleController,
  updateVehicleController,
  getSingleVehicleController,
};