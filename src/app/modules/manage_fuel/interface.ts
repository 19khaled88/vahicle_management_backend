export const manage_fuel_fields_constant = ['invoice_number', 'purchase_date', 'ltr','fuel_type']
export const query_type = ["searchTerm",'invoice_number', 'purchase_date', 'ltr','fuel_type']
export type MongoDBWhereCondition = {
        [key: string]: any; // Define the type based on your MongoDB query conditions
      }
export type IManageFuelResponse = {
        id: string;
        vehicle_id:string;
        // vehicle        
        fuel_type:string
        invoice_number:number
        purchase_date:Date
        amount:number
        ltr :number
        createAt?: Date;
        updatedAt?: Date;

}