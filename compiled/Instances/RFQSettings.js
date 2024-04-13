"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RFQSettings {
    constructor(settings) {
        this.quantity = 1;
        this.supplyTime = 7;
        this.paymentCondition = 1;
        if (settings)
            Object.assign(this, settings);
    }
}
exports.default = RFQSettings;
