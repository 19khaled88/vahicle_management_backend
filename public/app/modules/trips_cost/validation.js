"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripCostValidation = void 0;
const zod_1 = require("zod");
const createTripCost = zod_1.z.object({
    body: zod_1.z.object({
        passengerName: zod_1.z.string({
            required_error: 'Passenger name is required'
        }),
        phone: zod_1.z.string({
            required_error: 'Phone number is required'
        }),
        trip_period: zod_1.z.string({
            required_error: 'Trip period is required'
        }).transform((value) => new Date(value)),
        startLocation: zod_1.z.string({
            required_error: 'Start location is required'
        }),
        trip_id: zod_1.z.string({
            required_error: 'Trip is required'
        }),
    })
});
exports.tripCostValidation = {
    createTripCost
};
