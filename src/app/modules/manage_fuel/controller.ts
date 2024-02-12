import { NextFunction, Request, Response } from "express"

import httpStatus from "http-status"
import { paginationOptionFields } from "../../../common/paginationOptions"
import pick from "../../../shared/pick"
import sendResponse from "../../../shared/sendResponse"
import { query_type } from "./interface"
import { ManageFuelServices } from "./service"


const createManageFuelController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await ManageFuelServices.createManageFuelService(req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'New manage fuel created successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const getAllManageFuelController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filterOptions = pick(req.query, query_type)
        const paginationOptions = pick(req.query, paginationOptionFields)
        const response = await ManageFuelServices.getAllManageFuelService(paginationOptions,filterOptions)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'All Manage fuel data retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const singleManageFuelController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await ManageFuelServices.singleManageFuelService(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Manage fuel data retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const deleteManageFuelController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await ManageFuelServices.deleteManageFuelService(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Manage fuel data deleted successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const updateManageFuelController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await ManageFuelServices.updateManageFuelService(req.params.id, req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Manage fuel data updated successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}



export const manageFueltControllers = {
    createManageFuelController,
    getAllManageFuelController,
    singleManageFuelController,
    deleteManageFuelController,
    updateManageFuelController
}