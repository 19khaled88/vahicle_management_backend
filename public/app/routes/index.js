"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = require("../modules/users/route");
const driver_routes_1 = require("../modules/drivers/driver.routes");
const route_2 = require("../modules/maintenance/route");
const route_3 = require("../modules/vehicle/route");
const route_4 = require("../modules/trips/route");
const router_1 = require("../modules/accessory/router");
const router_2 = require("../modules/officeCost/router");
const route_5 = require("../modules/driver_salary/route");
const route_6 = require("../modules/trips_cost/route");
const inventoryRequest_route_1 = require("../modules/InventoryRequest/inventoryRequest.route");
const manageRequest_route_1 = require("../modules/MangeRequest/manageRequest.route");
const route_7 = require("../modules/manage_fuel/route");
const route_8 = require("../modules/inventory/route");
const route_9 = require("../modules/specialApi/route");
const rootRoute = express_1.default.Router();
const ModuleRoute = [
    {
        path: '/auth',
        routes: route_1.AuthRouter
    },
    {
        path: '/vehicle',
        routes: route_3.vehicleRouter
    },
    {
        path: '/inventoryRequest',
        routes: inventoryRequest_route_1.inventoryRequestRouter
    },
    {
        path: '/manageRequest',
        routes: manageRequest_route_1.manageRequestRouter
    },
    {
        path: '/accessory',
        routes: router_1.accessoryRouter
    },
    {
        path: '/officeCost',
        routes: router_2.officeCosRouter
    },
    {
        path: '/maintenance',
        routes: route_2.MaintenanceRouter
    },
    {
        path: "/driver",
        routes: driver_routes_1.DriverRoutes,
    },
    {
        path: "/driver-salary",
        routes: route_5.DriverSalaryRouter,
    },
    {
        path: '/trip',
        routes: route_4.TripRouter
    },
    {
        path: '/trip-cost',
        routes: route_6.TripCostRouter
    },
    {
        path: '/manage-fuel',
        routes: route_7.ManageFuelRouter
    },
    {
        path: '/inventory',
        routes: route_8.InventoryRouter
    },
    {
        path: '/vehicle-driver',
        routes: route_9.SpecialRouter
    }
];
ModuleRoute.forEach(routes => rootRoute.use(routes.path, routes.routes));
exports.default = rootRoute;
