import { NextFunction, Request, Response } from "express"

import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import pick from "../../../shared/pick"
import { paginationOptionFields } from "../../../common/paginationOptions"
import { DriverSalaryServices } from "./service"


const createDriverSalaryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await DriverSalaryServices.createDriverSalaryService(req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Driver salary created successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const getAllDriverSalaryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filterOptions = pick(req.query, ['driver_id', 'status'])
        const paginationOptions = pick(req.query, paginationOptionFields)
        const response = await DriverSalaryServices.getAllDriverSalaryService(paginationOptions,filterOptions)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Driver salaries retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const singleDriverSalaryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await DriverSalaryServices.singleDriverSalarySerivce(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Driver salary retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const deleteDriverSalaryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await DriverSalaryServices.deleteDriverSalaryService(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Driver salary deleted successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const updateDriverSalaryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await DriverSalaryServices.updateDriverSalaryService(req.params.id, req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Driver salary updated successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}



export const DriverSalaryControllers = {
    createDriverSalaryController,
    getAllDriverSalaryController,
    singleDriverSalaryController,
    deleteDriverSalaryController,
    updateDriverSalaryController
}