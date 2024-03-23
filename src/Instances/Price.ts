export default class Price {
    public cost: number = 0;
    public quantity: number = 1;
    public unit: string = "قطعة";
    public currency: string = "EGP";

    constructor({ cost, quantity, unit, currency }: { cost: number, quantity?: number, unit: string, currency?: string }) {
        this.cost = cost;
        this.unit = unit;
        if (quantity)
            this.quantity = quantity;
        if (currency)
            this.currency = currency;
    }
}