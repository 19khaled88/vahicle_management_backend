import { z } from 'zod';
const createManageFuel = z.object({
    body: z.object({
        vehicle_id: z.string({
            required_error: 'Vehicle id is required'
        }),
        invoice_number: z.number({
            required_error: 'Invoice number is required'
        }),
        fuel_type: z.string({
            required_error: 'Fuel type is required'
        }).transform((value)=>new Date(value)),      
        purchase_date: z.string({
            required_error: 'purchase date is required'
        }),       
        amount: z.number({
            required_error: 'Amount is required'
        }),  
        ltr: z.number({
            required_error: 'Ltr is required'
        }),  
    })
});

export const manageFuelValidation = {
    createManageFuel
}