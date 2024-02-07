import { z } from 'zod';
const createDriverSalary = z.object({
    body: z.object({
        driver_id: z.string({
            required_error: 'Driver is required'
        }),
        amount: z.number({
            required_error: 'Amount is required'
        }),
        currency: z.string({
            required_error: 'Currency is required'
        }),
        status: z.string({
            required_error: 'Status is required'
        }),
    })
});

export const driverSalaryValidation = {
    createDriverSalary
}