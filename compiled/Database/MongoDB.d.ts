export default class MongoDB {
    private data;
    constructor(data: any);
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    import_departments_intoMySQL: () => Promise<void>;
    deleteAllDepartments: () => Promise<void>;
    deleteAllUsers: () => Promise<void>;
}
