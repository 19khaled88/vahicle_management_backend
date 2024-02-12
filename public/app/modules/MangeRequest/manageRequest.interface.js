"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manage_request_fields_constant = void 0;
exports.Manage_request_fields_constant = [
    "createdAt",
    "updatedAt",
    "approve_status",
    "id",
    "inventory_request_id",
    "comment"
];
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["APPROVE"] = "APPROVE";
    RequestStatus["PENDING"] = "PENDING";
    RequestStatus["REJECT"] = "REJECT";
})(RequestStatus || (RequestStatus = {}));
