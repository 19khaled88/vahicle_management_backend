"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverSalaryValidation = void 0;
const zod_1 = require("zod");
const createDriverSalary = zod_1.z.object({
    body: zod_1.z.object({
        driver_id: zod_1.z.string({
            required_error: 'Driver is required'
        }),
        amount: zod_1.z.number({
            required_error: 'Amount is required'
        }),
        currency: zod_1.z.string({
            required_error: 'Currency is required'
        }),
        status: zod_1.z.string({
            required_error: 'Status is required'
        }),
    })
});
exports.driverSalaryValidation = {
    createDriverSalary
};
