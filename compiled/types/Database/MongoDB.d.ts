export default class MongoDB {
    private data;
    constructor(data: any);
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    import_departments_intoMySQL: () => Promise<any[]>;
    deleteAllDepartments: () => Promise<void>;
    deleteAllUsers: () => Promise<void>;
    createFakerDummyData: () => Promise<void>;
    random: (list: any[]) => any;
    createSemiRealData: () => Promise<void>;
    createDummySuppliers: () => Promise<void>;
    createDefaultDeveloperUser: (entities: any[], roles: any[]) => Promise<any>;
}
