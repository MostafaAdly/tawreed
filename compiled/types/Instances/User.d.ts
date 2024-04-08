import Entity from "./Entity";
import EntityRole from "./Personas/EntityRole";
export default class User {
    id: string;
    displayName: string;
    credentials: {
        username: string;
        password?: string;
    };
    role: string | EntityRole | undefined;
    entity: string;
    constructor(id: string);
    constructor(displayName: string, credentials: {
        username: string;
        password: string;
    }, entity: string, role: string);
    setId: (id: string) => this;
    load(withPassword?: boolean): Promise<void>;
    afterLoad(withPassword?: boolean): Promise<this>;
    hasCustomerPermissions(entity: Entity): boolean;
    hasSupplierPermissions(entity: Entity): boolean;
    private static model;
    static schema: () => any;
    save: () => Promise<any>;
}
