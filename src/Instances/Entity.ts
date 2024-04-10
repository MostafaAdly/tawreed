import mongoose from 'mongoose';
import SupplierType from "./Personas/SupplierType";
import CustomerType from './Personas/CustomerType';
import EntityRole from "./EntityRole";
import User from "./User";
import { Permission } from "./Permission";
import Utils from "../Utils";
import ModelManager from "../Database/ModelManager";
import { ObjectId } from '../Types/ObjectId';

export default class Entity {

    public _id: ObjectId = new mongoose.Types.ObjectId();
    public entityId: string = Utils.entityId_prefix + Utils.createId();
    public details: {
        displayName: string,
        logo: string,
        banner: string,
        description?: string,
    };
    public personas: { supplier?: SupplierType, customer: CustomerType } = { customer: new CustomerType({ requests: [] }) };
    public users: User[] = [];
    public roles: ObjectId[] = [];
    public departments: ObjectId[] = [];
    public categories: ObjectId[] = [];

    constructor();
    constructor({ details, personas, roles, categories }:
        {
            details: {
                displayName: string,
                logo: string,
                banner: string,
                description?: string,
            },
            personas: {
                supplier?: SupplierType, customer?: CustomerType
            },
            roles: EntityRole[],
            departments?: ObjectId[]
            categories?: ObjectId[]
        }
    );
    constructor(input?: any) {
        if (input) Object.assign(this, input);
    }
    public hasPermission(user: User, permission: Permission) {
        return !user || !user.role || !permission || !this.roles ? false : this.roles.find(role => role._id == user.role)?.permissions.includes(permission);
    }

    public load = async (query: any) => {
        const doc = await ModelManager.loadOne(this.constructor.name, query);
        if (!doc) return;
        Object.assign(this, doc);
        return this;
    };

    public save = async () => await ModelManager.save(this.constructor.name, this);
}