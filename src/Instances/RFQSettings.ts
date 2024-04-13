export default class RFQSettings {
    public quantity: number = 1;
    public supplyTime: number = 7;
    public paymentCondition: number = 1;

    constructor(settings?: RFQSettings) {
        if (settings) Object.assign(this, settings);
    }
}