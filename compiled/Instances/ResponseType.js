"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseType = void 0;
var ResponseType;
(function (ResponseType) {
    ResponseType["PURCHASE_PENDING"] = "\u0642\u064A\u062F \u0627\u0644\u0625\u0646\u062A\u0638\u0627\u0631";
    ResponseType["PURCHASE_IN_DELIVERY"] = "\u0627\u0644\u062A\u0633\u0644\u064A\u0645 \u0642\u064A\u062F \u0627\u0644\u062A\u0642\u062F\u0645";
    ResponseType["PURCHASE_DELIVERED"] = "\u062A\u0645 \u0627\u0644\u062A\u0648\u0635\u064A\u0644";
    ResponseType["PURCHASE_CANCELLED"] = "\u062A\u0645 \u0627\u0644\u0625\u0644\u063A\u0627\u0621";
    ResponseType["PURCHASE_RETURNED"] = "\u0645\u0631\u062A\u062C\u0639";
    ResponseType["PURCHASE_OUT_OF_STOCK"] = "\u0646\u0641\u0630\u062A \u0627\u0644\u0643\u0645\u064A\u0629";
    ResponseType["RFQ_PENDING"] = "\u0642\u064A\u062F \u0627\u0644\u0625\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0645\u0648\u0631\u062F";
    ResponseType["RFQ_REPLY_PENDING"] = "\u0642\u064A\u062F \u0627\u0644\u0625\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0639\u0645\u064A\u0644";
    ResponseType["RFQ_APPROVED"] = "\u062A\u0645 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629";
    ResponseType["RFQ_REJECTED"] = "\u062A\u0645 \u0627\u0644\u0625\u0644\u063A\u0627\u0621";
})(ResponseType || (exports.ResponseType = ResponseType = {}));
