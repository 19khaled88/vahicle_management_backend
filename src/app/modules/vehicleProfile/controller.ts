// import { RequestHandler } from 'express';
// import { vehicleProfileService } from './service';
// import sendResponse from '../../../shared/sendResponse';
// import httpStatus from 'http-status';
// import { PrismaClient } from '@prisma/client';
// import pick from '../../../shared/pick';
// import { paginationOptionFields } from '../../../common/paginationOptions';

// const prisma = new PrismaClient();

// const createVehicleController: RequestHandler = async (req, res, next) => {
//   try {
//     const result = await vehicleProfileService.createVehicleService(req.body);
//     return sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Vehicle added successful',
//       data: result,
//     });
//   } catch (err) {
//     return next(err);
//   }
// };

// const getAllVehicleController: RequestHandler = async (req, res, next) => {
//   try {
//     const filterOptions = pick(req.query, [
//       'vehicle_make',
//       'vehicleName',
//       'purchase_date',
//       'registeration_date',
//       'color',
//       'registeration_validity',
//       'present_km',
//       'mileage',
//       'price',
//       'fuel_type',
//       'body_type',
//       'model_name',
//       'registration_no',
//       'engine_no',
//       'manufacturing_date',
//       'cubic_capacity',
//       'engine_capacity',
//       'sitting_capacity',
//       'chassis_no',
//       'userId',
//     ]);
//     const paginationOptions = pick(req.query, paginationOptionFields);

//     const response = await vehicleProfileService.getAllVehicleService(
//       paginationOptions,
//       filterOptions
//     );
//     return sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'vehicleProfile retrieved successfully',
//       data: response,
//     });
//   } catch (err) {
//     return next(err);
//   }
// };
// const getSingleVehicleController: RequestHandler = async (
//   req: any,
//   res: any,
//   next: any
// ) => {
//   try {
//     const id = await req?.params?.id;
//     const result = await vehicleProfileService.getSingleVehicleService(id);
//     return sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Single Vehicle get successful',
//       data: result,
//     });
//   } catch (err) {
//     return next(err);
//   }
// };

// const deleteVehicleController: RequestHandler = async (req, res, next) => {
//   try {
//     // const isAdmin = req?.user?.role === "admin" || "super-admin";
//     // // console.log(isAdmin, "ata req");
//     // if (!isAdmin) {
//     //   res.status(404).json({
//     //     success: true,
//     //     statusCode: 404,
//     //     message: "Unauthorized access",
//     //   });
//     // }
//     const id = req?.params?.id;
//     const result = await vehicleProfileService.DeletevehicleProfileService(id);
//     return sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Vehicle deleted successful',
//       data: result,
//     });
//   } catch (err) {
//     return next(err);
//   }
// };
// const updateVehicleController: RequestHandler = async (req, res, next) => {
//   try {
//     // const isAdmin = req?.user?.role === "admin";
//     // if (!isAdmin) {
//     //   return res.status(404).json({
//     //     success: true,
//     //     statusCode: 404,
//     //     message: "Unauthorized access",
//     //   });
//     // }
//     const id = req?.params?.id;
//     const data = req.body;
//     const result = await vehicleProfileService.updateVehicleProfileService(
//       data,
//       id
//     );
//     return sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Vehicle uodated successful',
//       data: result,
//     });
//   } catch (err) {
//     return next(err);
//   }
// };

// export const vehicleController = {
//   createVehicleController,
//   getAllVehicleController,
//   deleteVehicleController,
//   updateVehicleController,
//   getSingleVehicleController,
// };
