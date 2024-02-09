
export const officeCost_fields_constant = [
  "cost_name",
  "amount",
  "searchTerm",
  "description",
  "createdAt",
  "updatedAt",
];


export interface IOfficeCost {
    id?: string;
    cost_name: string;
    amount: number;
    description?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }


