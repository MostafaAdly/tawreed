export default class Department {
    id: string;
    name: string;
    images: string[];
    constructor(name: string, images: string[]);
    private static model;
    static schema: () => any;
    save(): Promise<any>;
}
