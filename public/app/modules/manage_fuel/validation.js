"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageFuelValidation = void 0;
const zod_1 = require("zod");
const createManageFuel = zod_1.z.object({
    body: zod_1.z.object({
        vehicle_id: zod_1.z.string({
            required_error: 'Vehicle id is required'
        }),
        invoice_number: zod_1.z.number({
            required_error: 'Invoice number is required'
        }),
        fuel_type: zod_1.z.string({
            required_error: 'Fuel type is required'
        }).transform((value) => new Date(value)),
        purchase_date: zod_1.z.string({
            required_error: 'purchase date is required'
        }),
        amount: zod_1.z.number({
            required_error: 'Amount is required'
        }),
        ltr: zod_1.z.number({
            required_error: 'Ltr is required'
        }),
    })
});
exports.manageFuelValidation = {
    createManageFuel
};
