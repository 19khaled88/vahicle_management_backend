import { NextFunction, Request, Response } from "express"
import { AuthServices } from "./service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import pick from "../../../shared/pick"
import { paginationOptionFields } from "../../../common/paginationOptions"


const loginController = async(req:Request,res:Response,next:NextFunction)=>{
   try {
    const response = await AuthServices.loginService(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Login successful',
        data:response
    })
   } catch (error) {
    next(error)
   }
}

const registerController = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await AuthServices.registerService(req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Registration successful',
            data:response
        })
    } catch (error) {
        next(error)
    }
}

const allUserControler = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const filterOptions = pick(req.query, ['name','email','phone','address','location'])
        const paginationOptions = pick(req.query, paginationOptionFields)
        
        const response = await AuthServices.getAllService(paginationOptions,filterOptions)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Users retrieved successfully",
            data: response,
          });
    } catch (error) {
        next(error)
    }
}

const createController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await AuthServices.creatUser(req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'User created successfully',
            data:response
        })
    } catch (error) {
        next(error)
    }
}

const authenticateController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await AuthServices.authenticate(req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Authenticated successful',
            data:response
        })
       } catch (error) {
        next(error)
       }
}

const manageRoleController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await AuthServices.manageRole(req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'Role changed successfully',
            data:response
        })
    } catch (error) {
        next(error)
    }
}

const deleteController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = await AuthServices.deleteService(req.params.id)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'User deleted successfully',
            data:response
        })
    } catch (error) {
        next(error)
    }
}

export const authControllers = {
    loginController,
    registerController,
    allUserControler,
    createController,
    authenticateController,
    manageRoleController,
    deleteController
}