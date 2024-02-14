import { z } from 'zod';
const createTrip = z.object({
    body: z.object({
        startLocation: z.string({
            required_error: 'Start_location is required'
        }),
        endLocation: z.string({
            required_error: 'End_location is required'
        }),
        startTime: z.string({
            required_error: 'Start_time is required'
        }).transform((value)=>new Date(value)),
        passengerName: z.string({
            required_error: 'Passenger name is required'
        }).transform((value)=>new Date(value)),
       
        passengerPhone: z.string({
            required_error: 'Passenger phone is required'
        }),       
        passengerCount: z.number({
            required_error: 'Passenger number is required'
        }),       
        status: z.string({
            required_error: 'Trip status is required'
        }),    
        tripPeriod: z.string({
            required_error: 'Trip period is required'
        }),   
        tripRent: z.number({
            required_error: 'Trip rent is required'
        }),   
        vehicle_id: z.string({
            required_error: 'Vehicle id is required'
        }),   
        driver_id: z.string({
            required_error: 'Driver id is required'
        }),   
    })
});

export const tripValidation = {
    createTrip
}