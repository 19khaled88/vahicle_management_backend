import { z } from 'zod';
const createDriverSalary = z.object({
    body: z.object({
        driver_id: z.string({
            required_error: 'Driver is required'
        }),
        amount: z.number({
            required_error: 'Amount is required'
        }),
        month: z.string({
            required_error: 'Month is required'
        }),
        position: z.string({
            required_error: 'Position is required'
        }),
        status: z.string({
            required_error: 'Status is required'
        }),
    })
});

export const driverSalaryValidation = {
    createDriverSalary
}