import { RequestHandler } from "express";
import pick from "../../../shared/pick";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { officeCostService } from "./service";
import { paginationOptionFields } from "../../../common/paginationOptions";

const createOfficeCostController: RequestHandler = async (req, res, next) => {
  try {
    const result = await officeCostService.createOfficeCosService(req.body);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OfficeCost added successful",
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};
const getAllOfficeCostController: RequestHandler = async (req, res, next) => {
  try {
    const filterOptions = pick(req.query, [
      " cost_name ",
      " description",
      "amount  ",
      "createdAt",
      "updatedAt",
    ]);

    const paginationOptions = pick(req.query, paginationOptionFields);

    const response = await officeCostService.getAllOfficeCosService(
      paginationOptions,
      filterOptions
    );
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Accessory retrieved successfully",
      data: response,
    });
  } catch (err) {
    return next(err);
  }
};
const getSingleOfficeCostController: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const id = await req?.params?.id;
    const result = await officeCostService.getSingleOfficeCosService(id);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single OfficeCost get successful",
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};
const deleteOfficeCostController: RequestHandler = async (req, res, next) => {
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
    const result = await officeCostService.DeleteOfficeCostService(id);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OfficeCost deleted successful",
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};
const updateOfficeCostController: RequestHandler = async (req, res, next) => {
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
    const result = await officeCostService.updateOfficeCosService(data, id);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OfficeCost uodated successful",
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

export const officeCostController = {
  createOfficeCostController,
  updateOfficeCostController,
  deleteOfficeCostController,
  getSingleOfficeCostController,
  getAllOfficeCostController,
};
