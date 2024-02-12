

export const Manage_request_fields_constant = [
    "createdAt",
    "updatedAt",
    "approve_status",
    "id",
    "inventory_request_id",
    "comment"
  ];

export interface IManageRequest {
    id: string;
    inventory_request_id: string;
    approve_status: RequestStatus;
    comment?: string | null;
  }

  enum RequestStatus {
    APPROVE = "APPROVE",
    PENDING = "PENDING",
    REJECT = "REJECT",
  }
  


  