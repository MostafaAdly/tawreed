"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseType = void 0;
var ResponseType;
(function (ResponseType) {
    ResponseType["PENDING"] = "Pending";
    ResponseType["IN_DELIVERY"] = "Delivery in Progress";
    ResponseType["DELIVERED"] = "Delivered";
    ResponseType["REJECTED"] = "Rejected";
    ResponseType["CANCELLED"] = "Cancelled";
    ResponseType["RETURNED"] = "Returned";
    ResponseType["OUT_OF_STOCK"] = "Out of Stock";
})(ResponseType || (exports.ResponseType = ResponseType = {}));
