export const accessory_fields_constant = [
  "accessory_name",
  "amount",
  "quantity",
  "purchase_data",
  "expire_data",
  "createdAt",
  "updatedAt",
];

export interface IAccessory {
  id?: string;
  accessory_name: string;
  quantity : number;
  purchase_data ?: Date;
  expire_data?: Date;
  amount: number;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

