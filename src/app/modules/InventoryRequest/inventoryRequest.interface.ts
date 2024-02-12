export const inventory_request_fields_constant = [
  " createdAt",
  "updatedAt",
  "title",
  "id",
];

export type IInventoryRequestRespons = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};
