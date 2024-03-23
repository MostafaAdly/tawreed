"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Price {
    constructor({ cost, quantity, unit, currency }) {
        this.cost = 0;
        this.quantity = 1;
        this.unit = "قطعة";
        this.currency = "EGP";
        this.cost = cost;
        this.unit = unit;
        if (quantity)
            this.quantity = quantity;
        if (currency)
            this.currency = currency;
    }
}
exports.default = Price;
