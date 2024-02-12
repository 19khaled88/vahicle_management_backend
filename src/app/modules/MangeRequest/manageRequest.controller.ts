import { RequestHandler } from "express"
import { manageRequestService } from "./manageRequest.service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import pick from "../../../shared/pick"
import { paginationOptionFields } from "../../../common/paginationOptions"

const createMangeRequestController:RequestHandler = async (req, res, next) => {
    try {
        const response = await manageRequestService.createManageRequestService(req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'manage Request created successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}
const getAllIMangeRequestController:RequestHandler= async (req, res, next) => {
    try {
        const filterOptions = pick(req.query, ['approve_status', 'inventory_request_id'])
        const paginationOptions = pick(req.query, paginationOptionFields)
        const response = await manageRequestService.getAllManageRequestService(paginationOptions,filterOptions)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Manage Request retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const singleManageRequestController:RequestHandler = async (req, res, next) => {
    try {
        const response = await manageRequestService.getSingleManageRequestService(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Manage Request retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const deleteMangeRequestController:RequestHandler = async (req, res, next) => {
    try {
        const response = await manageRequestService.DeleteManageRequestService(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Manage Request deleted successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const updateManageRequestController:RequestHandler = async (req, res, next) => {
    try {
        const response = await manageRequestService.updateManageRequestService(req.params.id, req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'ManageRequest updated successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}



export const manageRequestControllers = {
    createMangeRequestController,
    getAllIMangeRequestController,
    deleteMangeRequestController,
    singleManageRequestController,
    updateManageRequestController
}