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
        path: '/maintenance',
        routes: route_2.MaintenanceRouter
    },
    {
        path: "/driver",
        routes: driver_routes_1.DriverRoutes,
    },
    {
        path: '/trip',
        routes: route_4.TripRouter
    }
];
ModuleRoute.forEach(routes => rootRoute.use(routes.path, routes.routes));
exports.default = rootRoute;
