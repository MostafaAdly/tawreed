import SupplierType from "./Personas/SupplierType";
import CustomerType from './Personas/CustomerType';
import EntityRole from "./Personas/EntityRole";
import User from "./User";
import { Permission } from "./Personas/Permission";
export default class Entity {
    id: string;
    details: {
        displayName: string;
        logo: string;
        banner: string;
        description?: string;
        categories: String[];
    };
    personas: {
        supplier: SupplierType;
        customer: CustomerType;
    };
    users: User[];
    roles: EntityRole[];
    categories: String[];
    constructor({}: {});
    constructor({ details, personas, roles, categories }: {
        details: {
            displayName: string;
            logo: string;
            banner: string;
            description?: string;
            categories?: String[];
        };
        personas: {
            supplier?: SupplierType;
            customer?: CustomerType;
        };
        roles: EntityRole[];
        categories?: String[];
    });
    load: (id: string) => Promise<this>;
    afterLoad(): Promise<void>;
    getUsers(): Promise<User[]>;
    hasPermission(user: User, permission: Permission): boolean | undefined;
    private static model;
    static schema: () => any;
    save: () => Promise<any>;
}
