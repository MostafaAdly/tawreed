export default class Price {
    cost: number;
    quantity: number;
    unit: string;
    currency: string;
    constructor({ cost, quantity, unit, currency }: {
        cost: number;
        quantity?: number;
        unit: string;
        currency?: string;
    });
}
