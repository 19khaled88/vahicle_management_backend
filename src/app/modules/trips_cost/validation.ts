import { z } from 'zod';
const createTripCost = z.object({
    body: z.object({
        passengerName: z.string({
            required_error: 'Passenger name is required'
        }),
        phone: z.string({
            required_error: 'Phone number is required'
        }),
        trip_period: z.string({
            required_error: 'Trip period is required'
        }).transform((value)=>new Date(value)),      
        startLocation: z.string({
            required_error: 'Start location is required'
        }),       
        trip_id: z.string({
            required_error: 'Trip is required'
        }),  
    })
});

export const tripCostValidation = {
    createTripCost
}