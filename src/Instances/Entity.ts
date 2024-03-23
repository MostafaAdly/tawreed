import mongoose, { Schema } from "mongoose";
import SupplierType from "./Personas/SupplierType";
import CustomerType from './Personas/CustomerType';
import EntityRole from "./Personas/EntityRole";
import User from "./User";
import { Permission } from "./Personas/Permission";
import Utils from "../Utils";

export default class Entity {

    public id: string = Utils.entityId_prefix + Utils.createId();
    public details: { displayName: string, logo: string, banner: string, description?: string, categories: string[] };
    public personas: { supplier: SupplierType, customer: CustomerType };
    public users: User[] = [];
    public roles: EntityRole[] = [];
    public categories: string[] = [];

    constructor({ });
    constructor({ details, personas, roles }:
        {
            details: {
                displayName: string,
                logo: string,
                banner: string,
                description?: string,
                categories?: string[]
            },
            personas: {
                supplier?: SupplierType, customer?: CustomerType
            },
            roles: EntityRole[]

        });
    constructor(input: any) {
        this.details = input.details;
        this.personas = input.personas;
        this.roles = input.roles;
    }

    public load = async (id: string) => {
        this.id = id;
        if (!this.id) return this;
        const entity = await Entity.schema().findOne({ id: this.id });
        if (!entity) return this;
        this.details = entity.details;
        this.personas = entity.personas;
        this.roles = entity.roles;
        this.categories = entity.categories;

        await this.afterLoad();
        return this;
    }

    public async afterLoad() {
        this.users = await this.getUsers()
    }

    public async getUsers() {
        var loadedUsers = await User.schema().find({ entity: this.id });
        var users: User[] = [];
        for (var user of loadedUsers)
            users.push(await new User(user.id, user.displayName, user.credentials, user.entity, user.role).afterLoad(false));
        return users
    }

    public hasPermission(user: User, permission: Permission) {
        return !user || !user.role || !permission || !this.roles ? false : this.roles.find(role => role.id == user.role)?.permissions.includes(permission);
    }

    private static model: any;
    public static schema = () => {
        if (!this.model) this.model = mongoose.model('entities', new Schema({
            id: { type: String, unique: true },
            details: { type: Object },
            personas: { type: Object },
            roles: { type: Array<EntityRole> },
            categories: { type: Array<String> }
        }));
        return this.model;
    }
    public save = async () => await new (Entity.schema())(this).save();

}