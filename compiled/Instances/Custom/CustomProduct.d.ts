export default class CustomProduct {
    id: string;
    name: string;
    description: string;
    details: any;
    constructor(id: string);
    constructor(id: string, name: string, description: string, details: any);
    load(): Promise<void>;
}
