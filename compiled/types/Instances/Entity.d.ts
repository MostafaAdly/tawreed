import SupplierType from "./Personas/SupplierType";
import CustomerType from './Personas/CustomerType';
import EntityRole from "./EntityRole";
import User from "./User";
import { Permission } from "./enums/Permission";
import { ObjectId } from '../Types/ObjectId';
export default class Entity {
    _id: ObjectId;
    entityId: string;
    details: {
        displayName: string;
        logo: string;
        banner: string;
        description?: string;
    };
    personas: {
        supplier?: SupplierType;
        customer: CustomerType;
    };
    users: User[];
    roles: ObjectId[];
    departments: ObjectId[];
    categories: ObjectId[];
    constructor();
    constructor({ details, personas, roles, categories }: {
        details: {
            displayName: string;
            logo: string;
            banner: string;
            description?: string;
        };
        personas: {
            supplier?: SupplierType;
            customer?: CustomerType;
        };
        roles: EntityRole[];
        departments?: ObjectId[];
        categories?: ObjectId[];
    });
    hasPermission(user: User, permission: Permission): any;
    load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
