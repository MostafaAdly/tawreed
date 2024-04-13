import Entity from "./Entity";
import { ObjectId } from "../Types/ObjectId";
export default class User {
    _id: ObjectId;
    userId: string;
    displayName: string;
    credentials: {
        username: string;
        password?: string;
    };
    role: ObjectId;
    entity: ObjectId;
    token: string;
    constructor(input?: any);
    setId: (id: mongoose.Types.ObjectId) => this;
    load(withPassword?: boolean, loadRole?: boolean): Promise<void>;
    afterLoad(withPassword?: boolean): Promise<this>;
    hasCustomerPermissions(entity: Entity): boolean;
    hasSupplierPermissions(entity: Entity): boolean;
    _load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
