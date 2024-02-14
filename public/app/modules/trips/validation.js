"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripValidation = void 0;
const zod_1 = require("zod");
const createTrip = zod_1.z.object({
    body: zod_1.z.object({
        startLocation: zod_1.z.string({
            required_error: 'Start_location is required'
        }),
        endLocation: zod_1.z.string({
            required_error: 'End_location is required'
        }),
        startTime: zod_1.z.string({
            required_error: 'Start_time is required'
        }).transform((value) => new Date(value)),
        passengerName: zod_1.z.string({
            required_error: 'Passenger name is required'
        }).transform((value) => new Date(value)),
        passengerPhone: zod_1.z.string({
            required_error: 'Passenger phone is required'
        }),
        passengerCount: zod_1.z.number({
            required_error: 'Passenger number is required'
        }),
        status: zod_1.z.string({
            required_error: 'Trip status is required'
        }),
        tripPeriod: zod_1.z.string({
            required_error: 'Trip period is required'
        }),
        tripRent: zod_1.z.number({
            required_error: 'Trip rent is required'
        }),
        vehicle_id: zod_1.z.string({
            required_error: 'Vehicle id is required'
        }),
        driver_id: zod_1.z.string({
            required_error: 'Driver id is required'
        }),
    })
});
exports.tripValidation = {
    createTrip
};
