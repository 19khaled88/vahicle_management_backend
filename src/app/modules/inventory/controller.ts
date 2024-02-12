
import { NextFunction, RequestHandler } from "express";
import httpStatus from "http-status";
import { paginationOptionFields } from "../../../common/paginationOptions";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { inventoryService } from "./service";



const getAllInventoryController: RequestHandler = async (req, res, next) => {
    try {
        const filterOptions = pick(req.query, ['name', 'accessory_id'])
        const paginationOptions = pick(req.query, paginationOptionFields)
        const result = await inventoryService.getAllInventoryService(paginationOptions, filterOptions);
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Retieved all inventory successfully',
            data: result,
        });
    } catch (err) {
        return next(err);
    }
};

const singleInventoryController: RequestHandler = async (req, res, next) => {
    try {
        const response = await inventoryService.singleInventorySerivce(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single inventory retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const deleteInventoryController: RequestHandler = async (req, res, next) => {
    try {
        const response = await inventoryService.deleteInventoryService(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Inventory deleted successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const updateInventoryController: RequestHandler = async (req, res, next) => {
    try {
        const response = await inventoryService.updateInventoryService(req.params.id, req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Inventory updated successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}


export const inventoryController = {
    getAllInventoryController,
    singleInventoryController,
    deleteInventoryController,
    updateInventoryController

};