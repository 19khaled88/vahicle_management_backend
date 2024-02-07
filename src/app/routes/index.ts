
import express from 'express'

import { AuthRouter } from '../modules/users/route'
import { DriverRoutes } from "../modules/drivers/driver.routes";
import { MaintenanceRouter } from '../modules/maintenance/route'
import { vehicleRouter } from '../modules/vehicle/route'
import { TripRouter } from '../modules/trips/route';
import { TripCostRouter } from '../modules/trips_cost/route';
import { DriverSalaryRouter } from '../modules/driver_salary/route';
const rootRoute = express.Router()



const ModuleRoute = [
    {
        path: '/auth',
        routes: AuthRouter
    },
    {
        path: '/vehicle',
        routes: vehicleRouter
    },
    {
        path: '/maintenance',
        routes: MaintenanceRouter
    },
    {
        path: "/driver",
        routes: DriverRoutes,
    },
    {
        path: "/driver-salary",
        routes: DriverSalaryRouter,
    },
    {
        path:'/trip',
        routes:TripRouter
    },
    {
        path:'/trip-cost',
        routes:TripCostRouter
    }


]

ModuleRoute.forEach(routes => rootRoute.use(routes.path, routes.routes))

export default rootRoute
