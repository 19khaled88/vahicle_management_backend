export const inventory_fields_constant = ['name', 'accessory_id']


export type IInventoryResponse = {
    id: string;
    name: string;
    accessory_id: string;
    quantity: number;
    description?: string | null; // Adjusted to allow for null values
    createAt: Date;
    updatedAt: Date;

}