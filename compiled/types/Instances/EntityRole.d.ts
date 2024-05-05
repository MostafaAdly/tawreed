import { Permission } from './enums/Permission';
import { ObjectId } from '../Types/ObjectId';
export default class EntityRole {
    _id: ObjectId;
    roleId: string;
    name: string;
    permissions: Permission[];
    priority: number;
    constructor({ id }: {
        id: string;
    });
    constructor({ id, name, permissions, priority }: {
        id?: string;
        name: string;
        permissions: Permission[];
        priority: number;
    });
    load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
