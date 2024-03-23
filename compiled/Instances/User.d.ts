export default class User {
    id: string;
    entity: string;
    credentials: {
        username: string;
        password: string;
    };
    role: string;
    displayName: string;
    constructor(id: string);
    constructor(id: string, displayName: string, credentials: {
        username: string;
        password: string;
    });
    load(): Promise<void>;
    private static model;
    static schema: () => any;
    save: () => Promise<any>;
}
