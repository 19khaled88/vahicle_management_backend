import { z } from 'zod';
const createTrip = z.object({
    body: z.object({
        start_location: z.string({
            required_error: 'Start_location is required'
        }),
        end_location: z.string({
            required_error: 'End_location is required'
        }),
        start_time: z.string({
            required_error: 'Start_time is required'
        }).transform((value)=>new Date(value)),
        end_time: z.string({
            required_error: 'End_time is required'
        }).transform((value)=>new Date(value)),
       
        passenger_count: z.number({
            required_error: 'Passenger_count is required'
        }),       
        trip_rent: z.number({
            required_error: 'Expense is required'
        }),       
        vehicle_id: z.string({
            required_error: 'Vehicle is required'
        }),    
        driver_id: z.string({
            required_error: 'Driver is required'
        }),   
    })
});

export const tripValidation = {
    createTrip
}