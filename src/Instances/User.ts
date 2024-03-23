import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from 'uuid';
import Utils from '../Utils';
import Entity from "./Entity";
import { Permission } from "./Personas/Permission";
import EntityRole from "./Personas/EntityRole";

export default class User {

    public id: string = Utils.userId_prefix + Utils.createId();
    public displayName: string;
    public credentials: { username: string, password?: string };

    // === ENTITY INFO
    public role: string | EntityRole | undefined;
    public entity: string;

    constructor(id: string)
    constructor(id: string, displayName: string, credentials: { username: string, password: string }, entity: string, role: string)
    constructor(...args: any[]) {
        if (args.length == 1) {
            this.id = args[0];
        } else if (args.length == 5) {
            this.id = args[0];
            this.displayName = args[1];
            this.credentials = args[2];
            this.entity = args[3];
            this.role = args[4];
        }
    }

    public async load(withPassword: boolean = false) {
        if (!this.id) return;
        const user = await User.schema().find({ id: this.id });
        if (!user) return;
        this.displayName = user.displayName;
        this.credentials = user.credentials;
        await this.afterLoad(withPassword);
        console.log(`Loaded User: ${user.id}}`, user);
    }

    public async afterLoad(withPassword: boolean = false) {
        const roles = (await Entity.schema().findOne({ id: this.entity }))?.roles;
        this.role = roles.find((role: any) => role.id == this.role);
        if (!withPassword)
            this.credentials = { username: this.credentials.username };
        return this;
    }

    public hasCustomerPermissions(entity: Entity): boolean {
        const list = entity.roles.find(role => role.id == this.role)?.permissions;
        return this.role != null && list != null && list.includes(Permission.CUSTOMER_ALL);
    }

    public hasSupplierPermissions(entity: Entity): boolean {
        const list = entity.roles.find(role => role.id == this.role)?.permissions;
        return this.role != null && list != null && list.includes(Permission.SUPPLIER_ALL);
    }

    private static model: any;
    public static schema = () => {
        if (!this.model) this.model = mongoose.model('users', new Schema({
            id: { type: String, unique: true },
            displayName: String,
            credentials: Object,
            entity: String,
            role: String,
        }));
        return this.model;
    }

    public save = async () => await new (User.schema())(this).save();

}