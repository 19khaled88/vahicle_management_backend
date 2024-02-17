import { RequestHandler } from "express"
import { inventoryRequestService } from "./inventoryRequest.service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import pick from "../../../shared/pick"
import { paginationOptionFields } from "../../../common/paginationOptions"





const createInventoryRequestController:RequestHandler = async (req, res, next) => {
    try {
        const response = await inventoryRequestService.createInventoryRequestService(req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'inventory Request created successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const getAllInventoryRequestController:RequestHandler= async (req, res, next) => {
    try {
        const filterOptions = pick(req.query, ['driver_id', 'status'])
        const paginationOptions = pick(req.query, paginationOptionFields)
        const response = await inventoryRequestService.getAllInventoryRequestService(paginationOptions,filterOptions)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'InventoryRequest retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const singleInventoryRequestController:RequestHandler = async (req, res, next) => {
    try {
        const response = await inventoryRequestService.getSingleInventoryRequestService(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'InventoryRequest retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const deleteInventoryRequestController:RequestHandler = async (req, res, next) => {
    try {
        const response = await inventoryRequestService.DeleteInventoryRequestService(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'InventoryRequest deleted successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const updateInventoryRequestController:RequestHandler = async (req, res, next) => {
    try {
        const response = await inventoryRequestService.updateInventoryRequestService( req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'InventoryRequest updated successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}




export const inventoryRequestControllers = {
    createInventoryRequestController,
    getAllInventoryRequestController,
    deleteInventoryRequestController,
    singleInventoryRequestController,
    updateInventoryRequestController
}