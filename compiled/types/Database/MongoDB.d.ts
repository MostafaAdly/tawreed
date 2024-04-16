export default class MongoDB {
    private data;
    constructor(data: any);
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    import_departments_intoMySQL: () => Promise<any[]>;
    eraseDatabase: () => Promise<void>;
    deleteAllDepartments: () => Promise<void>;
    deleteAllUsers: () => Promise<void>;
    createEntityRoles: () => Promise<void>;
    createFakerDummyData: (erase?: boolean) => Promise<void>;
    random: (list: any[]) => any;
    createDefaultDeveloperUser: (entities: any[], roles: any[]) => Promise<void>;
}
