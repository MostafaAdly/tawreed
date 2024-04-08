import { Permission } from './Permission';
export default class EntityRole {
    id: string;
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
}
