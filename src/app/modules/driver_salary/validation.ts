import { z } from 'zod';
const createDriverSalary = z.object({
    body: z.object({
        driver_id: z.string({
            required_error: 'Driver ID is required'
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
        description: z.string().nullable().optional(),
        status: z.enum(['PENDING', 'PROCESSING', 'DONE'], {
            required_error: 'Status is required and must be one of "PENDING", "PROCESSING", or "DONE"'
        }),
    })
});

export const driverSalaryValidation = {
    createDriverSalary
}