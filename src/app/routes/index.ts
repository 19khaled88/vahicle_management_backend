
import express from 'express'
import { AuthRouter } from '../modules/users/route'
import { DriverRoutes } from "../modules/drivers/driver.routes";
import { MaintenanceRouter } from '../modules/maintenance/route'
import { vehicleRouter } from '../modules/vehicle/route'
import { TripRouter } from '../modules/trips/route';
import { accessoryRouter } from '../modules/accessory/router';
import { officeCosRouter } from '../modules/officeCost/router';
import { DriverSalaryRouter } from '../modules/driver_salary/route';
import { TripCostRouter } from '../modules/trips_cost/route';
import { ManageFuelRouter } from '../modules/manage_fuel/route';
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
        path: '/accessory',
        routes: accessoryRouter
    },
    {
        path: '/officeCost',
        routes: officeCosRouter
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
    },
    {
        path:'/manage-fuel',
        routes:ManageFuelRouter
    }


]

ModuleRoute.forEach(routes => rootRoute.use(routes.path, routes.routes))

export default rootRoute
