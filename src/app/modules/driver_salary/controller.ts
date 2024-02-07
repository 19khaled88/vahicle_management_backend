import { NextFunction, Request, Response } from "express"

import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import pick from "../../../shared/pick"
import { paginationOptionFields } from "../../../common/paginationOptions"
import { TripServices } from "./service"


const createController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await TripServices.createService(req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'New trip created successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const getAllController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filterOptions = pick(req.query, ['vehicle_id','user_id','start_location','end_location','start_time','end_time'])
        const paginationOptions = pick(req.query, paginationOptionFields)
        const response = await TripServices.getAllTripService(paginationOptions,filterOptions)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'All trips retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const singleTripController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await TripServices.singleTripSerivce(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single trip retrieved successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const deleteTripController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await TripServices.deleteTripService(req.params.id)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Trip deleted successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const updateTripController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await TripServices.updateTripService(req.params.id, req.body)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Trip updated successfully',
            data: response
        })
    } catch (error) {
        next(error)
    }
}



export const tripControllers = {
    createController,
    getAllController,
    singleTripController,
    deleteTripController,
    updateTripController
}