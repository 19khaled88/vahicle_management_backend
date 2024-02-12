"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverSalaryValidation = void 0;
const zod_1 = require("zod");
const createDriverSalary = zod_1.z.object({
    body: zod_1.z.object({
        driver_id: zod_1.z.string({
            required_error: 'Driver ID is required'
        }),
        amount: zod_1.z.number({
            required_error: 'Amount is required'
        }),
        month: zod_1.z.string({
            required_error: 'Month is required'
        }),
        position: zod_1.z.string({
            required_error: 'Position is required'
        }),
        description: zod_1.z.string().nullable().optional(),
        status: zod_1.z.enum(['PENDING', 'PROCESSING', 'DONE'], {
            required_error: 'Status is required and must be one of "PENDING", "PROCESSING", or "DONE"'
        }),
    })
});
exports.driverSalaryValidation = {
    createDriverSalary
};
