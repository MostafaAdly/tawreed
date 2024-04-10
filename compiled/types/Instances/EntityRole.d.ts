import { Permission } from './Permission';
import { ObjectId } from '../Types/ObjectId';
export default class EntityRole {
    _id: ObjectId;
    roleId: string;
    name: string;
    permissions: Permission[];
    constructor({ id }: {
        id: string;
    });
    constructor({ id, name, permissions }: {
        id?: string;
        name: string;
        permissions: Permission[];
    });
    load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
