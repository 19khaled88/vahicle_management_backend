export const accessory_fields_constant = [
  "accessory_name",
  "amount",
  "createdAt",
  "updatedAt",
];

export interface IAccessory {
  id?: string;
  accessory_name: string;
  amount: number;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
