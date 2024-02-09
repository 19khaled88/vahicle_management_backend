export const trip_cost_fields_constant = ["searchTerm",'passengerName', 'phone', 'trip_id']


export type ITripCostResponse = {
        id: string;
        passengerName: string;
        phone: string;
        trip_period: string;
        tollCost: number | null;
        parkingCost: number | null;
        startLocation: string;
        description: string | null;
        trip_id: string;
        createdAt: Date;
        updatedAt: Date;

}