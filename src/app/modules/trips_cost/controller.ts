import { NextFunction, Request, Response } from "express"

import httpStatus from "http-status"
import { paginationOptionFields } from "../../../common/paginationOptions"
import pick from "../../../shared/pick"
import sendResponse from "../../../shared/sendResponse"
import { TripCostServices } from "./service"


const createCostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await TripCostServices.createCostService(req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'New trip cost created successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const getAllCostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filterOptions = pick(req.query, ['passengerName', 'phone', 'trip_id'])
        const paginationOptions = pick(req.query, paginationOptionFields)
        const response = await TripCostServices.getAllTripCostService(paginationOptions,filterOptions)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'All trips cost retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const singleTripCostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await TripCostServices.singleTripCostService(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single trip cost retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const deleteTripCostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await TripCostServices.deleteTripCostService(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Trip costv deleted successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const updateTripCostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await TripCostServices.updateTripCostService(req.params.id, req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Trip cost updated successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}



export const tripCostControllers = {
    createCostController,
    getAllCostController,
    singleTripCostController,
    deleteTripCostController,
    updateTripCostController
}