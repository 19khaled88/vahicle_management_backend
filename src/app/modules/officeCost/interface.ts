export interface IOfficeCost {
    id?: string;
    cost_name: string;
    amount: number;
    description?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }