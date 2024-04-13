import mongoose from "mongoose";
import Entity from "./Entity";
import { Permission } from "./Permission";
import ModelManager from "../Database/ModelManager";
import Utils from "../Utils";
import { ObjectId } from "../Types/ObjectId";

export default class User {

    public _id: ObjectId = new mongoose.Types.ObjectId();
    public userId: string = Utils.userId_prefix + Utils.createId();
    public displayName: string;
    public credentials: { username: string, password?: string };

    // === ENTITY INFO
    public role: ObjectId;
    public entity: ObjectId;

    // === VALIDATING INFO
    public token: string;

    constructor(input?: any) {
        if (input) Object.assign(this, input);
    }

    public setId = (id: ObjectId) => {
        this._id = id;
        return this;
    }

    public async load(withPassword: boolean = false, loadRole = true) {
        await this._load({ _id: this._id });
        if (loadRole) await this.afterLoad(withPassword);
        // console.log(`Loaded User: ${user.userId}`, user);
    }

    public async afterLoad(withPassword: boolean = false) {
        const roles = (await new Entity().load({ _id: this.entity }))?.roles;
        if (!roles) return this;
        this.role = roles.find((role: any) => role._id == this.role);
        if (!withPassword) delete this.credentials.password;
        return this;
    }

    public hasCustomerPermissions(entity: Entity): boolean {
        const list = entity.roles.find(role => role._id == this.role)?.permissions;
        return this.role != null && list != null && list.includes(Permission.CUSTOMER_ALL);
    }

    public hasSupplierPermissions(entity: Entity): boolean {
        const list = entity.roles.find(role => role._id == this.role)?.permissions;
        return this.role != null && list != null && list.includes(Permission.SUPPLIER_ALL);
    }

    public _load = async (query: any) => {
        const doc = await ModelManager.loadOne(this.constructor.name, query);
        if (!doc) return;
        Object.assign(this, doc);
        return this;
    };

    public save = async () => await ModelManager.save(this.constructor.name, this);
}