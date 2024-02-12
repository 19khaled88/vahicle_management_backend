"use strict";
// import { IUserResponse } from "../users/interface";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleProfile_fields_constant = void 0;
exports.vehicleProfile_fields_constant = [
    'registrationNo',
    'tax',
    'seatCapacity',
    'isAc',
    'brand',
    'model',
    'fuelType',
    "color",
    "price",
    "tax",
    'vehicleType',
    'createdAt',
    'updatedAt',
];
// Enum for VehicleType
var VehicleType;
(function (VehicleType) {
    VehicleType["AC"] = "AC";
    VehicleType["NonAC"] = "NonAC";
    VehicleType["SlippingBus"] = "SlippingBus";
})(VehicleType || (VehicleType = {}));
// Enum for FuelType
var FuelType;
(function (FuelType) {
    FuelType["Petrol"] = "Petrol";
    FuelType["Diesel"] = "Diesel";
    FuelType["Electric"] = "Electric";
    FuelType["Hybrid"] = "Hybrid";
})(FuelType || (FuelType = {}));
