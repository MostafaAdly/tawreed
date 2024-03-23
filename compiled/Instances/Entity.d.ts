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
        categories: string[];
    };
    personas: {
        supplier: SupplierType;
        customer: CustomerType;
    };
    roles: EntityRole[];
    constructor(id: string);
    constructor(id: string, details: {
        displayName: string;
        logo: string;
        banner: string;
        description?: string;
        categories: string[];
    }, personas: {
        supplier: SupplierType;
        customer: CustomerType;
    }, roles: EntityRole[]);
    hasPermission(user: User, permission: Permission): boolean | undefined;
    private static model;
    static schema: () => any;
    save: () => Promise<any>;
}
