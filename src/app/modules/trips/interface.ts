export const trip_fields_constant = ['vehicle_id', 'start_location', 'end_location', 'start_time', 'end_time']
// export const trip_fields_constant = ["searchTerm",'vehicle_id', 'user_id', 'start_location', 'end_location', 'start_time', 'end_time']


type Cost = {
        id: string,
        amount: number
        expense_category: string
        inventory_id: string
        description: string
        trip_id: string
}

type Driver ={
        id: string,
        name: string,
        email: string,
        avatar: string,
        address: string,
        phone: string,
        experience: string
}

type Vehicle ={
        id: string,
        brand: string,
        color: string,
        fuelType: string,
        mileage: number,
        model: string,
        vehicleType: string
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
       
        costs?: Cost[]
}