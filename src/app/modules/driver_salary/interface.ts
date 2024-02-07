export const trip_fields_constant = ['vehicle_id', 'user_id', 'start_location', 'end_location', 'start_time', 'end_time']


type Cost = {
        id: string,
        amount: number
        expense_category: string
        inventory_id: string
        description: string
        
        trip_id: string

}


export type ITripResponse = {
        id: string,
        start_location: String,
        end_location: String,
        start_time: Date,
        end_time: Date,
        passenger_count: number,
        trip_rent: number,
       
        createAt?: string,
        updatedAt?: string,

        //relationships 
        vehicle_id: string,
        driver_id: string 
        costs?: Cost[]
}