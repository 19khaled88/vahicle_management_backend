import { RequestHandler } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { SpecialApiServices } from "./service";


const getVehicle_driver_Controller: RequestHandler = async (req, res, next) => {
  try {
    const response = await SpecialApiServices.getAllOfficeCosService()
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Vehicle and driver info retrieved",
      data: response,
    });
  } catch (err) {
    return next(err);
  }
};


export const SpecialApiController = {
  getVehicle_driver_Controller,
};
